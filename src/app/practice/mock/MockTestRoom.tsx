'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { playClickSound, playPopSound, playSuccessSound } from '@/lib/sounds';

export default function MockTestRoom({ lesson }: { lesson: any }) {
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300; // less than 5 mins
  const data = lesson?.data || {};
  const paragraphs = data.paragraphs || [];
  const questions = data.questions || [];

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q: any, idx: number) => {
      if (answers[idx] === q.answerIndex?.toString()) {
        correct++;
      }
    });
    return correct;
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const processSubmit = async () => {
    setIsSubmitted(true);
    setShowConfirm(false);
    const score = calculateScore();
    try {
      playSuccessSound();
      const { saveMockTestResult } = await import('@/app/actions');
      await saveMockTestResult(lesson.id, score, answers);
    } catch (err) {
      console.error("Lỗi lưu điểm:", err);
    }
  };

  const handleSubmit = () => {
    playClickSound();
    setShowConfirm(true);
  };

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col font-sans selection:bg-[var(--color-clay-pink)] selection:text-white">
      
      {/* Exam Header */}
      <div className="h-16 bg-[#2b2b2b] text-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
           <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black">M</div>
           <span className="font-bold text-lg hidden md:block">{data.titleEn || data.title || 'Mock Test'}</span>
        </div>
        
        {/* Timer */}
        <div className={`flex items-center gap-2 font-black text-2xl tracking-wider ${isLowTime && !isSubmitted ? 'text-red-500 animate-pulse' : 'text-white'}`}>
           <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           {isSubmitted ? 'HOÀN THÀNH' : formatTime(timeLeft)}
        </div>

        <div className="flex items-center gap-3">
           <Link href="/practice" className="px-4 py-1.5 rounded bg-gray-700 hover:bg-gray-600 font-bold text-sm transition-colors">
              Thoát
           </Link>
           {!isSubmitted && (
             <button onClick={handleSubmit} className="px-4 py-1.5 rounded bg-[#c1a063] hover:bg-yellow-600 font-bold text-sm text-white transition-colors">
                Nộp Bài
             </button>
           )}
        </div>
      </div>

      {/* Main Split Screen */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-gray-100 p-2 gap-2">
         
         {/* Left Pane: Reading Passage */}
         <div className="flex-1 bg-white rounded-md shadow-sm border border-gray-200 overflow-y-auto p-8 relative">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-center font-black text-2xl mb-8">{data.titleEn || data.title || 'READING PASSAGE'}</h2>
              <p className="font-bold text-gray-500 italic mb-6">You should spend about 20 minutes on Questions 1-{questions.length || 13}, which are based on the passage below.</p>
              
              {data.standfirstEn && (
                <p className="text-xl font-bold text-gray-800 mb-6 italic">{data.standfirstEn}</p>
              )}

              {paragraphs.map((p: any, idx: number) => (
                <p key={idx} className="text-lg leading-loose text-justify text-gray-800 mb-6">
                  {typeof p === 'string' ? p : (p.en || p.text)}
                  {isSubmitted && typeof p !== 'string' && p.vi && (
                    <span className="block text-base text-gray-500 italic mt-2">{p.vi}</span>
                  )}
                </p>
              ))}
              
              {paragraphs.length === 0 && (
                <p className="text-lg text-gray-500 italic">No passage text available.</p>
              )}
            </div>
         </div>

         {/* Right Pane: Questions */}
         <div className="flex-1 bg-white rounded-md shadow-sm border border-gray-200 overflow-y-auto p-8 relative">
            <div className="max-w-2xl mx-auto flex flex-col gap-8">
               
               {isSubmitted && (
                 <div className="bg-green-50 border-2 border-green-200 p-6 rounded-md flex flex-col items-center justify-center text-center">
                   <h3 className="text-xl font-bold text-green-800 mb-2">Kết Quả Bài Thi</h3>
                   <div className="text-5xl font-black text-green-600 mb-2">{calculateScore()} / {questions.length}</div>
                   <p className="text-green-700 font-medium">Bạn đã hoàn thành bài thi! Xem giải thích chi tiết bên dưới.</p>
                 </div>
               )}

               <div className="clay-card p-6 bg-blue-50/50 rounded-md border border-blue-100">
                  <h4 className="font-black text-lg mb-2">Questions 1-{questions.length || 0}</h4>
                  <p className="text-sm font-bold text-gray-600 mb-6">Choose the correct answer for each question.</p>
                  
                  <div className="flex flex-col gap-8">
                     {questions.map((q: any, qIdx: number) => {
                        const isCorrect = answers[qIdx] === q.answerIndex?.toString();
                        const answered = answers[qIdx] !== undefined;
                        
                        return (
                          <div key={qIdx} className={`flex flex-col gap-4 p-4 rounded-md ${isSubmitted ? (isCorrect ? 'bg-green-50/50 border border-green-100' : 'bg-red-50/50 border border-red-100') : ''}`}>
                             <div className="flex gap-3 text-lg font-bold text-gray-800">
                                <span className={`w-8 h-8 rounded-md flex items-center justify-center font-black shrink-0 ${isSubmitted ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-blue-100 text-blue-800'}`}>
                                  {qIdx + 1}
                                </span>
                                <span>{q.q || q.question}</span>
                             </div>
                             
                             {q.options && q.options.length > 0 ? (
                                <div className="flex flex-col gap-2 pl-11">
                                   {q.options.map((opt: string, oIdx: number) => {
                                      const isSelected = answers[qIdx] === oIdx.toString();
                                      const isActualAnswer = q.answerIndex === oIdx;
                                      
                                      let optionClass = "text-gray-700";
                                      if (isSubmitted) {
                                        if (isActualAnswer) optionClass = "text-green-700 font-bold bg-green-100/50 p-1 rounded";
                                        else if (isSelected && !isActualAnswer) optionClass = "text-red-600 line-through";
                                      } else if (isSelected) {
                                        optionClass = "text-black font-bold";
                                      }

                                      return (
                                        <label key={oIdx} className="flex items-start gap-3 cursor-pointer group">
                                           <input 
                                              type="radio" 
                                              name={`q-${qIdx}`} 
                                              className="mt-1.5 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                                              checked={isSelected}
                                              onChange={() => {
                                                if (!isSubmitted) {
                                                  playClickSound();
                                                  setAnswers({...answers, [qIdx]: oIdx.toString()});
                                                }
                                              }}
                                              disabled={isSubmitted}
                                           />
                                           <span className={`text-lg ${optionClass}`}>{opt}</span>
                                        </label>
                                      );
                                   })}
                                </div>
                             ) : (
                                <div className="pl-11">
                                   <input 
                                      type="text" 
                                      placeholder="Your answer..."
                                      className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 font-medium px-2 py-1 text-lg disabled:opacity-50"
                                      value={answers[qIdx] || ''}
                                      onChange={(e) => !isSubmitted && setAnswers({...answers, [qIdx]: e.target.value})}
                                      disabled={isSubmitted}
                                   />
                                   {isSubmitted && q.answer && (
                                     <div className="mt-2 text-green-600 font-bold">Đáp án đúng: {q.answer}</div>
                                   )}
                                </div>
                             )}

                             {isSubmitted && q.whyVi && (
                               <div className="mt-4 pl-11">
                                 <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm">
                                    <strong className="text-blue-600 block mb-1">Giải thích:</strong>
                                    {q.whyVi}
                                 </div>
                               </div>
                             )}
                          </div>
                        );
                     })}

                     {questions.length === 0 && (
                        <p className="text-gray-500 italic text-center py-8">No questions available for this passage.</p>
                     )}
                  </div>
               </div>

            </div>
         </div>
         
      </div>
      {/* Custom Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border-2 border-gray-100 flex flex-col items-center text-center zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-3xl mb-4">🤔</div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Nộp bài ngay?</h3>
            <p className="text-gray-500 font-medium mb-8">Bạn có chắc chắn muốn kết thúc và chấm điểm bài làm này không?</p>
            <div className="flex gap-4 w-full">
              <button onClick={() => { playClickSound(); setShowConfirm(false); }} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                Quay lại
              </button>
              <button onClick={processSubmit} className="flex-1 py-3 rounded-xl font-black text-white bg-[#c1a063] hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg">
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
