export const runtime = "edge";

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { users, userProgresses, flashcardReviews } from '@/lib/db/schema'
import { eq, count, and, gte, lte } from 'drizzle-orm'
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth()
  if (!session || !session.user) {
    redirect('/login?callbackUrl=/dashboard')
  }

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email!),
    columns: {
      id: true, name: true, image: true, streak: true,
      gems: true, dailyGoal: true, currentBand: true,
      targetBand: true, examDate: true
    }
  })
  if (!user) redirect('/login')

  // Run all stats queries in parallel
  const [progressResult, dueResult] = await Promise.all([
    db.select({ value: count() }).from(userProgresses)
      .where(and(eq(userProgresses.userId, user.id), gte(userProgresses.lastSeen, startOfDay))),
    db.select({ value: count() }).from(flashcardReviews)
      .where(and(eq(flashcardReviews.userId, user.id), lte(flashcardReviews.dueDate, new Date())))
  ])
  
  const progressToday = progressResult[0].value;
  const dueFlashcards = dueResult[0].value;

  const minutesToday = progressToday * 15

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full pb-20">
      
      <div className="w-full max-w-7xl flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="clay-card rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white to-[var(--color-bg-cream)] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex-1 relative z-10 flex flex-col items-start gap-4">
            <span className="bg-white/80 backdrop-blur-sm text-[var(--color-maroon)] px-4 py-1.5 rounded-full text-sm font-bold shadow-sm border border-white">Tổng quan</span>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
              Hôm nay học tiếp, <br/>
              <span className="text-[var(--color-maroon)] bg-yellow-200/50 px-2 rounded-lg">đúng chỗ đang dở</span>
            </h1>
            
            <p className="text-lg font-medium text-gray-600 mt-2 max-w-2xl">
              2.800+ bài học, đọc và tra từ vựng ngay trong ngữ cảnh. Hệ thống Spaced Repetition (SM-2) tự động nhắc nhở từ vựng tới hạn.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/study?view=roadmap" className="clay-btn px-8 py-3 rounded-2xl text-lg flex items-center gap-2">
                Bắt đầu luyện
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
              <Link href="/study" className="clay-card px-8 py-3 rounded-2xl text-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                Mở thư viện
              </Link>
            </div>
          </div>
          
          {/* Stats Badges */}
          <div className="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="clay-card bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-orange-500">{minutesToday}</span>
                <span className="text-xs font-bold text-gray-500 uppercase mt-1">/ {user.dailyGoal || 60} phút hôm nay</span>
             </div>
             <div className="clay-card bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-[var(--color-maroon)]">{user.streak}</span>
                <span className="text-xs font-bold text-gray-500 uppercase mt-1">Ngày liên tiếp</span>
             </div>
             <div className="clay-card bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-blue-500">{user.currentBand ? user.currentBand.toFixed(1) : '?'}</span>
                <span className="text-xs font-bold text-gray-500 uppercase mt-1">Band dự đoán</span>
             </div>
             <div className="clay-card bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-red-500">{dueFlashcards}</span>
                <span className="text-xs font-bold text-gray-500 uppercase mt-1">Thẻ từ tới hạn</span>
             </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute right-[-5%] top-[-10%] w-64 h-64 bg-[var(--color-clay-pink)] opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute left-[20%] bottom-[-20%] w-80 h-80 bg-orange-300 opacity-20 rounded-full blur-3xl"></div>
        </div>

        {/* Promo / Quest Banner */}
        <div className="clay-card rounded-2xl p-6 bg-gradient-to-r from-[var(--color-maroon)] to-orange-800 text-white flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">🎁</div>
              <div>
                 <h3 className="text-xl font-black">Nâng cấp Prelynx Pro</h3>
                 <p className="text-sm font-medium opacity-90 mt-1">Mở khóa tính năng Chấm IELTS Writing bằng AI và Xem bài giải chi tiết.</p>
              </div>
           </div>
           <button className="clay-btn bg-white !text-[var(--color-maroon)] px-6 py-2 rounded-xl text-sm whitespace-nowrap border-none hover:bg-gray-100">
             Nâng cấp ngay
           </button>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
           {/* Roadmap Card */}
           <div className="clay-card p-6 rounded-3xl flex flex-col gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl">📅</div>
                 <div>
                    <h3 className="text-xl font-black text-gray-800">
                      {user.targetBand ? `Mục tiêu của bạn: Band ${user.targetBand.toFixed(1)}` : 'Chưa có lộ trình của bạn'}
                    </h3>
                    <p className="text-sm font-medium text-gray-500">
                      {user.targetBand 
                        ? `Ngày thi dự kiến: ${user.examDate?.toLocaleDateString('vi-VN')} (${user.dailyGoal} phút/ngày)` 
                        : 'Đặt mục tiêu và ngày thi, app xếp bài mỗi ngày.'}
                    </p>
                 </div>
              </div>
              <div className="mt-4 flex justify-end">
                 <Link href="/plan" className="clay-card px-6 py-2 rounded-xl font-bold bg-white text-gray-800 hover:bg-gray-50">
                    {user.targetBand ? 'Sửa lộ trình \u2192' : 'Lập lộ trình \u2192'}
                 </Link>
              </div>
           </div>

           {/* AI IELTS Writing Card */}
           <div className="clay-card p-6 rounded-3xl flex flex-col gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">🤖</div>
                 <div>
                    <h3 className="text-xl font-black text-gray-800">Chấm điểm IELTS Writing AI</h3>
                    <p className="text-sm font-medium text-gray-500">Làm ít nhất 1 bài Writing để AI dự đoán band điểm.</p>
                 </div>
              </div>
              <div className="mt-4 flex justify-end">
                 <Link href="/study?cat=writing" className="clay-card px-6 py-2 rounded-xl font-bold bg-white text-gray-800 hover:bg-gray-50">Viết ngay &rarr;</Link>
              </div>
           </div>

        </div>

      </div>
    </div>
  )
}
