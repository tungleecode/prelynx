"use client"
import { useState, useEffect } from 'react'

export default function EssayEditor({ minWords = 250, lessonId, timeLimitSeconds = 2400 }: { minWords?: number, lessonId?: string, timeLimitSeconds?: number }) {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Load draft from localStorage on mount
  useEffect(() => {
    if (lessonId) {
      const draft = localStorage.getItem(`essay_draft_${lessonId}`)
      if (draft) setText(draft)
    }
  }, [lessonId])

  // Save to localStorage when text changes
  useEffect(() => {
    if (lessonId && text) {
      localStorage.setItem(`essay_draft_${lessonId}`, text)
    }
  }, [text, lessonId])
  
  // Timer interval
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeLeft])

  // Simple word count by splitting on whitespace
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length
  const progress = Math.min(100, (wordCount / minWords) * 100)

  const handleSubmit = async () => {
    if (wordCount < 10) return alert('Vui lòng viết dài hơn một chút nhé!')
    setIsSubmitting(true)
    setIsTimerRunning(false)
    
    try {
      const res = await fetch('/api/essay/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, content: text })
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.feedback)
        // Clear draft
        if (lessonId) localStorage.removeItem(`essay_draft_${lessonId}`)
      } else {
        alert(data.error || 'Có lỗi xảy ra!')
      }
    } catch (err) {
      console.error(err)
      alert('Không thể kết nối với AI')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="mt-8 flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {result ? (
        <div className="clay-card rounded-3xl p-8 bg-gradient-to-br from-white to-[var(--color-bg-cream)] w-full">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 border-b-2 border-gray-200 pb-8">
              <div className="text-center md:text-left">
                 <h2 className="text-3xl font-black text-[var(--color-maroon)]">Kết quả đánh giá AI</h2>
                 <p className="text-gray-500 font-bold mt-2">Bài viết đã được lưu vào hồ sơ của bạn</p>
              </div>
              <div className="clay-card w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center border-4 border-[var(--color-maroon)]">
                 <span className="text-4xl font-black text-[var(--color-maroon)]">{result.overall.toFixed(1)}</span>
                 <span className="text-xs font-bold uppercase text-gray-400">Overall</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="clay-card p-5 rounded-2xl bg-white border-l-8 border-l-blue-500">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="font-black text-lg text-gray-800">Task Response</h4>
                    <span className="font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{result.taskResponse.score.toFixed(1)}</span>
                 </div>
                 <p className="text-gray-600 font-medium text-sm">{result.taskResponse.comment}</p>
              </div>
              <div className="clay-card p-5 rounded-2xl bg-white border-l-8 border-l-green-500">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="font-black text-lg text-gray-800">Coherence</h4>
                    <span className="font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">{result.coherence.score.toFixed(1)}</span>
                 </div>
                 <p className="text-gray-600 font-medium text-sm">{result.coherence.comment}</p>
              </div>
              <div className="clay-card p-5 rounded-2xl bg-white border-l-8 border-l-purple-500">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="font-black text-lg text-gray-800">Lexical Resource</h4>
                    <span className="font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{result.lexical.score.toFixed(1)}</span>
                 </div>
                 <p className="text-gray-600 font-medium text-sm">{result.lexical.comment}</p>
              </div>
              <div className="clay-card p-5 rounded-2xl bg-white border-l-8 border-l-orange-500">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="font-black text-lg text-gray-800">Grammar</h4>
                    <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">{result.grammar.score.toFixed(1)}</span>
                 </div>
                 <p className="text-gray-600 font-medium text-sm">{result.grammar.comment}</p>
              </div>
           </div>

           <div className="clay-card p-6 rounded-2xl bg-white/50 border border-dashed border-gray-300">
             <h4 className="font-black text-lg text-gray-800 mb-4">Gợi ý sửa lỗi (Corrections)</h4>
             <ul className="space-y-4">
               {result.corrections.map((c: any, i: number) => (
                 <li key={i} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0 font-bold">❌</div>
                    <div>
                      <p className="font-medium text-gray-500 line-through mb-1">{c.original}</p>
                      <p className="font-bold text-green-600 mb-2">✨ {c.suggestion}</p>
                      <p className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded-lg">{c.explanation}</p>
                    </div>
                 </li>
               ))}
             </ul>
           </div>
           
           <button onClick={() => {setResult(null); setText('')}} className="w-full mt-8 clay-btn py-4 rounded-xl font-bold bg-white text-gray-700">
             Viết bài mới
           </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-end mb-2">
             <div className="flex items-center gap-4">
               <h3 className="text-2xl font-black text-[var(--color-maroon)]">Bài làm của bạn</h3>
               <div className="flex items-center gap-2">
                 <span className={`font-mono text-xl font-bold clay-card px-3 py-1 rounded-md ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
                   ⏱ {formatTime(timeLeft)}
                 </span>
                 {!isTimerRunning && timeLeft > 0 && timeLeft < timeLimitSeconds && (
                   <button onClick={() => setIsTimerRunning(true)} className="text-sm text-[var(--color-maroon)] font-bold hover:underline">Tiếp tục</button>
                 )}
               </div>
             </div>
             <span className={`font-bold text-sm ${wordCount < minWords ? 'text-red-500' : 'text-green-600'}`}>
               {wordCount} / {minWords} từ
             </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-[var(--color-clay-pink)]/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          <div className="clay-card rounded-2xl p-2 bg-white/50 shadow-inner focus-within:ring-2 focus-within:ring-[var(--color-maroon)] transition-all">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                if (!isTimerRunning && timeLeft > 0) setIsTimerRunning(true)
              }}
              placeholder="Bắt đầu gõ để tính giờ..."
              className="w-full min-h-[300px] p-4 bg-transparent resize-y outline-none font-medium text-gray-800 leading-relaxed text-lg"
              spellCheck="false"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || wordCount < 10}
              className="clay-btn bg-[var(--color-maroon)] text-white px-8 py-3 rounded-xl font-black hover-squeeze disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'AI Đang Chấm Điểm ⏳' : 'Nộp bài chấm điểm AI'}
              {!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
