export const runtime = "edge";

import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { users, essaySubmissions } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/login');
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email!),
    columns: {
      id: true, name: true, image: true, email: true,
      streak: true, gems: true, currentBand: true, targetBand: true,
    },
    with: {
      essays: {
        orderBy: [desc(essaySubmissions.submittedAt)],
        limit: 10,
        columns: {
          id: true, score: true, submittedAt: true,
          lessonId: true, wordCount: true, content: true, feedback: true,
        },
        with: {
          lesson: { columns: { id: true, type: true, data: true } }
        }
      },
      progress: {
        where: (progress, { eq }) => eq(progress.completed, true),
        orderBy: (progress, { desc }) => [desc(progress.lastSeen)],
        limit: 10,
        columns: {
          id: true, score: true, lastSeen: true, lessonId: true
        },
        with: {
          lesson: { columns: { id: true, type: true, data: true } }
        }
      }
    }
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full max-w-5xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header Info */}
      <div className="w-full flex items-center justify-between mb-8">
         <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full clay-card bg-[var(--color-bg-cream)] flex items-center justify-center font-black text-4xl text-[var(--color-maroon)] overflow-hidden border-4 border-white">
              {user.image ? <img src={user.image} alt="Avatar" className="w-full h-full object-cover" /> : user.name?.charAt(0) || 'U'}
            </div>
            <div>
               <h1 className="text-4xl font-black text-[var(--color-maroon)]">{user.name}</h1>
               <p className="font-bold text-gray-500">{user.email}</p>
            </div>
         </div>
         <div className="flex gap-4">
            <div className="clay-card px-6 py-4 rounded-2xl bg-white text-center">
               <div className="text-3xl font-black text-orange-500">🔥 {user.streak || 0}</div>
               <div className="text-xs font-bold uppercase text-gray-400 mt-1">Chuỗi ngày</div>
            </div>
            <div className="clay-card px-6 py-4 rounded-2xl bg-white text-center">
               <div className="text-3xl font-black text-blue-500">💎 {user.gems || 0}</div>
               <div className="text-xs font-bold uppercase text-gray-400 mt-1">Gems</div>
            </div>
            <div className="clay-card px-6 py-4 rounded-2xl bg-white text-center hidden md:block">
               <div className="text-3xl font-black text-purple-500">{user.currentBand ? user.currentBand.toFixed(1) : '?'}</div>
               <div className="text-xs font-bold uppercase text-gray-400 mt-1">Band Hiện Tại</div>
            </div>
         </div>
      </div>

      <div className="w-full">
         <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
           <span className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xl">📝</span>
           Sổ tay lỗi sai (Error Log)
         </h2>

         {user.essays.length === 0 ? (
            <div className="clay-card p-12 text-center rounded-3xl bg-[var(--color-bg-cream)] opacity-80">
               <h3 className="text-2xl font-black text-gray-600 mb-2">Chưa có dữ liệu bài viết</h3>
               <p className="font-medium text-gray-500 mb-6">Bạn chưa làm bài Writing nào. Hãy luyện tập để AI phân tích lỗi nhé!</p>
               <Link href="/study?cat=writing" className="clay-btn bg-[var(--color-maroon)] text-white px-8 py-3 rounded-xl font-bold">Đi viết bài ngay</Link>
            </div>
         ) : (
            <div className="flex flex-col gap-8">
               {user.essays.map((essay) => {
                 const feedback = essay.feedback as any;
                 const corrections = feedback?.corrections || [];
                 
                 return (
                   <div key={essay.id} className="clay-card rounded-3xl p-6 md:p-8 bg-white border border-gray-100 flex flex-col gap-6">
                      {/* Top Bar */}
                      <div className="flex justify-between items-start">
                         <div>
                            <Link href={`/study/${essay.lessonId}`} className="text-xl font-black text-[var(--color-maroon)] hover:underline">
                              {(essay.lesson?.data as any)?.title || 'Bài tập Writing'}
                            </Link>
                            <p className="text-sm font-bold text-gray-400 mt-1">
                              Ngày làm: {new Date(essay.submittedAt).toLocaleDateString('vi-VN')} • {essay.wordCount} từ
                            </p>
                         </div>
                         <div className="clay-card w-16 h-16 rounded-full bg-[var(--color-bg-cream)] flex items-center justify-center border-4 border-white shrink-0">
                           <span className="font-black text-2xl text-[var(--color-maroon)]">{essay.score?.toFixed(1) || '?'}</span>
                         </div>
                      </div>

                      {/* Content Preview */}
                      <div className="p-4 bg-gray-50 rounded-xl max-h-32 overflow-hidden relative">
                         <p className="text-sm font-medium text-gray-600 italic">"{essay.content}"</p>
                         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
                      </div>

                      {/* Corrections */}
                      {corrections.length > 0 ? (
                         <div className="mt-2">
                            <h4 className="font-black text-gray-800 mb-4 text-lg">💡 Các lỗi cần khắc phục</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {corrections.map((c: any, i: number) => (
                                <li key={i} className="clay-card p-4 rounded-2xl bg-white flex flex-col gap-2">
                                   <div className="flex items-start gap-3">
                                      <div className="mt-1 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0 font-bold text-xs">❌</div>
                                      <p className="font-medium text-gray-500 line-through text-sm">{c.original}</p>
                                   </div>
                                   <div className="flex items-start gap-3">
                                      <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 font-bold text-xs">✨</div>
                                      <p className="font-bold text-green-600 text-sm">{c.suggestion}</p>
                                   </div>
                                   <div className="mt-2 p-3 bg-[var(--color-bg-cream)] rounded-xl text-xs font-bold text-gray-600 italic border-l-4 border-[var(--color-maroon)]">
                                      Lý do: {c.explanation}
                                   </div>
                                </li>
                              ))}
                            </ul>
                         </div>
                      ) : (
                         <div className="p-4 bg-green-50 text-green-700 font-bold rounded-xl text-center text-sm">
                            Tuyệt vời! AI không phát hiện lỗi ngữ pháp hay từ vựng cơ bản nào trong bài này.
                         </div>
                      )}
                   </div>
                 )
               })}
            </div>
         )}
      </div>

      <div className="w-full mt-12">
         <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
           <span className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">✅</span>
           Bài học đã hoàn thành
         </h2>

         {user.progress.length === 0 ? (
            <div className="clay-card p-12 text-center rounded-3xl bg-[var(--color-bg-cream)] opacity-80">
               <h3 className="text-2xl font-black text-gray-600 mb-2">Chưa có bài học nào</h3>
               <p className="font-medium text-gray-500 mb-6">Bạn chưa hoàn thành bài học nào. Hãy bắt đầu học ngay nhé!</p>
               <Link href="/study" className="clay-btn bg-[var(--color-maroon)] text-white px-8 py-3 rounded-xl font-bold">Đi tới thư viện</Link>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {user.progress.map((p) => {
                 const d = (p.lesson?.data as any) || {};
                 return (
                   <div key={p.id} className="clay-card rounded-2xl p-6 bg-white flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                         <div>
                            <span className="clay-btn px-2 py-1 rounded text-xs font-black uppercase text-[var(--color-maroon)] mb-2 inline-block">
                              {p.lesson?.type.replace('_', ' ') || 'Bài học'}
                            </span>
                            <Link href={`/study/${p.lessonId}`} className="block text-xl font-black text-gray-800 hover:text-[var(--color-maroon)] leading-tight">
                              {d.title || d.titleEn || d.titleVi || "Bài học không tên"}
                            </Link>
                         </div>
                         {p.score !== null && (
                           <div className="w-12 h-12 rounded-full clay-card bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg shrink-0">
                             {p.score}
                           </div>
                         )}
                      </div>
                      <div className="text-sm font-bold text-gray-400 mt-auto">
                        Đã hoàn thành lúc: {new Date(p.lastSeen).toLocaleDateString('vi-VN')}
                      </div>
                   </div>
                 )
               })}
            </div>
         )}
      </div>

    </div>
  );
}
