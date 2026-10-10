export const runtime = "edge";

import { db } from '@/lib/db'
import { lessons as lessonsSchema } from '@/lib/db/schema'
import { eq, desc, inArray, count, ne } from 'drizzle-orm'
import StudyMenu from './StudyMenu'
import ProLink from './ProLink'
import Link from 'next/link'
import SearchFilter from './SearchFilter'

const getTitle = (d: any, type: string) => {
  if (d.title) return d.title;
  if (d.titleEn) return d.titleEn;
  if (type === 'translation') return d.vi || d.en || 'Bài tập Dịch thuật';
  if (type === 'ielts_task2') return `IELTS Task 2: ${d.topicSlug || ''} (${d.essayKind || ''})`.replace(/-/g, ' ').toUpperCase();
  if (type === 'ielts_task1') return `IELTS Task 1: ${d.chartKind || 'Chart'}`.toUpperCase();
  if (type === 'grammar') return `Bài tập: ${d.skill || 'Ngữ pháp'}`.toUpperCase();
  return 'Bài học không tên';
}

const getSummary = (d: any, type: string) => {
  if (d.summary) return d.summary;
  if (d.standfirstVi) return d.standfirstVi;
  if (d.standfirstEn) return d.standfirstEn;
  if (type === 'translation') return d.hint || 'Luyện tập dịch thuật nâng cao';
  if (type === 'ielts_task2' || type === 'ielts_task1') return d.promptText;
  if (type === 'grammar') return d.passage || d.stem;
  return 'Khám phá bài học ngay';
}

const getTopic = (d: any, type: string) => {
  return d.exam || d.topic || d.topicSlug || type.replace('_', ' ').toUpperCase();
}

const getLevel = (d: any) => {
  if (d.cefrLevel) return d.cefrLevel;
  if (d.level) return d.level;
  if (d.difficultyBand) return `Band ${d.difficultyBand}`;
  if (d.difficulty) return d.difficulty.toUpperCase();
  return 'B1';
}

const getWords = (d: any, type: string) => {
  if (d.wordCount) return d.wordCount;
  if (d.minWords) return `>${d.minWords}`;
  if (type === 'translation' && d.en) return d.en.split(' ').length;
  return '--';
}

const getMinutes = (d: any, type: string) => {
  if (d.estMinutes) return d.estMinutes;
  if (d.timeLimitSeconds) return Math.round(d.timeLimitSeconds / 60);
  if (type === 'translation') return 3;
  return '--';
}

export default async function StudyRoom({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const pageStr = Array.isArray(resolvedParams.page) ? resolvedParams.page[0] : resolvedParams.page;
  const cat = Array.isArray(resolvedParams.cat) ? resolvedParams.cat[0] : resolvedParams.cat || 'all';
  const view = Array.isArray(resolvedParams.view) ? resolvedParams.view[0] : resolvedParams.view || 'roadmap';
  const q = Array.isArray(resolvedParams.q) ? resolvedParams.q[0] : resolvedParams.q || '';
  const page = parseInt(pageStr || '1');
  const take = view === 'roadmap' ? 1000 : 40
  const skip = (page - 1) * take
  
  let whereCondition;
  if (cat === 'writing' || cat === 'ielts') whereCondition = inArray(lessonsSchema.type, ['ielts_task1', 'ielts_task2']);
  else if (cat === 'translation') whereCondition = eq(lessonsSchema.type, 'translation');
  else if (cat === 'bilingual' || cat === 'reading') whereCondition = inArray(lessonsSchema.type, ['reading', 'press']);
  else if (cat === 'voa' || cat === 'listening') whereCondition = eq(lessonsSchema.type, 'listening');
  else if (cat === 'ielts_reading' || cat === 'article') whereCondition = eq(lessonsSchema.type, 'article');
  else if (cat === 'sat' || cat === 'grammar') whereCondition = inArray(lessonsSchema.type, ['grammar', 'reading']);
  else whereCondition = ne(lessonsSchema.type, 'unknown');

  let lessons = [];
  let totalLessons = 0;

  if (q) {
    const allLessons = await db.query.lessons.findMany({
      where: whereCondition,
      orderBy: [desc(lessonsSchema.id)]
    });
    const filtered = allLessons.filter(l => {
      const d = l.data as any;
      const textToSearch = `${d.title || ''} ${d.titleEn || ''} ${d.titleVi || ''} ${d.topic || ''} ${d.topicSlug || ''} ${d.passage || ''} ${d.en || ''}`.toLowerCase();
      return textToSearch.includes(q.toLowerCase());
    });
    totalLessons = filtered.length;
    lessons = filtered.slice(skip, skip + take);
  } else {
    const results = await Promise.all([
      db.query.lessons.findMany({
        where: whereCondition,
        limit: take,
        offset: skip,
        orderBy: [desc(lessonsSchema.id)]
      }),
      db.select({ value: count() }).from(lessonsSchema).where(whereCondition)
    ]);
    lessons = results[0];
    totalLessons = results[1][0].value;
  }
  
  const hasNextPage = skip + take < totalLessons;
  const hasPrevPage = page > 1;

  if (view === 'roadmap') {
    const roadmapLessonsCount = lessons.filter(l => (l.data as any).unit).length;
    if (roadmapLessonsCount === 0 && totalLessons > 0) {
      const { redirect } = await import('next/navigation');
      redirect(`/study?cat=${cat}&view=grid`);
    }
  }


  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full pb-20">
      

      {/* Advanced Search & Filter Bar */}
      <div className="w-full flex flex-col md:flex-row gap-4 mb-2 relative z-[100]">
         <form action="/study" method="GET" className="flex-1 bg-white rounded-md px-4 py-3 flex items-center gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
            <input type="hidden" name="cat" value={cat} />
            <input type="hidden" name="view" value={view} />
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              name="q"
              placeholder="Tìm bài đọc, chủ đề hoặc từ vựng..." 
              className="flex-1 outline-none font-bold text-gray-700 bg-transparent text-base placeholder:text-gray-300"
              defaultValue={q}
            />
         </form>
         <div className="flex gap-4">
            <div className="relative group">
               <button className="bg-white rounded-md px-4 py-3 flex items-center gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 font-black text-gray-700 hover:bg-gray-50 transition-colors h-full">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                  <span className="truncate max-w-[120px] md:max-w-[180px]">
                    {cat === 'all' && 'Tất cả bài học'}
                    {cat === 'ielts_reading' && 'Kho bài đọc (IELTS)'}
                    {cat === 'bilingual' && 'Đọc báo song ngữ'}
                    {cat === 'writing' && 'Writing'}
                    {cat === 'voa' && 'Đọc theo VOA'}
                    {cat === 'translation' && 'Dịch thuật'}
                    {cat === 'sat' && 'SAT Reading & Writing'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
               </button>
               {/* Dropdown Filter */}
               <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="w-64 clay-card bg-white p-3 rounded-md shadow-xl flex flex-col gap-1 text-base font-bold">
                    <Link href={`/study?cat=all&view=${view}`} className={`px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between ${cat === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Tất cả bài học {cat === 'all' && '✓'}</Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <div className="px-4 py-1 text-xs font-black text-gray-400 uppercase tracking-wider">IELTS</div>
                    <Link href={`/study?cat=ielts_reading&view=${view}`} className={`px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between ${cat === 'ielts_reading' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Kho bài đọc {cat === 'ielts_reading' && '✓'}</Link>
                    <Link href={`/study?cat=bilingual&view=${view}`} className={`px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between ${cat === 'bilingual' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Đọc báo song ngữ {cat === 'bilingual' && '✓'}</Link>
                    <Link href={`/study?cat=translation&view=${view}`} className={`px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between ${cat === 'translation' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Dịch thuật Anh-Việt {cat === 'translation' && '✓'}</Link>
                    <Link href={`/study?cat=writing&view=${view}`} className={`px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between ${cat === 'writing' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Writing {cat === 'writing' && '✓'}</Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <div className="px-4 py-1 text-xs font-black text-gray-400 uppercase tracking-wider">Luyện Nghe</div>
                    <Link href={`/study?cat=voa&view=${view}`} className={`px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between ${cat === 'voa' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>Đọc theo VOA {cat === 'voa' && '✓'}</Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <div className="px-4 py-1 text-xs font-black text-gray-400 uppercase tracking-wider">SAT</div>
                    <Link href={`/study?cat=sat&view=${view}`} className={`px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between ${cat === 'sat' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>SAT Reading & Writing {cat === 'sat' && '✓'}</Link>
                  </div>
               </div>
            </div>

            {/* View Toggle (Kept for compatibility) */}
            <div className="flex bg-white rounded-md p-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 h-full">
               <Link href={`/study?cat=${cat}&view=roadmap`} className={`flex items-center justify-center px-6 rounded-md text-sm font-black transition-all ${view === 'roadmap' ? 'bg-gray-800 text-white shadow-md' : 'hover:bg-gray-50 text-gray-500'}`}>Lộ trình</Link>
               <Link href={`/study?cat=${cat}&view=grid`} className={`flex items-center justify-center px-6 rounded-md text-sm font-black transition-all ${view === 'grid' ? 'bg-gray-800 text-white shadow-md' : 'hover:bg-gray-50 text-gray-500'}`}>Tự do</Link>
            </div>
         </div>
      </div>

      {/* Sorting Row */}
      {view === 'grid' && (
         <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-2 mt-4">
            <h3 className="font-black text-2xl text-gray-800">{totalLessons} bài</h3>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
               <button className="px-6 py-2 rounded-md bg-[#a38044] text-white font-bold text-sm shadow-md">Mới nhất</button>
               <button className="px-6 py-2 rounded-md bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">Ngắn nhất</button>
               <button className="px-6 py-2 rounded-md bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">Dễ nhất</button>
               <button className="px-6 py-2 rounded-md bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">Khó nhất</button>
            </div>
         </div>
      )}

      {/* Roadmap View */}
      {view === 'roadmap' && (
        <div className="w-full flex flex-col gap-4 mt-0">
           {Array.from(new Set(lessons.map(l => (l.data as any).unit || 0))).sort((a,b)=>Number(a)-Number(b)).filter(u => u !== 0).map(unitId => {
              const unitLessons = lessons.filter(l => (l.data as any).unit === unitId).sort((a,b) => (a.data as any).order - (b.data as any).order);
              const unitTitle = (unitLessons[0].data as any).unitTitle || `Chủ đề ${unitId}`;
              const isPro = Number(unitId) > 2; // Lock units after 2 as PRO
              
              return (
                 <div key={unitId} className="relative">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-md clay-card bg-[var(--color-bg-cream)] flex justify-center items-center font-black text-lg md:text-xl text-[var(--color-maroon)] shrink-0">
                         {unitId}
                       </div>
                       <h3 className="text-lg md:text-xl font-black text-gray-800 flex-1 truncate">{unitTitle}</h3>
                       {isPro && (
                          <span className="clay-btn bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-0.5 rounded-md text-[10px] font-black tracking-widest shadow-sm uppercase shrink-0">
                            Pro
                          </span>
                       )}
                    </div>
                    
                    {/* Horizontal Grid for Lessons (2 columns max) */}
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-3 pl-4 border-l-4 border-[var(--color-clay-pink)]/50 ml-4 md:ml-5 ${isPro ? 'opacity-50 grayscale' : ''}`}>
                       {unitLessons.map(lesson => {
                         const d = lesson.data as any;
                         return (
                           <ProLink 
                             href={`/study/${lesson.id}`} 
                             key={lesson.id} 
                             isPro={isPro}
                             className="clay-card p-4 rounded-md flex items-center gap-4 hover-squeeze group transition-all"
                           >
                              <div className="w-10 h-10 rounded-md clay-btn flex items-center justify-center text-gray-400 group-hover:text-[var(--color-maroon)]">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                              </div>
                              <div className="flex-1">
                                 <h4 className="font-bold text-lg">{getTitle(d, lesson.type)}</h4>
                                 <p className="text-sm font-medium opacity-60 ">{getSummary(d, lesson.type)}</p>
                              </div>
                              <div className="text-xs font-bold clay-card px-3 py-1 rounded-md opacity-70">
                                {getWords(d, lesson.type)} từ
                              </div>
                           </ProLink>
                         )
                       })}
                    </div>
                 </div>
              )
           })}
           {lessons.filter(l => !(l.data as any).unit).length > 0 && (
              <div className="text-center clay-card p-8 rounded-md opacity-70 font-bold">
                 Và {lessons.filter(l => !(l.data as any).unit).length} bài học khác không nằm trong lộ trình (Vui lòng chuyển sang chế độ Tự do).
              </div>
           )}
        </div>
      )}

      {/* Grid lessons */}
      {view === 'grid' && (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, i) => {
          const d = lesson.data as any;
          const type = lesson.type;
          const bgColors = ['bg-blue-600', 'bg-teal-500', 'bg-blue-500', 'bg-indigo-600', 'bg-indigo-500'];
          const color = bgColors[i % bgColors.length];
          
          return (
            <Link href={`/study/${lesson.id}`} key={lesson.id} className="clay-card bg-white rounded-md overflow-hidden hover-wobble flex flex-col border border-gray-200 shadow-sm">
               
               {/* Image Thumbnail Placeholder */}
               <div className={`w-full aspect-[2/1] ${color} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white/50 to-transparent scale-150"></div>
                  <div className={`w-16 h-16 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg border border-white/30`}>
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
               </div>

               {/* Content */}
               <div className="p-6 md:p-8 flex flex-col gap-4 flex-1 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-[#c1a063] tracking-wider">ACADEMIC</span>
                    <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">{getTopic(d, type) || 'SCIENCE'}</span>
                  </div>
                  <h4 className="font-black text-xl md:text-2xl text-gray-800 leading-tight line-clamp-2">
                     {getTitle(d, type)}
                  </h4>
                  <p className="text-sm font-medium text-gray-500 line-clamp-2 leading-relaxed">
                     {getSummary(d, type)}
                  </p>
                  
                  {/* Pills */}
                  <div className="flex flex-wrap gap-2 mt-2">
                     {['Multiple Choice', 'Summary'].map(pill => (
                        <span key={pill} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-md text-xs font-bold border border-gray-100">{pill}</span>
                     ))}
                     <span className="px-3 py-1 bg-white text-gray-400 border border-dashed border-gray-300 rounded-md text-xs font-bold hover:text-gray-600 hover:border-gray-400 transition-colors">+ Tạo đề</span>
                  </div>
               </div>

               {/* Footer */}
               <div className="px-6 md:px-8 py-5 flex items-center justify-between bg-white/50 border-t border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{d.attribution || 'NASA'}</span>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                     <span>{getMinutes(d, type)} phút</span>
                     <span>0%</span>
                     <button className="text-gray-300 hover:text-[var(--color-maroon)] transition-colors">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                     </button>
                  </div>
               </div>
            </Link>
          )
        })}
      </div>
      )}
      
      {/* Pagination */}
      <div className="flex gap-4 items-center mt-12">
        {hasPrevPage ? (
          <Link href={`/study?page=${page - 1}&cat=${cat}&view=${view}${q ? `&q=${q}` : ''}`} className="clay-btn px-6 py-3 rounded-md font-black text-lg hover-squeeze">
            Trang trước
          </Link>
        ) : (
          <div className="clay-btn px-6 py-3 rounded-md font-black text-lg opacity-50 cursor-not-allowed">Trang trước</div>
        )}
        
        <span className="font-bold text-[var(--color-maroon)] text-lg">Trang {page}</span>
        
        {hasNextPage ? (
          <Link href={`/study?page=${page + 1}&cat=${cat}&view=${view}${q ? `&q=${q}` : ''}`} className="clay-btn px-6 py-3 rounded-md font-black text-lg hover-squeeze">
            Trang tiếp
          </Link>
        ) : (
          <div className="clay-btn px-6 py-3 rounded-md font-black text-lg opacity-50 cursor-not-allowed">Trang tiếp</div>
        )}
      </div>

    </div>
  )
}
