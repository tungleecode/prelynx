"use client"
import { useState } from 'react'

export default function VocabSection({ vocab }: { vocab: any[] }) {
  const [flipped, setFlipped] = useState<{[key: number]: boolean}>({})

  const toggleFlip = (index: number) => {
    setFlipped(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-black text-[var(--color-maroon)]">Từ vựng nổi bật</h3>
        <span className="clay-card px-3 py-1 rounded-md text-sm font-bold opacity-70 bg-white/50">{vocab.length} từ</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
        {vocab.map((v: any, i: number) => {
          const isFlipped = flipped[i]
          
          return (
            <div 
              key={i} 
              className="relative h-64 w-full cursor-pointer group"
              onClick={() => toggleFlip(i)}
              style={{ perspective: '1000px' }}
            >
              <div 
                className={`absolute w-full h-full transition-transform duration-500 preserve-3d shadow-sm hover:shadow-md rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div 
                  className="absolute w-full h-full backface-hidden clay-card bg-white p-6 rounded-2xl flex flex-col justify-center items-center text-center border-t border-l border-white/60 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8)]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="font-black text-3xl text-[var(--color-maroon)] mb-2 group-hover:scale-110 transition-transform">{v.word || v.en}</span>
                  <span className="text-sm font-bold opacity-50 bg-gray-100 px-3 py-1 rounded-full">{v.pos || 'n'}</span>
                  {v.phonetic || v.ipa && (
                    <span className="text-sm font-medium text-gray-500 mt-2 font-mono">{v.phonetic || v.ipa}</span>
                  )}
                  <p className="mt-6 text-xs font-bold uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Chạm để lật</p>
                </div>
                
                {/* Back */}
                <div 
                  className="absolute w-full h-full backface-hidden clay-card bg-[var(--color-bg-cream)] p-6 rounded-2xl flex flex-col justify-center border-t border-l border-white/60 shadow-[inset_4px_4px_10px_rgba(0,0,0,0.05),inset_-4px_-4px_10px_rgba(255,255,255,0.8)]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <h4 className="font-black text-xl text-gray-800 mb-1">{v.meaning || v.meaningVi || v.vi}</h4>
                  
                  {v.collocation && (
                    <div className="mt-3">
                      <span className="text-xs font-black uppercase text-gray-400">Collocation</span>
                      <p className="font-bold text-sm text-[var(--color-maroon)]">{v.collocation}</p>
                    </div>
                  )}
                  
                  {v.example && (
                    <div className="mt-2">
                      <span className="text-xs font-black uppercase text-gray-400">Ví dụ</span>
                      <p className="font-medium text-sm italic text-gray-600 line-clamp-3">"{v.example}"</p>
                    </div>
                  )}
                  
                  {v.derivatives && (
                    <div className="mt-2 text-xs font-bold text-gray-500">
                      <span className="text-gray-400">Họ từ: </span>{v.derivatives}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  )
}
