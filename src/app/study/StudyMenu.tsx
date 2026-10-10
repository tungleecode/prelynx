"use client"
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MENU_DATA = [
  {
    title: 'Tất cả bài học',
    href: 'all'
  },
  {
    title: 'Luyện thi IELTS',
    sub: [
      { label: 'IELTS Reading', href: 'article' },
      { label: 'IELTS Writing (Task 1 & 2)', href: 'writing' }
    ]
  },
  {
    title: 'Luyện thi SAT',
    sub: [
      { label: 'SAT Reading & Writing', href: 'grammar' }
    ]
  },
  {
    title: 'Kỹ năng chung',
    sub: [
      { label: 'Luyện Nghe (VOA)', href: 'listening' },
      { label: 'Dịch thuật', href: 'translation' },
      { label: 'Báo song ngữ', href: 'reading' }
    ]
  }
]

export default function StudyMenu({ currentCat, currentView }: { currentCat: string, currentView: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Find active label
  let activeLabel = 'Tất cả bài học'
  MENU_DATA.forEach(m => {
    if (m.href === currentCat) activeLabel = m.title
    if (m.sub) {
      const found = m.sub.find(s => s.href === currentCat)
      if (found) activeLabel = found.label
    }
  })

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative z-40" ref={menuRef}>
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="clay-btn bg-white/80 px-6 py-3 rounded-xl font-black text-[var(--color-maroon)] flex items-center gap-3 hover-squeeze border border-[var(--color-clay-pink)] shadow-sm"
       >
          <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          {activeLabel}
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
       </button>
       
       {isOpen && (
         <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--color-clay-pink)]/50 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="p-2 flex flex-col gap-1">
               {MENU_DATA.map((menu, i) => (
                 <div key={i}>
                    {menu.href ? (
                      <Link 
                        href={`/study?cat=${menu.href}&view=${currentView}`}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg font-bold transition-all ${currentCat === menu.href ? 'bg-[var(--color-bg-cream)] text-[var(--color-maroon)] shadow-inner' : 'hover:bg-gray-50 text-gray-700'}`}
                      >
                         {menu.title}
                      </Link>
                    ) : (
                      <div className="pt-2">
                        <div className="px-4 py-2 text-xs font-black tracking-widest text-gray-400 uppercase">
                          {menu.title}
                        </div>
                        <div className="flex flex-col gap-1">
                           {menu.sub?.map((sub, j) => (
                             <Link 
                               key={j}
                               href={`/study?cat=${sub.href}&view=${currentView}`}
                               onClick={() => setIsOpen(false)}
                               className={`block px-4 py-2.5 mx-2 rounded-lg font-bold transition-all ${currentCat === sub.href ? 'bg-[var(--color-maroon)]/10 text-[var(--color-maroon)] shadow-sm' : 'hover:bg-gray-100 text-gray-600'}`}
                             >
                               {sub.label}
                             </Link>
                           ))}
                        </div>
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </div>
       )}
    </div>
  )
}
