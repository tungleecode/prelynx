"use client"
import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"

export default function LoginPage() {
  const [isOpen, setIsOpen] = useState(false)

  // Auto-open book after a short delay for a cool effect
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[url('/grid-bg.png')] flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf6]/80 to-[#fdfaf6] z-0"></div>
      
      {/* 3D Book Container */}
      <div className="relative w-full max-w-sm h-[500px] z-10 [perspective:2000px]">
        <div className={`w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] ${isOpen ? 'translate-x-[25%] md:translate-x-[50%]' : ''}`}>
          
          {/* Cover Page */}
          <div 
            className={`absolute inset-0 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] shadow-2xl z-20 rounded-r-2xl border-r-4 border-b-4 border-[#3d1b11] bg-[#5e2e1d] cursor-pointer ${isOpen ? '[transform:rotateY(-180deg)]' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Front Cover */}
            <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center p-8 text-center rounded-r-2xl overflow-hidden bg-gradient-to-br from-[#6b3522] to-[#4a2214]">
              {/* Spine texture */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/20 border-r border-white/10"></div>
              
              <img src="/logo.png" alt="Prelynx" className="w-24 h-24 mb-6 drop-shadow-xl z-10" style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }} />
              <h1 className="text-4xl font-black text-[#f4e6c3] tracking-widest uppercase mb-4 z-10 drop-shadow-md" style={{ fontFamily: 'serif' }}>Prelynx</h1>
              <p className="text-[#d8bfa5] font-bold tracking-widest text-sm z-10 uppercase border-y border-[#d8bfa5]/40 py-2 px-6">Bí Kíp Tiếng Anh</p>
              
              <div className="absolute bottom-8 text-xs font-black text-[#d8bfa5]/60 tracking-widest uppercase z-10">
                {isOpen ? 'Đang mở sách...' : 'Nhấn để mở'}
              </div>
            </div>

            {/* Back of Cover (Left inside page) */}
            <div className="absolute inset-0 [backface-visibility:hidden] bg-[#f4e6c3] rounded-l-2xl border-l-4 border-b-4 border-[#d8bfa5] p-8 shadow-inner overflow-hidden" style={{ transform: 'rotateY(180deg)' }}>
              {/* Page crease shadow */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent"></div>
              
              <div className="h-full border border-amber-900/20 p-6 flex flex-col items-center justify-center text-center opacity-80" style={{ backgroundImage: 'linear-gradient(transparent 95%, #a78b6d 100%)', backgroundSize: '100% 28px' }}>
                <h2 className="text-2xl font-black text-[#5e2e1d] mb-4 font-serif">Lời mở đầu</h2>
                <p className="text-sm text-[#5e2e1d] leading-relaxed font-medium italic">
                  "Hành trình vạn dặm bắt đầu từ một bước chân. <br/><br/> Chào mừng bạn đến với học viện Prelynx. Nơi ngôn ngữ không còn là rào cản, mà là chiếc chìa khoá mở ra thế giới."
                </p>
                <div className="mt-12 w-16 h-1 bg-[#5e2e1d]/20 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Page (Login Form) */}
          <div className="absolute inset-0 bg-[#fdfaf6] rounded-r-2xl border-r-4 border-b-4 border-[#e8dcc5] shadow-xl z-10 p-8 flex flex-col justify-center">
            {/* Page crease shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent"></div>
            
            <div className="relative z-10 pl-4 flex flex-col justify-center h-full">
              <h2 className="text-3xl font-black text-[#5e2e1d] mb-2 text-center">Đăng Nhập</h2>
              <p className="text-sm font-bold text-[#a78b6d] mb-10 text-center uppercase tracking-widest">Prelynx Academy</p>
              
              <div className="flex flex-col gap-4 w-full">
                {/* Google Button */}
                <button onClick={() => signIn("google", { callbackUrl: "/study" })} type="button" className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 p-4 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700 shadow-sm hover-wobble">
                  <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Tiếp tục với Google
                </button>

                {/* Discord Button */}
                <button onClick={() => signIn("discord", { callbackUrl: "/study" })} type="button" className="w-full flex items-center justify-center gap-3 bg-[#5865F2] border-2 border-[#4752C4] p-4 rounded-xl hover:bg-[#4752C4] transition-all font-bold text-white shadow-sm hover-wobble">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 127.14 96.36">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.18,65.69,84.69,65.69Z"/>
                  </svg>
                  Tiếp tục với Discord
                </button>
              </div>

              <div className="mt-8 text-center text-xs font-bold text-[#a78b6d] opacity-80 px-2 leading-relaxed">
                <p>Vì lý do bảo mật và kiểm soát hệ thống, Prelynx chỉ hỗ trợ đăng nhập qua tài khoản mạng xã hội.</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
