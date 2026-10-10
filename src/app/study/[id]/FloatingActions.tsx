"use client"
import { useState, useEffect } from 'react'

export default function FloatingActions({ lessonId }: { lessonId: string }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showToast, setShowToast] = useState('')

  useEffect(() => {
    // Load state from localStorage
    const favs = JSON.parse(localStorage.getItem('favs') || '{}')
    const comps = JSON.parse(localStorage.getItem('comps') || '{}')
    if (favs[lessonId]) setIsFavorite(true)
    if (comps[lessonId]) setIsCompleted(true)
  }, [lessonId])

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState)
    const favs = JSON.parse(localStorage.getItem('favs') || '{}')
    favs[lessonId] = newState;
    localStorage.setItem('favs', JSON.stringify(favs))
    
    showToastMsg(newState ? 'Đã thêm vào danh sách yêu thích ❤️' : 'Đã bỏ yêu thích 💔')
  }

  const toggleCompleted = () => {
    const newState = !isCompleted;
    setIsCompleted(newState)
    const comps = JSON.parse(localStorage.getItem('comps') || '{}')
    comps[lessonId] = newState;
    localStorage.setItem('comps', JSON.stringify(comps))
    
    showToastMsg(newState ? 'Chúc mừng bạn đã hoàn thành bài học! 🎉' : 'Đã huỷ trạng thái hoàn thành')
  }

  const showToastMsg = (msg: string) => {
    setShowToast(msg)
    setTimeout(() => setShowToast(''), 3000)
  }

  return (
    <>
      <div className="fixed bottom-8 bg-white/80 backdrop-blur-lg px-8 py-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/50 flex gap-4 z-50 transition-all">
         
         {/* Favorite Button */}
         <button 
            onClick={toggleFavorite}
            className={`w-12 h-12 rounded-full flex justify-center items-center hover-squeeze transition-all ${isFavorite ? 'clay-btn bg-pink-100' : 'clay-btn'}`}
            title="Yêu thích"
         >
           <svg className={`w-5 h-5 transition-all ${isFavorite ? 'text-pink-500 scale-110' : 'text-[var(--color-maroon)]'}`} fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isFavorite ? '0' : '2'} viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
           </svg>
         </button>
         
         {/* Complete Button */}
         <button 
            onClick={toggleCompleted}
            className={`clay-card px-8 py-3 rounded-full font-black hover-squeeze transition-all flex items-center gap-2 ${isCompleted ? 'bg-green-500 text-white' : 'bg-[var(--color-maroon)] text-white'}`}
         >
           {isCompleted && (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
           )}
           {isCompleted ? 'Đã hoàn thành' : 'Hoàn thành bài học'}
         </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl font-bold z-[100] animate-in fade-in slide-in-from-top-4">
          {showToast}
        </div>
      )}
    </>
  )
}
