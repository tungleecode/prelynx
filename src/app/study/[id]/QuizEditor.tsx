"use client"
import { useState } from 'react'

export default function QuizEditor({ questions }: { questions: any[] }) {
  const [answers, setAnswers] = useState<{[key: number]: number}>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSelect = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [qIndex]: optIndex })
  }

  const processSubmit = () => {
    setIsSubmitted(true)
    setShowConfirm(false)
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      setShowConfirm(true)
    } else {
      processSubmit()
    }
  }

  const handleReset = () => {
    setAnswers({})
    setIsSubmitted(false)
    setShowConfirm(false)
  }

  // Calculate score
  let correctCount = 0;
  if (isSubmitted) {
    questions.forEach((q, i) => {
      const correctIdx = q.answerIndex !== undefined ? q.answerIndex : -1;
      if (answers[i] === correctIdx) correctCount++;
    })
  }

  return (
    <div className="mt-16 border-t-2 border-[var(--color-clay-pink)]/30 pt-8 w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-black text-[var(--color-maroon)]">Bài tập trắc nghiệm</h3>
        {isSubmitted && (
           <div className="clay-card px-4 py-2 rounded-xl bg-amber-50 text-amber-700 font-black border border-amber-200">
             Điểm: {correctCount} / {questions.length}
           </div>
        )}
      </div>

      <div className="space-y-10">
        {questions.map((q: any, i: number) => {
           const correctIdx = q.answerIndex;
           const selectedIdx = answers[i];
           const isCorrect = selectedIdx === correctIdx;

           return (
             <div key={i} className={`clay-card p-6 md:p-8 rounded-2xl transition-all ${isSubmitted ? (isCorrect ? 'ring-4 ring-green-400' : 'ring-4 ring-red-400') : ''}`}>
                <p className="font-black text-xl mb-6 text-gray-800 flex gap-2">
                  <span className="text-[var(--color-maroon)]">#{i + 1}</span> {q.stem || q.question || q.q}
                </p>
                
                {q.options && (
                  <div className="space-y-3">
                    {q.options.map((opt: string, j: number) => {
                      
                      let btnClass = "w-full text-left clay-btn px-6 py-4 rounded-xl font-bold transition-all border-2 border-transparent"
                      
                      if (!isSubmitted) {
                         if (selectedIdx === j) {
                            btnClass += " bg-[var(--color-maroon)] text-white"
                         } else {
                            btnClass += " hover:bg-gray-50 text-gray-700"
                         }
                      } else {
                         // Submitted state
                         if (j === correctIdx) {
                            btnClass += " bg-green-500 text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]" // Correct answer
                         } else if (j === selectedIdx && !isCorrect) {
                            btnClass += " bg-red-500 text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]" // Wrong choice
                         } else {
                            btnClass += " opacity-50 bg-gray-100 text-gray-500" // Not chosen and wrong
                         }
                      }

                      return (
                        <button 
                          key={j} 
                          onClick={() => handleSelect(i, j)}
                          className={btnClass}
                          disabled={isSubmitted}
                        >
                          <span className="inline-block w-8 font-black opacity-70">{String.fromCharCode(65 + j)}.</span> 
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                )}
                
                {isSubmitted && (q.solutionVi || q.whyVi) && (
                  <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 animate-in fade-in slide-in-from-top-2">
                    <span className="text-blue-700 font-black uppercase text-sm block mb-1">Giải thích chi tiết:</span>
                    <span className="font-bold text-gray-700 leading-relaxed">{q.solutionVi || q.whyVi}</span>
                  </div>
                )}
             </div>
           )
        })}
      </div>

      <div className="mt-12 flex justify-end gap-4">
         {isSubmitted ? (
           <button onClick={handleReset} className="clay-btn px-8 py-4 rounded-xl font-black text-gray-700 hover-squeeze">
             Làm lại từ đầu
           </button>
         ) : (
           <button onClick={handleSubmit} className="clay-btn bg-[var(--color-maroon)] px-8 py-4 rounded-xl font-black text-white hover-squeeze shadow-lg shadow-[var(--color-maroon)]/30">
             Nộp bài chấm điểm
           </button>
         )}
      </div>

      {/* Custom Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border-2 border-gray-100 flex flex-col items-center text-center zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-3xl mb-4">🤨</div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Chưa làm xong!</h3>
            <p className="text-gray-500 font-medium mb-8">Bạn vẫn còn câu hỏi chưa chọn đáp án. Bạn có chắc chắn muốn nộp bài ngay không?</p>
            <div className="flex gap-4 w-full">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                Làm tiếp
              </button>
              <button onClick={processSubmit} className="flex-1 py-3 rounded-xl font-black text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md hover:shadow-lg">
                Nộp luôn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
