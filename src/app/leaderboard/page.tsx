export const runtime = "edge";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { unstable_cache } from "next/cache";

const getTopUsers = unstable_cache(
  async () => {
    return await prisma.user.findMany({
      take: 50,
      orderBy: { gems: 'desc' },
      select: {
        id: true,
        name: true,
        image: true,
        gems: true,
        streak: true,
        _count: {
          select: {
            progress: {
              where: { completed: true }
            }
          }
        }
      }
    });
  },
  ['leaderboard-top-users'],
  { revalidate: 60 }
);

export default async function LeaderboardPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/leaderboard");
  }

  // Fetch top 50 users based on Gems (Cached)
  const topUsers = await getTopUsers();

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full pb-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[var(--color-clay-pink)] opacity-20 rounded-full blur-3xl -z-10 anim-pulse-soft"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-orange-300 opacity-10 rounded-full blur-3xl -z-10 anim-float"></div>

      <div className="w-full max-w-4xl flex flex-col gap-8 z-10">
        
        {/* Header */}
        <div className="clay-card rounded-3xl p-8 bg-gradient-to-br from-[var(--color-maroon)] to-red-900 text-white text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-9xl opacity-10 rotate-12">🏆</div>
          <h1 className="text-4xl md:text-5xl font-black mb-2 hover-jiggle inline-block">Bảng Xếp Hạng Tổng</h1>
          <p className="text-lg font-medium opacity-90 max-w-xl mx-auto">
            Vinh danh những chiến binh chăm chỉ nhất. Học thật nhiều, tích lũy Gem và khẳng định vị trí của bạn!
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="clay-card rounded-3xl bg-white/80 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-[var(--color-maroon)] text-sm uppercase font-black tracking-wider border-b-2 border-gray-100">
                  <th className="px-6 py-4 rounded-tl-2xl">Hạng</th>
                  <th className="px-6 py-4">Chiến Binh</th>
                  <th className="px-6 py-4 text-center">Đã Học (Kiểm Tra)</th>
                  <th className="px-6 py-4 text-center">Chuỗi Ngày</th>
                  <th className="px-6 py-4 text-right rounded-tr-2xl">💎 Gems</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topUsers.map((u, index) => {
                  const isCurrentUser = session.user?.email && session.user?.id === u.id; // Or compare emails if ID isn't available
                  const rank = index + 1;
                  
                  let rankIcon = <span className="text-gray-500 font-black text-lg">#{rank}</span>;
                  if (rank === 1) rankIcon = <span className="text-3xl anim-bounce hover-wobble inline-block">🥇</span>;
                  if (rank === 2) rankIcon = <span className="text-3xl anim-bounce inline-block" style={{animationDelay: '0.1s'}}>🥈</span>;
                  if (rank === 3) rankIcon = <span className="text-3xl anim-bounce inline-block" style={{animationDelay: '0.2s'}}>🥉</span>;

                  return (
                    <tr 
                      key={u.id} 
                      className={`hover:bg-orange-50/50 transition-colors duration-200 ${isCurrentUser ? 'bg-orange-100/30' : ''}`}
                    >
                      <td className="px-6 py-4 text-center w-20">
                        {rankIcon}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                            {u.image ? (
                              <Image src={u.image} alt={u.name || "User"} width={40} height={40} className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[var(--color-clay-pink)] text-[var(--color-maroon)] font-bold">
                                {(u.name || "U")[0].toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 flex items-center gap-2">
                              {u.name || "Người dùng Ẩn danh"}
                              {isCurrentUser && <span className="text-[10px] bg-[var(--color-maroon)] text-white px-2 py-0.5 rounded-full uppercase font-black">Bạn</span>}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                          📚 {u._count.progress} bài
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-orange-600 flex items-center justify-center gap-1">
                          🔥 {u.streak}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-black text-[var(--color-maroon)] text-lg">
                          {u.gems}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            {topUsers.length === 0 && (
              <div className="p-12 text-center text-gray-500 font-medium">
                Chưa có ai tham gia bảng xếp hạng. Hãy là người đầu tiên!
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <Link href="/study" className="clay-btn px-8 py-3 rounded-2xl text-lg flex items-center gap-2">
            Học tiếp để tích điểm ngay
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
