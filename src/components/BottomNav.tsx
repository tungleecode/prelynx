"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Ẩn thanh BottomNav hoàn toàn nếu người dùng chưa đăng nhập
  if (!session) return null;

  const navItems = [
    {
      name: 'Trang chủ',
      href: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      )
    },
    {
      name: 'Thư viện',
      href: '/study',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
      )
    },
    {
      name: 'Thực hành',
      href: '/practice',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      )
    },
    {
      name: 'Từ vựng',
      href: '/vocabulary',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
        </svg>
      )
    },
    {
      name: 'Quest',
      href: '/quest',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9990] w-[95%] max-w-md px-2 md:hidden">
      <div className="bg-white/80 backdrop-blur-xl border-2 border-gray-200/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex justify-between items-center relative overflow-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-14 md:w-20 md:h-16 rounded-xl transition-all duration-300 relative group z-10 ${
                isActive ? 'text-[var(--color-maroon)]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-[var(--color-clay-pink)]/20 rounded-xl scale-100 transition-transform duration-300" />
              )}
              <div className={`relative z-10 transition-transform duration-300 ${isActive ? '-translate-y-1 scale-110' : 'group-hover:-translate-y-1'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] md:text-xs font-black mt-1 transition-all duration-300 relative z-10 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
