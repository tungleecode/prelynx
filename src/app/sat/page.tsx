export const runtime = "edge";
import Link from 'next/link';

export default function SATPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf6] w-full pb-20 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Top Banner */}
      <div className="w-full bg-[#fdfaf6] border-b border-gray-200/60 pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col gap-2">
           <h3 className="text-[#c1a063] font-black tracking-widest text-sm uppercase">Digital SAT</h3>
           <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Ôn SAT theo bốn bước</h1>
           <p className="text-gray-600 font-medium text-lg mt-2">Đi lần lượt từ trên xuống; mỗi bước một nút.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 flex flex-col gap-8">
         
         {/* Accordion Hướng dẫn */}
         <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
            <button className="w-full flex items-center justify-between p-4 font-bold text-gray-800 hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Hướng dẫn
               </div>
               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" /></svg>
            </button>
         </div>

         {/* Steps Container */}
         <div className="flex flex-col gap-0">
            
            {/* Step 1 */}
            <div className="flex gap-6 py-10 border-b border-gray-200">
               <div className="text-3xl font-black text-[#c1a063] shrink-0 w-12">01</div>
               <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-3">
                     <h2 className="text-2xl font-black text-gray-900">Kiểm tra đầu vào</h2>
                     <span className="bg-orange-100 text-[#c1a063] px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider">Bước tiếp theo</span>
                  </div>
                  <p className="text-gray-600 font-medium">Biết mình hổng chỗ nào trước khi học.</p>
                  <p className="text-sm font-bold text-gray-500 mb-2">Math: — · Verbal: —</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                     <button className="bg-[#1c2331] text-white px-6 py-3 rounded-md font-bold hover:bg-black transition-colors flex items-center gap-2">
                        Chẩn đoán Math · 19 câu
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </button>
                     <button className="font-bold text-gray-700 hover:text-black flex items-center gap-1">
                        Đề trộn Verbal số 1
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                     </button>
                  </div>
               </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 py-10 border-b border-gray-200">
               <div className="text-3xl font-black text-[#c1a063] shrink-0 w-12">02</div>
               <div className="flex flex-col gap-3 w-full">
                  <h2 className="text-2xl font-black text-gray-900">Học theo chủ đề</h2>
                  <p className="text-gray-600 font-medium">Lý thuyết ngắn, ví dụ và bẫy của từng dạng.</p>
                  <p className="text-sm font-bold text-gray-500 mb-2">Đã học: Math 0/19 · Verbal 0/12 bài</p>
                  
                  <div className="flex flex-wrap items-center gap-6 mt-2">
                     <button className="bg-[#1c2331] text-white px-6 py-3 rounded-md font-bold hover:bg-black transition-colors flex items-center gap-2">
                        Bài học Math
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </button>
                     <button className="font-bold text-gray-700 hover:text-black flex items-center gap-1">
                        Bài học Verbal
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                     </button>
                     <button className="font-bold text-gray-700 hover:text-black flex items-center gap-1">
                        Lộ trình Math 27 chương
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                     </button>
                     <button className="font-bold text-gray-700 hover:text-black flex items-center gap-1">
                        Kiến thức SAT
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                     </button>
                     <button className="font-bold text-gray-700 hover:text-black flex items-center gap-1">
                        Từ vựng SAT
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                     </button>
                  </div>
               </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 py-10 border-b border-gray-200">
               <div className="text-3xl font-black text-[#c1a063] shrink-0 w-12">03</div>
               <div className="flex flex-col gap-3 w-full">
                  <h2 className="text-2xl font-black text-gray-900">Luyện theo dạng</h2>
                  <p className="text-gray-600 font-medium">Mỗi dạng đi từ Dễ → Vừa → Khó.</p>
                  <p className="text-sm font-bold text-gray-500 mb-2">Đã làm: Math 0/1010 · Verbal 0/846 câu</p>
                  
                  <div className="flex flex-wrap items-center gap-6 mt-2">
                     <Link href="/study?cat=sat" className="bg-[#1c2331] text-white px-6 py-3 rounded-md font-bold hover:bg-black transition-colors flex items-center gap-2">
                        Luyện Math
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </Link>
                     <Link href="/study?cat=sat" className="font-bold text-gray-700 hover:text-black flex items-center gap-1">
                        Luyện Verbal
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                     </Link>
                  </div>
               </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 py-10">
               <div className="text-3xl font-black text-[#c1a063] shrink-0 w-12">04</div>
               <div className="flex flex-col gap-3 w-full">
                  <h2 className="text-2xl font-black text-gray-900">Thi thử</h2>
                  <p className="text-gray-600 font-medium">Đủ hai phần, đúng giờ, như phòng thi.</p>
                  <p className="text-sm font-bold text-gray-500 mb-2">Điểm Math ước lượng gần nhất: —</p>
                  
                  <div className="flex flex-wrap items-center gap-6 mt-2">
                     <Link href="/practice/mock" className="bg-[#1c2331] text-white px-6 py-3 rounded-md font-bold hover:bg-black transition-colors flex items-center gap-2">
                        Thi thử SAT đầy đủ
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </Link>
                     <Link href="/practice/mock" className="font-bold text-gray-700 hover:text-black flex items-center gap-1">
                        Thi thử Math hai module
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                     </Link>
                  </div>
               </div>
            </div>

         </div>
      </div>
      
    </div>
  );
}
