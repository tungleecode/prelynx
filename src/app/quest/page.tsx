export const runtime = "edge";
import Link from 'next/link';
import prisma from '@/lib/prisma';

import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function QuestPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/login');
  }

  const [user, completedCount] = await Promise.all([
    prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true, name: true, streak: true, gems: true, dailyGoal: true }
    }),
    prisma.userProgress.count({
      where: { user: { email: session.user.email! }, completed: true }
    })
  ])

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#fdfaf6] w-full pb-32 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="w-full bg-[#fdfaf6] border-b border-gray-200/60 pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center justify-between">
           <div>
             <h3 className="text-[#c1a063] font-black tracking-widest text-sm uppercase">Nhiệm vụ & Phần thưởng</h3>
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mt-1">Quests</h1>
             <p className="text-gray-600 font-medium text-lg mt-2">Hoàn thành nhiệm vụ để nhận EXP và duy trì chuỗi học.</p>
           </div>
           
           <div className="hidden md:flex items-center gap-4">
              <div className="bg-orange-100 border border-orange-200 px-6 py-4 rounded-md flex flex-col items-center shadow-sm">
                 <span className="text-orange-600 font-black text-3xl">🔥 {user.streak || 0}</span>
                 <span className="text-orange-800 text-xs font-bold uppercase tracking-wider mt-1">Ngày liên tiếp</span>
              </div>
              <div className="bg-blue-100 border border-blue-200 px-6 py-4 rounded-md flex flex-col items-center shadow-sm">
                 <span className="text-blue-600 font-black text-3xl">💎 {user.gems || 0}</span>
                 <span className="text-blue-800 text-xs font-bold uppercase tracking-wider mt-1">Gems</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12 flex flex-col gap-12">
         
         {/* Daily Quests */}
         <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
               <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-md flex items-center justify-center text-xl">☀️</span>
               Nhiệm vụ hằng ngày
            </h2>
            <div className="flex flex-col gap-4">
               {/* Quest 1 */}
               <div className="bg-white border border-gray-200 p-5 rounded-md shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-gray-300">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-black text-xl shrink-0">✓</div>
                     <div>
                        <h4 className="font-black text-lg text-gray-900">Hoàn thành 1 bài đọc IELTS</h4>
                        <p className="text-gray-500 font-medium text-sm mt-1">Đã nhận thưởng +50 EXP</p>
                     </div>
                  </div>
                  <button className="bg-gray-100 text-gray-400 font-bold px-6 py-2 rounded-md cursor-not-allowed">Đã nhận</button>
               </div>

               {/* Quest 2 */}
               <div className="bg-white border border-blue-200 p-5 rounded-md shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-black text-xl shrink-0 border-2 border-dashed border-gray-300"></div>
                     <div>
                        <h4 className="font-black text-lg text-gray-900">Học 20 từ vựng Flashcard</h4>
                        <p className="text-gray-500 font-medium text-sm mt-1">Tiến độ: 15/20 từ</p>
                        <div className="w-full bg-gray-100 h-2 mt-2 rounded-full overflow-hidden">
                           <div className="bg-blue-500 h-full w-[75%]"></div>
                        </div>
                     </div>
                  </div>
                  <Link href="/vocabulary" className="bg-[#1c2331] text-white font-bold px-6 py-2.5 rounded-md hover:bg-black transition-colors shrink-0">Học ngay</Link>
               </div>

               {/* Quest 3 */}
               <div className="bg-white border border-gray-200 p-5 rounded-md shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-black text-xl shrink-0 border-2 border-dashed border-gray-300"></div>
                     <div>
                        <h4 className="font-black text-lg text-gray-900">Làm 1 bài thi SAT Math</h4>
                        <p className="text-gray-500 font-medium text-sm mt-1">Phần thưởng: 💎 10 Gems</p>
                     </div>
                  </div>
                  <Link href="/sat" className="bg-[#1c2331] text-white font-bold px-6 py-2.5 rounded-md hover:bg-black transition-colors shrink-0">Thi ngay</Link>
               </div>
            </div>
         </section>

         {/* Weekly Quests */}
         <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
               <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-md flex items-center justify-center text-xl">🏆</span>
               Thử thách tuần
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white border border-purple-200 p-6 rounded-md shadow-sm flex flex-col gap-4">
                  <h4 className="font-black text-lg text-gray-900">Vua Đọc Hiểu</h4>
                  <p className="text-gray-500 font-medium">Hoàn thành 10 bài báo song ngữ trong tuần này.</p>
                  <div className="mt-auto">
                     <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                        <span>Tiến độ</span>
                        <span>4/10</span>
                     </div>
                     <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full w-[40%]"></div>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-gray-200 p-6 rounded-md shadow-sm flex flex-col gap-4">
                  <h4 className="font-black text-lg text-gray-900">Chiến thần Viết</h4>
                  <p className="text-gray-500 font-medium">Viết 3 bài IELTS Writing Task 2 đạt trên Band 6.5.</p>
                  <div className="mt-auto">
                     <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                        <span>Tiến độ</span>
                        <span>0/3</span>
                     </div>
                     <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-gray-300 h-full w-0"></div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

      </div>
    </div>
  );
}
