import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full">
      {/* Header / Nav */}
      

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col items-center text-center gap-12 mt-4">
        
        <h2 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)]">Câu chuyện của tớ</h2>

        {/* Facebook Card */}
        <a 
          href="https://www.facebook.com/profile.php?id=61594348106139" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full max-w-md clay-card rounded-2xl p-6 flex flex-col items-center gap-4 hover-tilt cursor-pointer border-2 border-blue-100 transition-colors hover:border-blue-300 relative group"
        >
          <div className="absolute top-4 right-4 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </div>
          
          <div className="w-32 h-32 rounded-full p-2 clay-btn overflow-hidden">
            <img 
              src="https://i.ibb.co/Sw5bGjfL/ab54bb33397fb8932602acdd601198c0.jpg" 
              alt="Avatar" 
              className="w-full h-full object-cover rounded-full shadow-inner"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-gray-800">Tùng Lê - Founder Prelynx</h3>
            <p className="text-blue-500 font-bold mt-1 group-hover:underline">Theo dõi trên Facebook</p>
          </div>
        </a>

        {/* Inspirational Text */}
        <div className="text-left w-full max-w-5xl clay-card bg-white/40 p-8 md:p-12 rounded-2xl shadow-inner font-medium text-lg leading-relaxed text-gray-800 border-l-4 border-[var(--color-clay-pink)]">
          <p className="mb-6 font-bold italic text-xl text-[var(--color-maroon)]">
            "Mọi đoá hoa đều cần thời gian để nở..."
          </p>
          <p className="mb-4 text-justify">
            Đúng vậy, trên con đường chinh phục ngôn ngữ mới, không có thành công nào đến sau một đêm. Có những ngày cậu sẽ cảm thấy mệt mỏi khi đứng trước hàng tá quy tắc ngữ pháp phức tạp, hay cảm thấy hoang mang giữa những bài IELTS Reading dài đằng đẵng. Nhưng hãy nhớ rằng, mỗi hạt mầm tri thức cậu gieo xuống hôm nay, dù nhỏ bé, đều đang âm thầm bắt rễ.
          </p>
          <p className="mb-4 text-justify">
            Prelynx được sinh ra không phải chỉ là một nền tảng học tập khô khan. Tớ xây dựng nơi này với mong muốn tạo ra một "mảnh vườn" - nơi cậu có thể kiên nhẫn vun đắp từng từ vựng, từng điểm ngữ pháp mỗi ngày. Một lộ trình rõ ràng, một giao diện truyền cảm hứng, và một cộng đồng luôn ở đây để đồng hành cùng cậu.
          </p>
          <p className="text-justify">
            Cậu không cần phải chạy đua với bất kỳ ai cả. Hãy cứ học theo tốc độ của riêng mình, duy trì sự bền bỉ, và rồi một ngày nào đó, cậu sẽ nhận ra mình đã tiến xa đến nhường nào. Đừng bỏ cuộc, vì mọi nỗ lực của cậu rồi sẽ đơm hoa kết trái.
          </p>
        </div>

      </div>
    </div>
  );
}
