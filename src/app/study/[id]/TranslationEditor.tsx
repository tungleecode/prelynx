"use client"
import { useState } from 'react'

export default function TranslationEditor({ en, vi, hint }: { en: string, vi: string, hint?: string }) {
  const [input, setInput] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <div className="mt-8 flex flex-col gap-6 w-full mx-auto">
      <div className="clay-card p-8 rounded-2xl bg-blue-50/30 border border-blue-100">
        <h3 className="text-xl font-black text-blue-600 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
          Dịch câu sau sang tiếng Việt
        </h3>
        <p className="text-2xl font-bold text-gray-800 leading-snug">{en}</p>
        
        {hint && (
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-amber-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Gợi ý: {hint}
          </div>
        )}
      </div>

      <div className="clay-card rounded-2xl p-2 bg-white/50 focus-within:ring-2 focus-within:ring-[var(--color-maroon)] transition-all">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập bản dịch của bạn vào đây..."
          className="w-full min-h-[120px] p-4 bg-transparent resize-y outline-none font-medium text-gray-800 leading-relaxed text-xl"
          spellCheck="false"
        />
      </div>

      {!isRevealed ? (
        <div className="flex justify-end mt-2">
          <button 
            onClick={() => setIsRevealed(true)}
            className="clay-btn bg-[var(--color-maroon)] text-white px-8 py-3 rounded-xl font-black hover-squeeze flex items-center gap-2"
          >
            Kiểm tra đáp án
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </button>
        </div>
      ) : (
        <div className="clay-card p-8 rounded-2xl bg-green-50 text-green-800 border border-green-200 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h4 className="font-black mb-3 text-green-700 flex items-center gap-2">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
             Đáp án tham khảo
           </h4>
           <p className="text-2xl font-bold leading-snug">{vi}</p>
           
           <div className="flex gap-4 mt-8 justify-end">
             <button onClick={() => { setInput(''); setIsRevealed(false); }} className="clay-btn px-6 py-2 rounded-lg font-bold hover-squeeze text-gray-600">
               Làm lại
             </button>
           </div>
        </div>
      )}
    </div>
  )
}
