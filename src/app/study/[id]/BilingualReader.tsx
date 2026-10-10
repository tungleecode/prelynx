"use client"
import { useState } from 'react'

export default function BilingualReader({ paragraphs }: { paragraphs: { en: string, vi?: string, text?: string, translation?: string }[] }) {
  const [showAllVi, setShowAllVi] = useState(false)
  const [visibleVi, setVisibleVi] = useState<{[key: number]: boolean}>({})

  const toggleVi = (index: number) => {
    setVisibleVi(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const toggleAll = () => {
    const newState = !showAllVi
    setShowAllVi(newState)
    const newVisible: {[key: number]: boolean} = {}
    if (newState) {
      paragraphs.forEach((_, i) => newVisible[i] = true)
    }
    setVisibleVi(newVisible)
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-black text-[var(--color-maroon)]">Nội dung bài học</h3>
        <button 
          onClick={toggleAll}
          className="clay-btn px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:text-[var(--color-maroon)] flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
          {showAllVi ? 'Ẩn tất cả dịch' : 'Hiện tất cả dịch'}
        </button>
      </div>

      <div className="clay-card p-6 md:p-10 rounded-2xl shadow-inner bg-white/50 border border-[var(--color-clay-pink)]/30 space-y-8">
        {paragraphs.map((p, i) => {
          const en = p.en || p.text;
          const vi = p.vi || p.translation;
          const isVisible = visibleVi[i];

          // If the paragraph is just a string (like long-form articles), handle it gracefully
          if (typeof p === 'string') {
            return (
              <p key={i} className="text-justify whitespace-pre-wrap leading-loose text-gray-800 text-lg font-medium">
                {p}
              </p>
            )
          }

          return (
            <div key={i} className="group relative">
              <p className="text-justify leading-loose text-gray-800 text-lg font-medium">
                {en}
              </p>
              
              {vi && (
                <div className={`mt-3 transition-all duration-300 overflow-hidden ${isVisible ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'}`}>
                  <p className="text-justify leading-relaxed text-[var(--color-maroon)] text-base font-bold italic bg-[var(--color-clay-pink)]/10 p-4 rounded-xl border-l-4 border-[var(--color-clay-pink)]">
                    {vi}
                  </p>
                </div>
              )}
              
              {vi && (
                <button 
                  onClick={() => toggleVi(i)}
                  className={`absolute -left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isVisible ? 'bg-[var(--color-maroon)] text-white shadow-md' : 'bg-gray-100 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200'}`}
                  title={isVisible ? 'Ẩn dịch' : 'Hiện dịch'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
