import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

export default async function PracticePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const filter = Array.isArray(resolvedParams.filter) ? resolvedParams.filter[0] : resolvedParams.filter || 'all';

  // Lấy ra một số bài đọc ngẫu nhiên hoặc mới nhất để làm grid
  const lessons = await prisma.lesson.findMany({
    where: { type: 'reading' },
    take: 12,
    orderBy: { id: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#fdfaf6] w-full pb-20 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Top Banner (Quick Actions) */}
      <div className="w-full bg-[#fdfaf6] border-b border-gray-200/60 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-6">
           <div className="flex flex-wrap items-center gap-3">
              <button className="clay-btn bg-[#c1a063] text-white px-6 py-2.5 rounded-md font-bold flex items-center gap-2">
                Bài ngắn <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <Link href="/practice/mock" className="clay-card bg-white px-6 py-2.5 rounded-md font-bold flex items-center gap-2 hover:bg-gray-50 text-gray-800">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Full đề Reading
              </Link>
              <button className="clay-card bg-white px-6 py-2.5 rounded-md font-bold flex items-center gap-2 hover:bg-gray-50 text-gray-800">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Xen kẽ dạng bài
              </button>
              <button className="clay-card bg-white px-6 py-2.5 rounded-md font-bold flex items-center gap-2 hover:bg-gray-50 text-gray-800">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                Đề theo nguồn OCR cục bộ
              </button>
           </div>
           <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-md border border-gray-200">
                <span className="font-black text-[#c1a063]">1.400</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bài đọc</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-md border border-gray-200">
                <span className="font-black text-[#c1a063]">15</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dạng câu hỏi</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-md border border-gray-200">
                <span className="font-black text-[#c1a063]">60</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phút full đề</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 flex flex-col md:flex-row gap-8">
         
         {/* Left Sidebar Filter */}
         <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
            
            {/* Reading Accordion */}
            <div className="clay-card bg-white rounded-md overflow-hidden border border-orange-100">
               <div className="px-5 py-4 flex items-center justify-between bg-orange-50/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                     <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                     <span className="font-black text-gray-800">Reading</span>
                  </div>
               </div>
               <div className="p-4 flex flex-col gap-3">
                  <h4 className="font-bold flex items-center gap-2 text-gray-800 mb-1">
                     <div className="w-3 h-3 rounded-md border-2 border-[#c1a063]"></div>
                     Bài lẻ
                  </h4>
                  <div className="flex flex-col gap-3 pl-5 text-sm font-medium text-gray-500">
                     <label className="flex items-center gap-3 cursor-pointer hover:text-gray-800">
                        <input type="radio" name="reading_filter" className="w-4 h-4 text-[#c1a063] bg-gray-100 border-gray-300 focus:ring-[#c1a063]" />
                        Passage 1 (~750 từ)
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer hover:text-gray-800">
                        <input type="radio" name="reading_filter" className="w-4 h-4 text-[#c1a063] bg-gray-100 border-gray-300 focus:ring-[#c1a063]" />
                        Passage 2 (~900 từ)
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer hover:text-gray-800">
                        <input type="radio" name="reading_filter" className="w-4 h-4 text-[#c1a063] bg-gray-100 border-gray-300 focus:ring-[#c1a063]" />
                        Passage 3 (~1050 từ)
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer hover:text-gray-800">
                        <input type="radio" name="reading_filter" className="w-4 h-4 text-[#c1a063] bg-gray-100 border-gray-300 focus:ring-[#c1a063]" />
                        Bài ngắn
                     </label>
                  </div>
                  <div className="h-px bg-gray-100 my-2"></div>
                  <label className="flex items-center gap-3 cursor-pointer hover:text-gray-800 text-sm font-medium text-gray-500 pl-1">
                     <input type="radio" name="reading_filter" className="w-4 h-4 text-[#c1a063] bg-gray-100 border-gray-300 focus:ring-[#c1a063]" />
                     Full đề — 3 passage, 60 phút
                  </label>
               </div>
            </div>

            {/* Other Accordions */}
            <div className="clay-card bg-white/60 rounded-md px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-white text-gray-500 hover:text-gray-800 transition-colors border border-gray-200/50">
               <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  <span className="font-bold">Listening</span>
               </div>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="clay-card bg-white/60 rounded-md px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-white text-gray-500 hover:text-gray-800 transition-colors border border-gray-200/50">
               <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  <span className="font-bold">Writing</span>
               </div>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="clay-card bg-white/60 rounded-md px-5 py-4 flex items-center justify-between opacity-50 cursor-not-allowed border border-gray-200/50">
               <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                  <span className="font-bold">Speaking</span>
               </div>
               <span className="text-xs font-bold">Sắp có</span>
            </div>

            {/* Question Type Filter */}
            <div className="clay-card bg-white rounded-md overflow-hidden border border-gray-100 mt-4">
               <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                  <span className="font-black text-gray-800">Loại câu hỏi</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
               </div>
               <div className="p-4">
                  <p className="text-xs text-gray-400 font-medium mb-4">Chọn rồi thì đề sinh ra chỉ gồm những dạng này.</p>
                  <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
                     <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[var(--color-maroon)] focus:ring-[var(--color-maroon)]" />
                        True / False / Not Given
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[var(--color-maroon)] focus:ring-[var(--color-maroon)]" />
                        Multiple Choice
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[var(--color-maroon)] focus:ring-[var(--color-maroon)]" />
                        Matching Headings
                     </label>
                  </div>
               </div>
            </div>

         </div>

         {/* Right Content Area */}
         <div className="flex-1 flex flex-col gap-4">
            <h3 className="font-black text-gray-800 flex items-baseline gap-2">
               <span className="text-2xl">567</span> <span className="text-sm font-bold text-gray-400">bài đọc khớp bộ lọc</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-2">
               {lessons.map((lesson, i) => {
                 const d = lesson.data as any;
                 const bgColors = ['bg-lime-400', 'bg-pink-500', 'bg-purple-500', 'bg-blue-400', 'bg-orange-400'];
                 const iconRotations = ['rotate-45', 'rotate-0', 'rotate-90', '-rotate-45', 'rotate-180'];
                 const color = bgColors[i % bgColors.length];
                 const rotation = iconRotations[i % iconRotations.length];

                 return (
                   <Link key={lesson.id} href={`/study/${lesson.id}`} className="clay-card bg-white rounded-md overflow-hidden hover-wobble flex flex-col border border-gray-100">
                      
                      {/* Image Thumbnail Placeholder */}
                      <div className={`w-full aspect-[4/3] ${color} relative overflow-hidden flex items-center justify-center`}>
                         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white/50 to-transparent scale-150"></div>
                         <div className={`w-16 h-16 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center text-white ${rotation} shadow-lg border border-white/30`}>
                           {i % 2 === 0 ? (
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                           ) : (
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                           )}
                         </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col gap-3 flex-1 bg-white">
                         <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black uppercase text-[#c1a063] bg-orange-50 px-2 py-0.5 rounded-sm tracking-wider">ACADEMIC</span>
                           <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">{d.topic || 'HISTORY'}</span>
                         </div>
                         <h4 className="font-black text-xl text-gray-800 leading-tight line-clamp-2">
                            {d.title || d.titleEn || 'Understanding Human History and Civilization'}
                         </h4>
                      </div>

                      {/* Footer */}
                      <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
                         <span className="text-xs font-bold text-gray-400">Simple Wikipedia</span>
                         <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                            <span>1 phút</span>
                            <span>0%</span>
                            <button className="text-gray-300 hover:text-[var(--color-maroon)]">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                            </button>
                         </div>
                      </div>
                   </Link>
                 )
               })}
            </div>
         </div>
      </div>

    </div>
  )
}
