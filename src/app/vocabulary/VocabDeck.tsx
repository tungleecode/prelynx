"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function VocabDeck({ vocabList }: { vocabList: any[] }) {
  const { data: session } = useSession()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownVocab, setKnownVocab] = useState<Set<string>>(new Set())
  const [deck, setDeck] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // On mount, shuffle and load progress
  useEffect(() => {
    // We can also fetch due cards from API if session exists, but for now we fallback to localStorage
    const saved = localStorage.getItem('prelynx_known_vocab')
    const known = saved ? new Set<string>(JSON.parse(saved)) : new Set<string>()
    setKnownVocab(known)

    const toLearn = vocabList.filter(v => !known.has(v.word || v.en))
    const shuffled = [...toLearn].sort(() => Math.random() - 0.5)
    
    if (shuffled.length === 0 && vocabList.length > 0) {
      setDeck([...vocabList].sort(() => Math.random() - 0.5))
    } else {
      setDeck(shuffled)
    }
  }, [vocabList])

  const saveProgress = (word: string) => {
    const updated = new Set(knownVocab)
    updated.add(word)
    localStorage.setItem('prelynx_known_vocab', JSON.stringify(Array.from(updated)))
    setKnownVocab(updated)
  }

  const handleReview = async (quality: number) => {
    if (isSubmitting || !deck[currentIndex]) return
    
    const word = deck[currentIndex].word || deck[currentIndex].en
    
    // Save to local storage for quick UI fallback
    if (quality >= 3) {
      saveProgress(word)
    }
    
    if (session) {
      setIsSubmitting(true)
      try {
        await fetch('/api/flashcards/review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vocabId: word, quality })
        })
      } catch (err) {
        console.error('Failed to save review:', err)
      } finally {
        setIsSubmitting(false)
      }
    }
    
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % deck.length)
    }, 150)
  }

  if (deck.length === 0) {
    return (
      <div className="clay-card p-12 text-center rounded-3xl bg-white/50 animate-pulse">
        <h3 className="text-2xl font-black text-gray-400">Đang tải bộ thẻ...</h3>
      </div>
    )
  }

  const currentVocab = deck[currentIndex]

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      
      {!session && (
        <div className="w-full bg-yellow-100 text-yellow-800 p-3 rounded-xl font-bold text-center text-sm border-2 border-yellow-300">
           💡 Bạn chưa đăng nhập. Tiến độ Spaced Repetition (SM-2) sẽ không được lưu vào máy chủ.
        </div>
      )}

      <div className="w-full flex justify-between items-center px-4 font-bold text-gray-500">
        <span>Tiến trình: <span className="text-green-600">{knownVocab.size}</span> / {vocabList.length}</span>
        <span>Thẻ {currentIndex + 1} / {deck.length}</span>
      </div>

      {/* Flashcard */}
      <div 
        className="relative w-full h-[400px] cursor-pointer group perspective-1000"
        onClick={() => !isSubmitting && setIsFlipped(!isFlipped)}
      >
        <div 
          className={`absolute w-full h-full transition-transform duration-500 preserve-3d shadow-xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div 
            className="absolute w-full h-full backface-hidden clay-card bg-white p-8 rounded-3xl flex flex-col justify-center items-center text-center border-t-2 border-l-2 border-white/60"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="font-black text-5xl md:text-6xl text-[var(--color-maroon)] mb-4">{currentVocab.word || currentVocab.en}</span>
            <span className="text-lg font-bold opacity-50 bg-gray-100 px-4 py-1.5 rounded-full mb-3">{currentVocab.pos || 'n'}</span>
            {currentVocab.phonetic || currentVocab.ipa ? (
              <span className="text-xl font-medium text-gray-500 font-mono">[{currentVocab.phonetic || currentVocab.ipa}]</span>
            ) : null}
            <p className="absolute bottom-6 text-sm font-black uppercase tracking-widest text-gray-300 animate-pulse">Chạm để xem nghĩa</p>
          </div>
          
          {/* Back */}
          <div 
            className="absolute w-full h-full backface-hidden clay-card bg-[var(--color-bg-cream)] p-8 rounded-3xl flex flex-col justify-center border-t-2 border-l-2 border-white/60"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <h4 className="font-black text-3xl text-gray-800 mb-6 text-center">{currentVocab.meaning || currentVocab.meaningVi || currentVocab.vi}</h4>
            
            <div className="space-y-4">
              {currentVocab.collocation && (
                <div className="clay-card p-4 rounded-xl bg-white/40">
                  <span className="text-xs font-black uppercase text-[var(--color-maroon)] block mb-1">Collocation</span>
                  <p className="font-bold text-gray-800">{currentVocab.collocation}</p>
                </div>
              )}
              
              {currentVocab.example && (
                <div className="clay-card p-4 rounded-xl bg-white/40">
                  <span className="text-xs font-black uppercase text-[var(--color-maroon)] block mb-1">Ví dụ</span>
                  <p className="font-medium text-gray-700 italic">"{currentVocab.example}"</p>
                </div>
              )}
            </div>

            {currentVocab.lessonId && (
              <div className="absolute bottom-6 left-0 w-full text-center">
                <Link href={`/study/${currentVocab.lessonId}`} onClick={(e) => e.stopPropagation()} className="text-sm font-bold text-blue-500 hover:underline">
                  Từ bài: {currentVocab.sourceTitle}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SM-2 Controls */}
      <div className={`flex gap-3 w-full transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReview(0); }}
          disabled={isSubmitting}
          className="flex-1 clay-btn py-4 rounded-2xl bg-red-100 !text-red-700 font-black text-lg hover-squeeze border-2 !border-red-300 shadow-sm flex flex-col items-center"
        >
          <span>Lại</span>
          <span className="text-[10px] opacity-70">&lt;1 phút</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReview(3); }}
          disabled={isSubmitting}
          className="flex-1 clay-btn py-4 rounded-2xl bg-orange-100 !text-orange-700 font-black text-lg hover-squeeze border-2 !border-orange-300 shadow-sm flex flex-col items-center"
        >
          <span>Khó</span>
          <span className="text-[10px] opacity-70">1-2 ngày</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReview(4); }}
          disabled={isSubmitting}
          className="flex-1 clay-btn py-4 rounded-2xl bg-green-100 !text-green-700 font-black text-lg hover-squeeze border-2 !border-green-300 shadow-sm flex flex-col items-center"
        >
          <span>Tốt</span>
          <span className="text-[10px] opacity-70">3-4 ngày</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReview(5); }}
          disabled={isSubmitting}
          className="flex-1 clay-btn py-4 rounded-2xl bg-blue-100 !text-blue-700 font-black text-lg hover-squeeze border-2 !border-blue-300 shadow-sm flex flex-col items-center"
        >
          <span>Dễ</span>
          <span className="text-[10px] opacity-70">5-6 ngày</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  )
}
