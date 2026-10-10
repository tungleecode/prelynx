"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Turnstile } from '@marsidev/react-turnstile';

export default function GlobalNavbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isCaptchaPassed, setIsCaptchaPassed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOpenLogin = () => setIsLoginOpen(true);
    window.addEventListener('open-login', handleOpenLogin);
    return () => window.removeEventListener('open-login', handleOpenLogin);
  }, []);

  useEffect(() => {
    if (isLoginOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsBookOpen(true), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
      setIsBookOpen(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginOpen]);

  if (!mounted) return null;

  return (
    <>
      <div className="w-full flex justify-center py-3 px-4 md:px-8 sticky top-0 z-[100] bg-transparent transition-all pointer-events-none">
        <nav className="w-full flex justify-between items-center relative z-50 pointer-events-auto">
          <Link href="/" className="flex items-center gap-3 cursor-pointer hover-wobble">
            <img src="/logo.png" alt="Prelynx Logo" className="w-14 h-14 object-contain" />
            <h1 className="text-3xl font-black tracking-tight text-[var(--color-maroon)] hidden sm:block">Prelynx</h1>
          </Link>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center py-2">
            <div className="hidden md:flex items-center gap-4 md:gap-6">
              <Link href="/" className="font-bold hover:text-[var(--color-maroon)] transition-colors hidden lg:block">Trang chủ</Link>
              
              {!session && (
                <>
                  <a href="#features" className="font-bold hover:text-[var(--color-maroon)] transition-colors hidden lg:block">Tính năng</a>
                  <a href="#paths" className="font-bold hover:text-[var(--color-maroon)] transition-colors hidden lg:block">Lộ trình</a>
                  <a href="#testimonials" className="font-bold hover:text-[var(--color-maroon)] transition-colors hidden lg:block">Học viên</a>
                  <a href="#plans" className="font-bold hover:text-[var(--color-maroon)] transition-colors hidden md:block">Bảng giá</a>
                </>
              )}
              
              {session && (
                <>
                  <Link href="/dashboard" className="font-black text-[var(--color-maroon)] bg-orange-100 px-4 py-1.5 rounded-md text-sm whitespace-nowrap flex items-center gap-1 hover-squeeze">
                     <span>Hôm nay</span>
                  </Link>
                  
                  <Link href="/study?cat=ielts" className="font-bold hover:text-[var(--color-maroon)] transition-colors whitespace-nowrap">IELTS</Link>
                  <Link href="/sat" className="font-bold hover:text-[var(--color-maroon)] transition-colors whitespace-nowrap">SAT</Link>
                  <Link href="/practice" className="font-bold text-[#c1a063] hover:text-orange-600 transition-colors whitespace-nowrap flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    Thực hành
                  </Link>
                  <Link href="/vocabulary" className="font-bold hover:text-[var(--color-maroon)] transition-colors whitespace-nowrap">Từ vựng</Link>
                  <Link href="/quest" className="font-bold hover:text-[var(--color-maroon)] transition-colors whitespace-nowrap flex items-center gap-1">
                    <span>✨</span> Quest
                  </Link>
                  <Link href="/leaderboard" className="font-bold text-orange-600 hover:text-[var(--color-maroon)] transition-colors whitespace-nowrap flex items-center gap-1">
                    <span>🏆</span> Bảng Xếp Hạng
                  </Link>
                  <Link href="/study" className="font-bold hover:text-[var(--color-maroon)] transition-colors whitespace-nowrap">Thư viện</Link>
                </>
              )}
              
              <Link href="/about" className="font-bold hover:text-[var(--color-maroon)] transition-colors whitespace-nowrap">Về tớ</Link>
            </div>
            
            {session ? (
              <div className="flex items-center gap-4 ml-2 pl-4 border-l-2 border-gray-200">
                <div className="hidden md:flex flex-col items-end">
                  <span className="font-black text-[var(--color-maroon)] leading-tight text-sm">
                    {session.user?.name || session.user?.email?.split('@')[0]}
                  </span>
                  <Link href="/profile" className="text-xs font-bold text-gray-400 hover:text-[var(--color-maroon)]">Cá nhân</Link>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="clay-btn px-4 py-2 rounded-sm text-sm"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="clay-btn px-6 py-2 rounded-sm text-sm anim-pulse-soft"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </nav>
      </div>

      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent overflow-hidden">
          
          <style>{`
            @keyframes float-widget-1 {
              0% { transform: translate(0, 0) rotate(-2deg); }
              50% { transform: translate(15px, -30px) rotate(3deg); }
              100% { transform: translate(0, 0) rotate(-2deg); }
            }
            @keyframes float-widget-2 {
              0% { transform: translate(0, 0) rotate(5deg) scale(0.9); }
              50% { transform: translate(-20px, 20px) rotate(-5deg) scale(1.05); }
              100% { transform: translate(0, 0) rotate(5deg) scale(0.9); }
            }
            @keyframes float-widget-3 {
              0% { transform: translate(0, 0) scale(1.1); }
              50% { transform: translate(25px, 25px) scale(0.95); }
              100% { transform: translate(0, 0) scale(1.1); }
            }
            @keyframes progress-fill {
              0% { width: 0%; }
              50% { width: 85%; }
              100% { width: 0%; }
            }
            @keyframes spin-slow {
              100% { transform: rotate(360deg); }
            }
            .modal-enter {
              animation: slideUpFade 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
            }
            @keyframes slideUpFade {
              0% { opacity: 0; transform: translateY(40px) scale(0.9); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Nút đóng */}
          <button 
            onClick={() => setIsLoginOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white text-xl font-bold z-[110] hover:scale-110 transition-transform"
          >
            ✕
          </button>

          {/* BACKGROUND WIDGETS */}
          <div className="absolute inset-0 pointer-events-none z-0 bg-black/20"></div>

          {/* MAIN LOGIN CARD: 3D BOOK */}
          <div className="relative z-[100] w-full max-w-sm h-[500px] [perspective:2000px] flex items-center justify-center modal-enter">
            <div className={`w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] ${isBookOpen ? 'translate-x-[15%] md:translate-x-[25%]' : ''}`}>
              
              {/* Cover Page */}
              <div 
                className={`absolute inset-0 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] shadow-2xl z-20 rounded-r-2xl border-r-4 border-b-4 border-[#3d1b11] bg-[#5e2e1d] cursor-pointer ${isBookOpen ? '[transform:rotateY(-180deg)]' : ''}`}
                onClick={() => setIsBookOpen(!isBookOpen)}
              >
                {/* Front Cover */}
                <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center p-8 text-center rounded-r-2xl overflow-hidden bg-gradient-to-br from-[#6b3522] to-[#4a2214]">
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/20 border-r border-white/10"></div>
                  <img src="/logo.png" alt="Prelynx" className="w-24 h-24 mb-6 drop-shadow-xl z-10" style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }} />
                  <h1 className="text-4xl font-black text-[#f4e6c3] tracking-widest uppercase mb-4 z-10 drop-shadow-md font-serif">Prelynx</h1>
                  <p className="text-[#d8bfa5] font-bold tracking-widest text-sm z-10 uppercase border-y border-[#d8bfa5]/40 py-2 px-6">Bí Kíp Tiếng Anh</p>
                  <div className="absolute bottom-8 text-xs font-black text-[#d8bfa5]/60 tracking-widest uppercase z-10">
                    {isBookOpen ? 'Đang mở sách...' : 'Nhấn để mở'}
                  </div>
                </div>

                {/* Back of Cover (Left inside page) */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-[#f4e6c3] rounded-l-2xl border-l-4 border-b-4 border-[#d8bfa5] p-6 shadow-inner overflow-hidden" style={{ transform: 'rotateY(180deg)' }}>
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent z-0"></div>
                  
                  {showTerms ? (
                    <div className="relative z-10 h-full border border-amber-900/20 p-4 bg-[#fdfaf6]/90 flex flex-col rounded-md shadow-inner">
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-amber-900/20">
                        <h2 className="text-base font-black text-[#5e2e1d] font-serif">Điều khoản & Bảo mật</h2>
                        <button onClick={(e) => { e.stopPropagation(); setShowTerms(false); }} className="text-[#5e2e1d] text-xs font-bold px-3 py-1 bg-amber-900/10 rounded-sm hover:bg-amber-900/20 transition-colors">Đóng</button>
                      </div>
                      <div className="flex-1 overflow-y-auto pr-2 text-xs text-[#5e2e1d]/80 font-medium space-y-3 pb-2 custom-scrollbar text-justify">
                        <p><strong>1. Thu thập dữ liệu:</strong> Prelynx chỉ thu thập tên và avatar công khai của bạn thông qua Google/Discord để tạo hồ sơ học tập.</p>
                        <p><strong>2. Quyền riêng tư:</strong> Mọi thông tin của bạn được lưu trữ mã hóa và không bao giờ được chia sẻ cho bên thứ ba vì bất kỳ mục đích thương mại nào.</p>
                        <p><strong>3. Trách nhiệm người dùng:</strong> Bằng việc tham gia học viện, bạn cam kết giữ gìn môi trường học tập văn minh, không spam hay gian lận trong các bài kiểm tra đánh giá năng lực.</p>
                        <p><strong>4. Thay đổi điều khoản:</strong> Prelynx có quyền cập nhật các điều khoản này theo thời gian để phù hợp với quá trình phát triển.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 h-full border border-amber-900/20 p-6 flex flex-col items-center justify-center text-center opacity-80" style={{ backgroundImage: 'linear-gradient(transparent 95%, #a78b6d 100%)', backgroundSize: '100% 28px' }}>
                      <h2 className="text-2xl font-black text-[#5e2e1d] mb-4 font-serif">Lời mở đầu</h2>
                      <p className="text-sm text-[#5e2e1d] leading-relaxed font-medium italic">
                        "Hành trình vạn dặm bắt đầu từ một bước chân. <br/><br/> Chào mừng bạn đến với học viện Prelynx. Nơi ngôn ngữ không còn là rào cản, mà là chiếc chìa khoá mở ra thế giới."
                      </p>
                      <div className="mt-12 w-16 h-1 bg-[#5e2e1d]/20 mx-auto rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Page (Login Form) */}
              <div className="absolute inset-0 bg-[#fdfaf6] rounded-r-2xl border-r-4 border-b-4 border-[#e8dcc5] shadow-xl z-10 p-8 flex flex-col justify-center">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent"></div>
                
                <div className="relative z-10 pl-4 flex flex-col justify-center h-full">
                  <h2 className="text-3xl font-black text-[#5e2e1d] mb-2 text-center">Đăng Nhập</h2>
                  <p className="text-sm font-bold text-[#a78b6d] mb-10 text-center uppercase tracking-widest">Prelynx Academy</p>
                  
                  <div className="flex flex-col gap-3 w-full">
                    
                    {/* Checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer bg-[#f4e6c3]/40 p-3 rounded-lg border border-[#e8dcc5] hover:border-[#a78b6d] transition-colors relative z-[110]">
                      <input 
                        type="checkbox" 
                        checked={isTermsChecked} 
                        onChange={() => setIsTermsChecked(!isTermsChecked)} 
                        className="mt-0.5 w-4 h-4 rounded text-[#5e2e1d] focus:ring-[#5e2e1d] cursor-pointer shrink-0" 
                      />
                      <span className="text-[11px] font-bold text-[#5e2e1d]/80 leading-snug">
                        Tôi đồng ý với <button type="button" onClick={(e) => { e.stopPropagation(); setShowTerms(true); setIsBookOpen(true); }} className="text-[#5e2e1d] underline font-black hover:text-[var(--color-maroon)]">Điều khoản & Bảo mật</button> của Prelynx.
                      </span>
                    </label>

                    {/* Turnstile Captcha */}
                    <div className="relative z-[110] flex justify-center w-full min-h-[65px] bg-[#f4e6c3]/20 rounded-lg overflow-hidden">
                      <Turnstile 
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                        onSuccess={() => setIsCaptchaPassed(true)} 
                        onError={() => setIsCaptchaPassed(false)}
                        onExpire={() => setIsCaptchaPassed(false)}
                      />
                    </div>

                    {/* Google Button */}
                    <button 
                      onClick={() => isTermsChecked && isCaptchaPassed && signIn("google", { callbackUrl: "/study" })} 
                      type="button" 
                      disabled={!isTermsChecked || !isCaptchaPassed}
                      className={`w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 p-4 rounded-xl font-bold text-gray-700 shadow-sm transition-all relative z-[110] ${isTermsChecked && isCaptchaPassed ? 'hover:bg-gray-50 hover:scale-105 cursor-pointer' : 'opacity-40 grayscale cursor-not-allowed'}`}
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Tiếp tục với Google
                    </button>

                    {/* Discord Button */}
                    <button 
                      onClick={() => isTermsChecked && isCaptchaPassed && signIn("discord", { callbackUrl: "/study" })} 
                      type="button" 
                      disabled={!isTermsChecked || !isCaptchaPassed}
                      className={`w-full flex items-center justify-center gap-3 bg-[#5865F2] border-2 border-[#4752C4] p-4 rounded-xl font-bold text-white shadow-sm transition-all relative z-[110] ${isTermsChecked && isCaptchaPassed ? 'hover:bg-[#4752C4] hover:scale-105 cursor-pointer' : 'opacity-40 grayscale cursor-not-allowed'}`}
                    >
                      <svg className="w-6 h-6 fill-white" viewBox="0 0 127.14 96.36">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.18,65.69,84.69,65.69Z"/>
                      </svg>
                      Tiếp tục với Discord
                    </button>
                  </div>

                  <div className="mt-4 text-center text-[10px] font-bold text-[#a78b6d] opacity-80 px-2 leading-relaxed">
                    <p>Vì lý do bảo mật, hệ thống chỉ hỗ trợ tài khoản mạng xã hội.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
