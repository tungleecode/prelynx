export const runtime = "edge";
import prisma from '@/lib/prisma'
import Link from 'next/link'
import VocabDeck from './VocabDeck'

import { auth } from "@/auth";

export default async function VocabularyPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const resolvedParams = await searchParams;
  const tab = resolvedParams.tab || 'sotu';
  const session = await auth();
  
  const articles = await prisma.lesson.findMany({
    where: { type: { in: ['reading', 'press'] } }
  });

  // Extract all vocab
  let allVocab: any[] = [];
  articles.forEach(a => {
    const d = a.data as any;
    if (d.vocab && Array.isArray(d.vocab)) {
      d.vocab.forEach((v: any) => {
        allVocab.push({
          ...v,
          lessonId: a.id,
          sourceTitle: d.title || d.titleEn || 'Bài học'
        });
      });
    }
  });

  // Fetch real SR2 progress if logged in
  let dueCount = 0;
  if (session && session.user) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
    if (user) {
      const reviews = await prisma.flashcardReview.findMany({
        where: { userId: user.id }
      });
      const reviewMap = new Map(reviews.map(r => [r.word, r]));
      
      const now = new Date();
      allVocab = allVocab.filter(v => {
        const word = v.word || v.en;
        const review = reviewMap.get(word);
        if (!review) return true; // New card
        if (review.dueDate <= now) {
          dueCount++;
          return true; // Due for review
        }
        return false; // Not due yet
      });
    }
  }

  // Deduplicate vocab by word
  const uniqueVocab = [];
  const seen = new Set();
  for (const v of allVocab) {
    const word = v.word || v.en;
    if (!seen.has(word)) {
      seen.add(word);
      uniqueVocab.push(v);
    }
  }
  allVocab = uniqueVocab;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fdfaf6] w-full animate-in fade-in slide-in-from-bottom-4 flex">
      
      {/* Sidebar for Vocabulary */}
      <div className="w-64 border-r border-gray-200/60 bg-[#fdfaf6] hidden md:flex flex-col py-8 px-4 shrink-0">
         <div className="bg-[#c1a063] text-white px-4 py-3 rounded-md mb-4 flex items-center gap-3 font-black shadow-sm">
            <span className="text-xl">Aa</span>
            <div className="flex flex-col leading-tight">
               <span className="text-lg">Từ vựng</span>
               <span className="text-xs font-bold opacity-80">Sổ từ</span>
            </div>
         </div>
         
         <div className="flex flex-col gap-1">
            <Link href="/vocabulary?tab=sotu" className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-bold transition-colors ${tab === 'sotu' ? 'bg-white border border-blue-500 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
               Sổ từ
            </Link>
            <Link href="/vocabulary?tab=ielts" className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-bold transition-colors ${tab === 'ielts' ? 'bg-white border border-blue-500 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
               Chủ đề IELTS
            </Link>
            <Link href="/vocabulary?tab=sat" className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-bold transition-colors ${tab === 'sat' ? 'bg-white border border-blue-500 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
               Ôn từ vựng SAT
            </Link>
            <Link href="/vocabulary?tab=favorites" className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-bold transition-colors ${tab === 'favorites' ? 'bg-white border border-blue-500 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
               Học từ bài bạn thích
            </Link>
            <Link href="/vocabulary?tab=garden" className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-bold transition-colors ${tab === 'garden' ? 'bg-white border border-blue-500 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
               Vườn từ
            </Link>
            <Link href="/vocabulary?tab=notes" className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-bold transition-colors ${tab === 'notes' ? 'bg-white border border-blue-500 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
               Ghi chú
            </Link>
            <Link href="/vocabulary?tab=saved" className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-bold transition-colors ${tab === 'saved' ? 'bg-white border border-blue-500 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
               Đã lưu
            </Link>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
         {tab === 'sotu' && (
           <div className="w-full max-w-4xl mx-auto flex flex-col">
             <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
               <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Sổ Từ Vựng Của Bạn</h2>
               <p className="text-lg font-bold text-gray-500">
                 {session ? (
                    <>Đang có <span className="text-blue-600">{allVocab.length}</span> từ cần học hoặc ôn tập hôm nay.</>
                 ) : (
                    <>Đang có {allVocab.length} từ vựng học thuật trích xuất từ các bài báo song ngữ.</>
                 )}
               </p>
             </div>
             {allVocab.length > 0 ? (
                <VocabDeck vocabList={allVocab} />
             ) : (
                <div className="clay-card p-12 text-center rounded-3xl bg-green-50 border-2 border-green-200">
                   <h3 className="text-2xl font-black text-green-700 mb-2">Tuyệt vời! 🎉</h3>
                   <p className="font-bold text-green-600">Bạn đã ôn xong toàn bộ từ vựng đến hạn của ngày hôm nay. Hãy quay lại vào ngày mai nhé!</p>
                </div>
             )}
           </div>
         )}

         {tab === 'ielts' && (
           <div className="w-full max-w-5xl mx-auto animate-in fade-in">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Chủ đề IELTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {['Environment', 'Education', 'Technology', 'Health', 'Society', 'Crime'].map((topic, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-6 rounded-md shadow-sm hover:border-blue-300 transition-colors cursor-pointer group">
                       <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                          {['🌍','📚','💻','🏥','👥','⚖️'][i]}
                       </div>
                       <h3 className="font-black text-xl text-gray-800">{topic}</h3>
                       <p className="text-gray-500 text-sm font-medium mt-1 mb-4">Các từ vựng cốt lõi thường xuất hiện trong đề thi thật.</p>
                       <div className="flex justify-between items-center text-sm font-bold text-gray-400">
                          <span>0/50 từ</span>
                          <span className="text-blue-500 group-hover:underline">Học ngay &rarr;</span>
                       </div>
                       <div className="w-full h-1.5 bg-gray-100 mt-2 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${Math.random() * 30}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
         )}

         {tab === 'sat' && (
           <div className="w-full max-w-5xl mx-auto animate-in fade-in">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Ôn từ vựng SAT</h2>
              <div className="flex flex-col gap-4">
                 {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className="bg-white border border-gray-200 p-6 rounded-md shadow-sm flex items-center justify-between hover:border-[#c1a063] transition-colors cursor-pointer">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-orange-50 text-[#c1a063] rounded-md flex items-center justify-center font-black text-2xl">
                             L{level}
                          </div>
                          <div>
                             <h3 className="font-black text-xl text-gray-800">Cấp độ {level}</h3>
                             <p className="text-gray-500 font-medium">Từ vựng thiết yếu SAT Reading.</p>
                          </div>
                       </div>
                       <div className="text-right flex flex-col items-end gap-2">
                          <span className="font-bold text-gray-400">0/100 từ</span>
                          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md font-bold text-sm hover:bg-[#1c2331] hover:text-white transition-colors">Bắt đầu</button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
         )}

         {tab === 'garden' && (
           <div className="w-full h-full flex flex-col items-center justify-center text-center animate-in fade-in bg-green-50/50 rounded-md border border-green-100 p-8">
              <div className="flex gap-4 mb-8">
                 <div className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🌱</div>
                 <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌿</div>
                 <div className="text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌳</div>
              </div>
              <h2 className="text-3xl font-black text-green-800 mb-4">Vườn từ của bạn</h2>
              <p className="text-green-700 font-medium max-w-lg mb-8 text-lg">Mỗi từ vựng bạn học thuộc sẽ biến thành một cái cây. Ôn tập đúng hạn để cây lớn lên, nếu bỏ quên cây sẽ héo úa!</p>
              <button className="bg-green-600 text-white font-black px-8 py-4 rounded-md shadow-lg hover:bg-green-700 transition-colors text-lg">Gieo hạt mầm đầu tiên</button>
           </div>
         )}

         {['favorites', 'notes', 'saved'].includes(tab) && (
           <div className="w-full h-full flex flex-col items-center justify-center text-center">
             <svg className="w-24 h-24 text-gray-300 mb-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
             <h2 className="text-3xl font-black text-gray-900 mb-2">Tính năng đang được hoàn thiện</h2>
             <p className="text-gray-500 font-bold max-w-md">Tab này chưa có dữ liệu vì bạn chưa lưu bài nào. Chức năng đánh dấu yêu thích sẽ sớm ra mắt!</p>
           </div>
         )}
      </div>

    </div>
  )
}
