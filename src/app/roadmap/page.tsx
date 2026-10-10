export const runtime = "edge";
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function RoadmapPage() {
  const roadmapPhases = await prisma.lesson.findMany({
    where: { type: 'study_week' }
  });

  // Sort phases by fromWeek
  const phases = roadmapPhases
    .map(p => ({ id: p.id, ...p.data as any }))
    .sort((a, b) => (a.fromWeek || 0) - (b.fromWeek || 0));

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full pb-20 bg-[var(--color-bg-cream)]/30">
      {/* Local Tabs */}
      <div className="w-full max-w-5xl flex justify-center mb-8 pt-4">
        <div className="clay-card rounded-xl p-1 flex gap-2">
           <Link href="/study" className="px-6 py-2 rounded-lg font-bold hover:bg-gray-100 text-gray-700 transition-all">Thư viện bài học</Link>
           <Link href="/roadmap" className="px-6 py-2 rounded-lg font-bold bg-[var(--color-maroon)] text-white shadow-inner transition-all">Lộ trình 60 tuần</Link>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <div className="mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)] mb-4">Lộ trình 60 tuần</h2>
          <p className="text-lg font-bold opacity-70 max-w-2xl mx-auto">
            Lộ trình học bài bản chuẩn bị cho kỳ thi IELTS & SAT. Đừng nôn nóng, hãy đi từng bước một.
          </p>
        </div>

        <div className="relative border-l-4 border-[var(--color-clay-pink)]/50 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
          {phases.map((phase, i) => (
            <div key={i} className="relative group animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
              
              {/* Timeline marker */}
              <div className="absolute -left-[54px] md:-left-[70px] top-0 w-12 h-12 md:w-16 md:h-16 rounded-full clay-card bg-[var(--color-bg-cream)] flex items-center justify-center font-black text-xl md:text-2xl text-[var(--color-maroon)] shadow-lg group-hover:scale-110 transition-transform z-10 border-4 border-white">
                {phase.id}
              </div>

              <div className="clay-card p-6 md:p-8 rounded-3xl bg-white/70 shadow-inner hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="text-3xl font-black text-gray-800">{phase.name}</h3>
                  <span className="clay-btn px-4 py-2 rounded-full text-sm font-black text-[var(--color-maroon)] uppercase tracking-widest whitespace-nowrap">
                    Tuần {phase.fromWeek} – {phase.toWeek}
                  </span>
                </div>
                
                <p className="text-lg font-bold text-gray-600 mb-6 leading-relaxed opacity-80">
                  {phase.summary}
                </p>

                {phase.slots && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {phase.slots.map((slot: any, j: number) => (
                      <div key={j} className="clay-card p-4 rounded-2xl bg-white/50">
                        <span className="text-xs font-black uppercase text-[var(--color-maroon)] opacity-80 block mb-1">
                          {slot.when}
                        </span>
                        <span className="font-bold text-gray-700 text-sm">{slot.what}</span>
                      </div>
                    ))}
                  </div>
                )}

                {phase.books && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--color-clay-pink)]/10 border border-[var(--color-clay-pink)]/30">
                    <svg className="w-6 h-6 text-[var(--color-maroon)] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    <div>
                      <span className="text-xs font-black uppercase text-gray-500 block mb-1">Tài liệu sử dụng</span>
                      <span className="font-bold text-gray-700 text-sm leading-relaxed">{phase.books}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
