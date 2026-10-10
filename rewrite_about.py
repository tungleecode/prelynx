import re

content = """import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full pt-10 pb-20">
      
      {/* Header */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center gap-6 mt-4 mb-8">
        <h1 className="text-6xl md:text-7xl font-black text-[var(--color-maroon)] leading-tight tracking-tight">
          Câu chuyện <br className="md:hidden" />của tớ
        </h1>
        <p className="text-xl md:text-2xl opacity-70 max-w-2xl font-bold">
          Hành trình xây dựng nền tảng học tập từ những hạt mầm đầu tiên.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
        
        {/* Block 1: The Quote (Span 2) */}
        <div className="md:col-span-2 clay-card rounded-3xl p-10 md:p-14 flex flex-col justify-center gap-6 bg-gradient-to-br from-[#fdfaf6] to-[#f4e6c3] relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 text-[var(--color-clay-pink)] opacity-20 transform group-hover:scale-110 transition-transform duration-700">
            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-7h2v4h-2v-4zm0-6h2v4h-2V7z"/></svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)] leading-[1.3] relative z-10 font-serif">
            "Mọi đoá hoa đều cần thời gian để nở..."
          </h2>
          <p className="text-xl font-bold opacity-80 relative z-10 text-[#5e2e1d]">
            Đừng hoang mang giữa những bài IELTS dài đằng đẵng. Mỗi hạt mầm tri thức cậu gieo hôm nay đều đang âm thầm bắt rễ.
          </p>
        </div>

        {/* Block 2: Founder Card (Span 1) */}
        <div className="md:col-span-1 clay-card rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 hover-squeeze group">
          <div className="w-40 h-40 rounded-full p-2 bg-white border-4 border-[#e8dcc5] shadow-xl overflow-hidden relative">
            <img 
              src="https://i.ibb.co/Sw5bGjfL/ab54bb33397fb8932602acdd601198c0.jpg" 
              alt="Founder Avatar" 
              className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div>
            <h3 className="text-3xl font-black text-[var(--color-maroon)] tracking-tight">Cam Tu</h3>
            <p className="text-base font-bold opacity-60 uppercase tracking-widest mt-1">Founder Prelynx</p>
          </div>
          <a 
            href="https://www.facebook.com/profile.php?id=61594348106139" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#1877F2] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#166fe5] transition-colors shadow-md mt-2"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Kết nối Facebook
          </a>
        </div>

        {/* Block 3: The Vision (Span 3) */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="clay-card rounded-3xl p-10 md:p-14 flex flex-col gap-6 text-lg font-medium leading-relaxed bg-white">
            <h3 className="text-3xl font-black text-[var(--color-maroon)] flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-xl shadow-inner">🌱</span>
              Mảnh vườn tri thức
            </h3>
            <p className="text-justify text-gray-700">
              Prelynx được sinh ra không phải chỉ là một nền tảng học tập khô khan. Tớ xây dựng nơi này với mong muốn tạo ra một <strong className="text-[var(--color-maroon)]">"mảnh vườn"</strong> - nơi cậu có thể kiên nhẫn vun đắp từng từ vựng, từng điểm ngữ pháp mỗi ngày. 
            </p>
            <p className="text-justify text-gray-700">
              Một lộ trình rõ ràng được cá nhân hoá, một giao diện truyền cảm hứng neo-brutalism, và một cộng đồng luôn ở đây để đồng hành cùng cậu bước qua những kỳ thi cam go nhất.
            </p>
          </div>
          
          <div className="clay-card rounded-3xl p-10 md:p-14 flex flex-col gap-6 text-lg font-medium leading-relaxed bg-white">
            <h3 className="text-3xl font-black text-[var(--color-maroon)] flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-xl shadow-inner">🚀</span>
              Học theo cách của cậu
            </h3>
            <p className="text-justify text-gray-700">
              Cậu không cần phải chạy đua với bất kỳ ai cả. Prelynx tin vào <strong className="text-[var(--color-maroon)]">Microlearning</strong> - chia nhỏ kiến thức để hấp thụ tự nhiên nhất.
            </p>
            <p className="text-justify text-gray-700">
              Hãy cứ học theo tốc độ của riêng mình, duy trì sự bền bỉ, và rồi một ngày nào đó, cậu sẽ nhận ra mình đã tiến xa đến nhường nào. Đừng bỏ cuộc, vì mọi nỗ lực của cậu rồi sẽ đơm hoa kết trái.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
"""

with open("src/app/about/page.tsx", "w") as f:
    f.write(content)
