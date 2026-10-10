import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Import useEffect
content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')

# 2. Fix component signature and add states/effects
sig_old = """export default function LandingSections({ onOpen }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col items-center gap-24 mt-8">"""

sig_new = """export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeGuide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeGuide]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full">
      <div className="w-full flex flex-col items-center gap-24 mt-8">"""

content = content.replace(sig_old, sig_new)

# 3. Replace onOpen with setActiveGuide
content = content.replace('onOpen(', 'setActiveGuide(')

# 4. Add Footer and Side Panel at the bottom
footer_and_panel = """      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mt-20 pt-10 border-t-2 border-[var(--color-clay-pink)]/30 flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
        <div className="flex items-center gap-3 opacity-80">
          <img src="/logo.png" alt="Prelynx Logo" className="w-12 h-12 object-contain" style={{ filter: 'grayscale(100%) opacity(0.8)' }} />
          <span className="font-bold text-[var(--color-maroon)]">© 2026 Prelynx. All rights reserved.</span>
        </div>
        <div className="flex gap-6 font-bold text-sm opacity-70">
          <Link href="#" className="hover:opacity-100 transition-opacity">Về tớ</Link>
          <Link href="#" className="hover:opacity-100 transition-opacity">Điều khoản</Link>
          <Link href="#" className="hover:opacity-100 transition-opacity">Bảo mật</Link>
        </div>
      </footer>

      {/* SIDE PANEL HƯỚNG DẪN */}
      {activeGuide && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-transparent transition-opacity" 
            onClick={() => setActiveGuide(null)}
          ></div>
          
          {/* Panel */}
          <div className="relative w-full md:w-[35vw] min-w-[320px] max-w-lg bg-[var(--color-bg-cream)] h-full shadow-2xl flex flex-col animate-slide-left z-10 border-l border-white/50 overflow-y-auto">
            <style>{`
              @keyframes slideLeft {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
              .animate-slide-left {
                animation: slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>
            
            {/* Panel Header */}
            <div className="clay-card rounded-none p-8 border-b border-gray-200/50 rounded-b-3xl relative">
              <button 
                onClick={() => setActiveGuide(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full clay-btn flex items-center justify-center font-bold text-lg hover-bounce"
              >
                ✕
              </button>
              <div className="w-20 h-20 rounded-2xl clay-btn flex items-center justify-center mb-6">
                {activeGuide.svg || <span className="text-4xl">💡</span>}
              </div>
              <h2 className="text-4xl font-black text-[var(--color-maroon)] mb-2">{activeGuide.title}</h2>
              <p className="opacity-70 font-bold">Thông tin & Hướng dẫn</p>
            </div>
            
            {/* Panel Body */}
            <div className="p-8 flex-1 flex flex-col gap-6">
              <div className="clay-card p-6 rounded-xl border border-white/40">
                 {activeGuide.isAudio && (
                   <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl mb-4">
                     <button className="w-12 h-12 rounded-full bg-[var(--color-maroon)] text-white flex items-center justify-center text-xl">▶</button>
                     <div className="flex-1">
                       <div className="h-2 bg-gray-300 rounded-full w-full overflow-hidden"><div className="w-1/3 h-full bg-blue-500"></div></div>
                       <div className="flex justify-between text-xs font-bold text-gray-500 mt-1"><span>0:00</span><span>3:45</span></div>
                     </div>
                   </div>
                 )}
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <span className="text-[var(--color-maroon)]">🎯</span> Chi tiết
                </h3>
                <p className="opacity-80 leading-relaxed font-medium">
                  {activeGuide.description || "Chương trình được thiết kế nhằm giúp bạn nắm vững kiến thức nền tảng và chinh phục các mức điểm cao trong thời gian ngắn nhất thông qua phương pháp học vi mô (Microlearning)."}
                </p>
              </div>
            </div>
            
            {/* Panel Footer */}
            <div className="p-8 border-t border-white/40 mt-auto bg-white/30 backdrop-blur-md">
              <Link href="/study" className="clay-btn w-full py-5 rounded-xl text-xl font-black flex items-center justify-center gap-3 hover-squeeze">
                Bắt đầu học ngay
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"""

content = content.replace("""      </section>
    </div>
  );
}""", footer_and_panel)

with open("src/app/page.tsx", "w") as f:
    f.write(content)

