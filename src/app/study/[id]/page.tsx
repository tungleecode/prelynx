export const runtime = "edge";

import { db } from '@/lib/db'
import { lessons, users, userProgresses } from '@/lib/db/schema'
import { eq, lt, gt, desc, asc, and } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import EssayEditor from './EssayEditor'
import TranslationEditor from './TranslationEditor'
import QuizEditor from './QuizEditor'
import FloatingActions from './FloatingActions'
import BackButton from './BackButton'
import ChartRenderer from './ChartRenderer'
import BilingualReader from './BilingualReader'
import VocabSection from './VocabSection'
import AudioPlayer from './AudioPlayer'
import ArticleReader from './ArticleReader'

export default async function LessonDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, resolvedParams.id)
  });

  if (!lesson) {
    notFound();
  }

  // Find next/prev lessons (Quick win for navigation)
  const [prevLesson, nextLesson] = await Promise.all([
    db.query.lessons.findFirst({
      where: (lessons, { and }) => and(eq(lessons.type, lesson.type), lt(lessons.id, lesson.id)),
      orderBy: [desc(lessons.id)]
    }),
    db.query.lessons.findFirst({
      where: (lessons, { and }) => and(eq(lessons.type, lesson.type), gt(lessons.id, lesson.id)),
      orderBy: [asc(lessons.id)]
    })
  ]);

  if (!lesson) {
    notFound();
  }

  const d = lesson.data as any;

  const session = await auth();
  let initialCompleted = false;
  let initialFavorite = false;
  if (session?.user?.email) {
    const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email) });
    if (user) {
      const progress = await db.query.userProgresses.findFirst({
        where: and(eq(userProgresses.userId, user.id), eq(userProgresses.lessonId, lesson.id))
      });
      if (progress) {
        initialCompleted = progress.completed;
        initialFavorite = progress.isFav;
      }
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full pb-32">
      
      {/* Header */}
      <nav className="w-[95%] flex justify-between items-center mb-4">
        <BackButton />
        <div className="flex gap-2">
          {prevLesson ? (
            <Link href={`/study/${prevLesson.id}`} className="clay-btn px-4 py-2 rounded-md font-bold text-gray-600 hover:text-[var(--color-maroon)] text-sm">
              &larr; Bài trước
            </Link>
          ) : (
            <div className="px-4 py-2 opacity-30 font-bold text-sm">&larr; Bài trước</div>
          )}
          <div className="clay-card px-4 py-2 rounded-md font-bold text-[var(--color-maroon)] shadow-inner bg-white/40">
            Bài học #{lesson.id.slice(0, 8)}
          </div>
          {nextLesson ? (
            <Link href={`/study/${nextLesson.id}`} className="clay-btn px-4 py-2 rounded-md font-bold text-gray-600 hover:text-[var(--color-maroon)] text-sm">
              Bài tiếp &rarr;
            </Link>
          ) : (
            <div className="px-4 py-2 opacity-30 font-bold text-sm">Bài tiếp &rarr;</div>
          )}
        </div>
      </nav>

      <div className="w-[95%] clay-card rounded-2xl p-8 md:p-12">
        {/* Title Section */}
        <div className="mb-10 text-center">
          <div className="flex justify-center gap-3 mb-4">
            <span className="clay-btn px-4 py-1 rounded-sm text-sm font-black uppercase text-[var(--color-maroon)]">
              {d.exam || d.topic || d.topicSlug || lesson.type.replace('_', ' ')}
            </span>
            <span className="clay-card px-4 py-1 rounded-sm text-sm font-bold opacity-80 shadow-inner bg-white/30">
              {d.cefrLevel || d.level || (d.difficultyBand ? `Band ${d.difficultyBand}` : null) || (d.difficulty ? d.difficulty.toUpperCase() : 'ALL')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)] leading-tight mb-4 capitalize">
            {d.title || d.titleEn || d.titleVi || (lesson.type === 'translation' ? `Dịch câu: ${(d.en || '').slice(0, 40)}...` : d.task === 'ielts_task2' ? `IELTS Task 2: ${d.topicSlug || ''} (${(d.essayKind || '').replace(/_/g, ' ')})` : d.task === 'ielts_task1' ? `IELTS Task 1: ${d.chartKind || 'Chart'}` : lesson.type === 'grammar' ? `Bài tập: ${d.skill || 'Ngữ pháp'}` : "Bài học không tên")}
          </h1>
          <p className="text-lg font-bold opacity-70">
            {d.summary || d.standfirstEn || d.standfirstVi}
          </p>
        </div>

        {/* Content Section based on data type */}
        <div className="space-y-8 font-medium text-lg leading-relaxed text-gray-800">
          {(!d.promptText && !d.audioUrl && (!d.paragraphs || d.paragraphs.length === 0) && !d.passage && !d.bodyText && (!d.vocab || d.vocab.length === 0) && !(d.en && d.vi) && (!d.questions || d.questions.length === 0)) && (
            <div className="clay-card p-12 text-center rounded-2xl flex flex-col items-center gap-6 mt-8 shadow-inner bg-[var(--color-bg-cream)]">
              <div className="w-24 h-24 rounded-full clay-btn flex items-center justify-center">
                <svg className="w-12 h-12 text-[var(--color-maroon)] opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[var(--color-maroon)] mb-2">Nội dung bài học chưa được hiển thị</h3>
                <p className="font-bold opacity-60 text-base max-w-md mx-auto">
                  Dữ liệu gốc của bài học này hiện chỉ chứa phần giới thiệu (Metadata). Bạn vui lòng quay lại thư viện và chọn các bài thi IELTS hoặc Translation để trải nghiệm đọc và làm bài tập nhé!
                </p>
              </div>
            </div>
          )}
          
          {/* IELTS Writing Prompt */}
          {d.promptText && (
             <div className="clay-card p-8 rounded-2xl shadow-inner bg-[var(--color-bg-cream)]/50 border border-[var(--color-clay-pink)]/50">
               <div className="flex gap-4 mb-6">
                 <span className="clay-btn px-4 py-1 rounded-sm text-sm font-black uppercase text-[var(--color-maroon)]">
                    Tối thiểu {d.minWords || (d.task === 'ielts_task1' ? 150 : 250)} từ
                 </span>
                 <span className="clay-card px-4 py-1 rounded-sm text-sm font-bold opacity-80 shadow-inner bg-white/30">
                    Thời gian: {d.timeLimitSeconds ? d.timeLimitSeconds / 60 : (d.task === 'ielts_task1' ? 20 : 40)} phút
                 </span>
               </div>
               <h3 className="text-2xl font-black mb-4 text-[var(--color-maroon)]">Đề bài (Writing Prompt)</h3>
               <p className="text-xl leading-relaxed font-bold italic text-gray-800">
                  "{d.promptText}"
               </p>
               
               {/* Task 1 Chart Data */}
               {d.chartData && (
                  <ChartRenderer data={d.chartData} />
               )}
               
               {/* Essay Editor Section (Interactive) */}
               <EssayEditor 
                 minWords={d.minWords || (d.task === 'ielts_task1' ? 150 : 250)} 
                 lessonId={lesson.id}
                 timeLimitSeconds={d.timeLimitSeconds || (d.task === 'ielts_task1' ? 1200 : 2400)}
               />
             </div>
          )}
          
          {/* Audio */}
          {d.audioUrl && (
             <AudioPlayer audioUrl={d.audioUrl} paragraphs={d.paragraphs} />
          )}

          {/* Long-form Article */}
          {lesson.type === 'article' && d.paragraphs && d.paragraphs.length > 0 && typeof d.paragraphs[0] === 'string' && (
             <ArticleReader 
               paragraphs={d.paragraphs} 
               attribution={d.attribution} 
               cefrLevel={d.cefrLevel} 
               readabilityScore={d.readabilityScore} 
             />
          )}

          {/* Paragraphs (Reading) - For Booklet Bilingual */}
          {lesson.type !== 'article' && d.paragraphs && d.paragraphs.length > 0 && typeof d.paragraphs[0] !== 'string' && (
             <BilingualReader paragraphs={d.paragraphs} />
          )}

          {/* Passages */}
          {(d.passage || d.bodyText) && (
             <div className="clay-card p-6 md:p-10 rounded-2xl shadow-inner bg-white/50 mb-12 border border-[var(--color-clay-pink)]/30">
                <p className="text-justify whitespace-pre-wrap leading-loose text-gray-800 text-lg font-medium">
                  {d.underline ? (
                    <>
                      {(d.passage || d.bodyText).split(d.underline)[0]}
                      <span className="bg-yellow-200/80 px-1 border-b-2 border-yellow-400 font-bold">{d.underline}</span>
                      {(d.passage || d.bodyText).split(d.underline)[1]}
                    </>
                  ) : (
                    d.passage || d.bodyText
                  )}
                </p>
             </div>
          )}

          {/* Vocab */}
          {d.vocab && d.vocab.length > 0 && (
             <VocabSection vocab={d.vocab} />
          )}

          {/* Translation En/Vi */}
          {d.en && d.vi && !d.paragraphs && (
             <TranslationEditor en={d.en} vi={d.vi} hint={d.hint} />
          )}

          {/* Questions */}
          {((d.questions && d.questions.length > 0) || lesson.type === 'grammar') && (
             <QuizEditor lessonId={lesson.id} questions={lesson.type === 'grammar' ? [{
                 prompt: d.stem,
                 options: d.options,
                 answerIndex: d.answerIndex,
                 whyVi: d.solutionVi
             }] : d.questions} />
          )}

        </div>
      </div>
      
      {/* Floating Action */}
      <FloatingActions lessonId={lesson.id} initialCompleted={initialCompleted} initialFavorite={initialFavorite} />

    </div>
  )
}
