"use client";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import AnalyticsDashboard from "./AnalyticsDashboard";

/**
 * LandingSections – nội dung "hạng nặng" cho landing page Prelynx.
 * Chỉ dùng lại các class sẵn có: clay-card, clay-btn, hover-*, anim-*,
 * và biến màu --color-maroon / --color-clay-pink. Không thêm CSS mới.
 * Click vào thẻ sẽ mở lại Side Panel gốc thông qua prop onOpen (= setActiveGuide).
 */

type Guide = { title: string; svg?: ReactNode; description?: string; isAudio?: boolean };
type Props = { onOpen: (g: Guide) => void };

/* ---------- Icon helper (cùng phong cách stroke 2 như bản gốc) ---------- */
const P = {
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13ZM4 19.5v-13M20 20H6.5a2.5 2.5 0 0 1-2.5-2.5",
  bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  bulb: "M9 21h6M10 17v4M14 17v4M12 2C7.58 2 4 5.58 4 10c0 2.38 1.19 4.47 3 5.74V17c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1.26c1.81-1.27 3-3.36 3-5.74 0-4.42-3.58-8-8-8z",
  flame: "M12 2c-3.33 4-5 7.67-5 11 0 2.76 2.24 5 5 5s5-2.24 5-5c0-3.33-1.67-7-5-11z",
  trophy: "M8 21h8M12 17v4M7 4h10M5 4h14v4a2 2 0 01-2 2H7a2 2 0 01-2-2V4zM7 10c0 4 2.5 7 5 7s5-3 5-7",
  check: "M5 13l4 4L19 7",
  user: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  pencil: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  phones: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z",
  mic: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
  chart: "M18 20V10M12 20V4M6 20v-6",
  sigma: "M18 7V4H6l6 8-6 8h12v-3",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  chevron: "M6 9l6 6 6-6",
};

const Icon = ({ d, className = "w-6 h-6 text-blue-500" }: { d: string; className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const SectionTitle = ({ title, sub }: { title: string; sub: string }) => (
  <div className="text-center flex flex-col gap-3 items-center">
    <h2 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)] leading-tight">{title}</h2>
    <p className="text-lg opacity-70 max-w-2xl font-medium">{sub}</p>
  </div>
);

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="clay-card px-3 py-1 rounded-sm text-xs font-bold border-none">{children}</span>
);

/* ---------- DỮ LIỆU ---------- */

const stats = [
  { value: "2,878", label: "Bài học & bài tập", note: "Cập nhật mỗi tuần", d: P.book, color: "text-blue-500" },
  { value: "52,000+", label: "Học viên đang học", note: "Từ 63 tỉnh thành", d: P.user, color: "text-green-500" },
  { value: "320+", label: "Đề thi thử có chấm điểm", note: "IELTS & SAT", d: P.pencil, color: "text-red-500" },
  { value: "+1.2 band", label: "Tăng trung bình", note: "Sau 8 tuần học đều", d: P.chart, color: "text-orange-500" },
];

const categories = [
  { title: "IELTS Reading", count: "640 bài", level: "Band 4.0 – 8.5", d: P.book, color: "text-blue-500" },
  { title: "IELTS Listening", count: "420 bài", level: "Band 4.0 – 8.5", d: P.phones, color: "text-orange-500" },
  { title: "IELTS Writing", count: "260 đề", level: "Task 1 & Task 2", d: P.pencil, color: "text-purple-500" },
  { title: "IELTS Speaking", count: "310 chủ đề", level: "Part 1 – 2 – 3", d: P.mic, color: "text-pink-500" },
  { title: "SAT Math", count: "380 bài", level: "Algebra · Geometry", d: P.sigma, color: "text-red-500" },
  { title: "SAT Reading & Writing", count: "290 bài", level: "Digital SAT", d: P.layers, color: "text-teal-500" },
  { title: "Ngữ pháp cơ bản", count: "180 bài", level: "Mất gốc → A2", d: P.target, color: "text-green-500" },
  { title: "Từ vựng B2 – C1", count: "5,000 từ", level: "Theo chủ đề", d: P.bolt, color: "text-yellow-500" },
  { title: "Tiếng Anh giao tiếp", count: "240 tình huống", level: "Đời sống · Công sở", d: P.chat, color: "text-pink-500" },
  { title: "Phát âm chuẩn", count: "120 bài", level: "IPA · Nối âm · Trọng âm", d: P.bulb, color: "text-amber-500" },
];

const steps = [
  { n: "1", title: "Kiểm tra đầu vào", desc: "Làm bài test 20 phút để biết chính xác điểm mạnh, điểm yếu của bạn." },
  { n: "2", title: "Nhận lộ trình riêng", desc: "Hệ thống sắp xếp bài học theo mục tiêu điểm và thời gian bạn có mỗi ngày." },
  { n: "3", title: "Học vi mô mỗi ngày", desc: "Mỗi bài chỉ 10–15 phút, có giải thích tiếng Việt và ví dụ thực tế." },
  { n: "4", title: "Thi thử & điều chỉnh", desc: "Mock test định kỳ, lộ trình tự động thay đổi theo kết quả của bạn." },
];

const features = [
  {
    title: "Luyện nghe VOA thông minh",
    desc: "Đọc xong bài nào, hệ thống tạo ngay bài nghe từ nội dung đó, có transcript và highlight từ khó.",
    detail:
      "Bài nghe được tạo từ chính bài đọc bạn vừa học, kèm transcript song song, tốc độ 0.75x – 1.5x và chế độ nghe-chép chính tả. Từ mới được tự động đưa vào bộ thẻ ôn tập của bạn.",
    d: P.phones, color: "text-orange-500",
  },
  {
    title: "Chấm Writing bằng AI",
    desc: "Nộp bài, nhận điểm 4 tiêu chí IELTS và gợi ý sửa từng câu trong vài giây.",
    detail:
      "Bài viết được chấm theo 4 tiêu chí: Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy. Mỗi lỗi đều có giải thích và câu viết lại tốt hơn để bạn học theo.",
    d: P.pencil, color: "text-purple-500",
  },
  {
    title: "Ôn từ vựng theo khoảng cách",
    desc: "Flashcard tự nhắc đúng lúc bạn sắp quên, nhớ lâu mà học ít.",
    detail:
      "Thuật toán lặp lại ngắt quãng (Spaced Repetition) sắp xếp thời điểm ôn từng từ dựa trên độ khó với riêng bạn. Mỗi ngày chỉ cần 10 phút để giữ vững hàng trăm từ.",
    d: P.layers, color: "text-blue-500",
  },
  {
    title: "Luyện nói & phát âm",
    desc: "Ghi âm, so với giọng chuẩn và xem ngay chỗ nào cần chỉnh.",
    detail:
      "Đọc theo câu mẫu, hệ thống chỉ ra âm đọc sai, trọng âm lệch và tốc độ nói. Có sẵn bộ đề Speaking Part 1–2–3 cập nhật theo quý.",
    d: P.mic, color: "text-pink-500",
  },
  {
    title: "Thi thử như thật",
    desc: "Giao diện, bấm giờ và cách chấm giống phòng thi thật.",
    detail:
      "Đề thi thử IELTS và Digital SAT có đồng hồ đếm ngược, đánh dấu câu hỏi để quay lại và báo cáo chi tiết theo từng dạng bài sau khi nộp.",
    d: P.clock, color: "text-red-500",
  },
  {
    title: "Thống kê & chuỗi học",
    desc: "Biểu đồ tiến độ, mục tiêu ngày và chuỗi học giúp bạn không bỏ cuộc.",
    detail:
      "Theo dõi số phút học, số từ đã thuộc và điểm từng kỹ năng theo tuần. Giữ chuỗi học liên tục để mở khoá huy hiệu và phần thưởng trong ứng dụng.",
    d: P.flame, color: "text-yellow-500",
  },
];

const paths = [
  {
    name: "Lấy lại gốc",
    goal: "Mục tiêu IELTS 5.0 – 5.5",
    time: "12 tuần",
    lessons: "420 bài",
    points: ["Ngữ pháp nền tảng từ A1", "1,500 từ vựng thiết yếu", "Nghe – đọc dạng bài cơ bản", "Viết câu & đoạn ngắn"],
  },
  {
    name: "Bứt phá giữa chặng",
    goal: "Mục tiêu IELTS 6.0 – 6.5",
    time: "10 tuần",
    lessons: "560 bài",
    points: ["Chiến thuật 14 dạng bài Reading", "Writing Task 1 & 2 có mẫu", "Từ vựng học thuật B2", "Speaking theo band descriptor"],
  },
  {
    name: "Chinh phục điểm cao",
    goal: "Mục tiêu IELTS 7.0 – 8.0+",
    time: "8 tuần",
    lessons: "480 bài",
    points: ["Tư duy bài khó & bẫy đề", "Từ vựng C1 – paraphrase", "Chấm Writing chuyên sâu", "Mock test bấm giờ liên tục"],
  },
  {
    name: "SAT 1400+",
    goal: "Digital SAT Math + R&W",
    time: "14 tuần",
    lessons: "670 bài",
    points: ["Toàn bộ chủ đề Math của SAT", "Đọc hiểu theo đoạn ngắn", "Chiến thuật dùng Desmos", "Đề thi thử chuẩn adaptive"],
  },
];

const resources = [
  { title: "Sổ tay 12 thì tiếng Anh", desc: "Tóm tắt công thức, dấu hiệu nhận biết và lỗi hay gặp, kèm bài tập ngắn sau mỗi thì.", d: P.book, color: "text-green-500" },
  { title: "Bộ 600 từ Academic Word List", desc: "Nhóm theo chủ đề, có phiên âm, ví dụ và cách dùng trong bài Writing.", d: P.layers, color: "text-blue-500" },
  { title: "Cheat-sheet Reading 14 dạng bài", desc: "Mỗi dạng bài một trang: cách nhận diện, cách làm, bẫy thường gặp.", d: P.target, color: "text-red-500" },
  { title: "Mẫu câu Speaking theo band", desc: "Bộ cụm từ nối ý, thể hiện quan điểm và kéo dài câu trả lời tự nhiên.", d: P.mic, color: "text-pink-500" },
  { title: "Công thức SAT Math cần nhớ", desc: "Đại số, hình học, xác suất gói gọn thành bảng tra nhanh trước giờ thi.", d: P.sigma, color: "text-purple-500" },
  { title: "Lịch học 30 ngày mẫu", desc: "Kế hoạch từng ngày cho người đi làm và học sinh, chỉnh được theo mục tiêu.", d: P.clock, color: "text-orange-500" },
];

const testimonials = [
  { name: "Minh Anh", role: "Sinh viên năm 2 · Hà Nội", from: "5.5", to: "7.0", quote: "Mình thích nhất là bài học ngắn, tranh thủ giờ ra chơi cũng học được. Phần luyện nghe VOA giúp tai mình quen tốc độ thật." },
  { name: "Quốc Bảo", role: "Học sinh lớp 12 · TP.HCM", from: "1180", to: "1420", quote: "Mục SAT Math giải thích rất dễ hiểu, từng bước một. Đề thi thử giống thi thật nên vào phòng thi mình không bị run." },
  { name: "Thu Hà", role: "Nhân viên văn phòng · Đà Nẵng", from: "6.0", to: "7.5", quote: "Đi làm cả ngày nên mình chỉ có 20 phút mỗi tối. Lộ trình tự chia nhỏ nên mình theo được liên tục suốt 2 tháng." },
];

const plans = [
  {
    name: "Cơ bản",
    price: "499.000đ",
    per: "1 tháng",
    desc: "Khởi động nhẹ nhàng để làm quen với nhịp học.",
    perks: ["Truy cập toàn bộ 2,800+ bài học", "Lộ trình tự động", "Chấm điểm AI (10 bài/tháng)"],
    cta: "Chọn gói 1 tháng",
    hot: false,
  },
  {
    name: "Chuyên cần",
    price: "1.299.000đ",
    per: "3 tháng",
    desc: "Tiết kiệm hơn, phù hợp để ôn thi kỳ thi gần.",
    perks: ["Mọi quyền lợi gói Cơ bản", "Chấm điểm AI (30 bài/tháng)", "Thi thử không giới hạn", "Tải tài liệu PDF độc quyền"],
    cta: "Chọn gói 3 tháng",
    hot: false,
  },
  {
    name: "Bứt phá",
    price: "2.499.000đ",
    per: "6 tháng",
    desc: "Lựa chọn tốt nhất để tăng 1-1.5 band điểm IELTS.",
    perks: ["Chấm Writing/Speaking AI không giới hạn", "Báo cáo năng lực chi tiết", "Tham gia định kỳ workshop online", "Ưu tiên hỗ trợ 24/7"],
    cta: "Bắt đầu bứt phá",
    hot: true,
  },
  {
    name: "Chuyên sâu",
    price: "3.999.000đ",
    per: "1 năm",
    desc: "Đồng hành xuyên suốt từ khi mất gốc đến khi thi.",
    perks: ["Toàn bộ quyền lợi gói Bứt phá", "Giữ lại lịch sử học tập trọn đời", "Truy cập các khóa học mới miễn phí", "Đánh giá lộ trình hàng tháng"],
    cta: "Chọn gói 1 năm",
    hot: false,
  },
  {
    name: "Về đích VIP",
    price: "5.999.000đ",
    per: "trọn gói",
    desc: "Không giới hạn thời gian. Dành cho người muốn sự chắc chắn tuyệt đối.",
    perks: ["Mọi tính năng hệ thống mãi mãi", "1-kèm-1 định hướng với giáo viên x3 lần", "Cam kết đầu ra (hoàn tiền nếu không đạt)", "Quà tặng giáo trình bản cứng"],
    cta: "Trở thành VIP",
    hot: false,
  },
];

const faqs = [
  { q: "Tôi mất gốc hoàn toàn thì có học được không?", a: "Được. Bài test đầu vào sẽ xếp bạn vào lộ trình Lấy lại gốc, bắt đầu từ ngữ pháp và từ vựng cơ bản nhất, mỗi bài chỉ 10–15 phút." },
  { q: "Mỗi ngày tôi cần học bao lâu?", a: "Bạn tự đặt mục tiêu ngày (ví dụ 30 phút). Hệ thống chia nhỏ bài học để vừa khít thời gian đó và nhắc bạn đúng lúc." },
  { q: "Bài thi thử có giống thi thật không?", a: "Có. Đề có đồng hồ đếm ngược, đánh dấu câu hỏi, và cách tính điểm theo thang IELTS hoặc Digital SAT." },
  { q: "AI chấm Writing có đáng tin không?", a: "AI chấm theo 4 tiêu chí chính thức của IELTS và giải thích từng lỗi. Bạn nên dùng nó để luyện hằng ngày và so sánh với giáo viên khi cần." },
  { q: "Tôi có thể học trên điện thoại không?", a: "Có. Giao diện tự co giãn cho điện thoại, máy tính bảng và máy tính, tiến độ đồng bộ giữa các thiết bị." },
  { q: "Tôi có thể huỷ gói bất cứ lúc nào không?", a: "Có. Bạn huỷ bất cứ lúc nào, vẫn dùng được đến hết kỳ đã thanh toán và giữ nguyên toàn bộ dữ liệu học." },
];

/* ---------- COMPONENT ---------- */

export default function Home() {
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


  const marqueeItems = [
    { title: "IELTS Reading", svg: <Icon d={P.book} className="w-10 h-10 text-blue-500" /> },
    { title: "SAT Math", svg: <Icon d={P.sigma} className="w-10 h-10 text-red-500" /> },
    { title: "Ngữ pháp cơ bản", svg: <Icon d={P.target} className="w-10 h-10 text-green-500" /> },
    { title: "Từ vựng B2", svg: <Icon d={P.bolt} className="w-10 h-10 text-yellow-500" /> },
    { title: "Giao tiếp", svg: <Icon d={P.chat} className="w-10 h-10 text-pink-500" /> },
    { title: "Phát âm", svg: <Icon d={P.mic} className="w-10 h-10 text-purple-500" /> },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-4 w-full">
      <div className="w-full flex flex-col items-center gap-16 mt-2">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 0. Hero */}
      <section className="w-full max-w-5xl flex flex-col justify-center items-center text-center gap-8 pt-4 pb-12 mt-0 relative">
        <h1 className="text-6xl md:text-7xl font-black leading-[1.1] text-[var(--color-maroon)]">
          Làm chủ tiếng Anh <br/> với phong cách của bạn
        </h1>
        <p className="text-xl md:text-2xl opacity-80 max-w-3xl font-bold">
          Hơn 2,800 bài học IELTS, SAT và tiếng Anh giao tiếp được thiết kế trực quan, sinh động.
        </p>
        <button 
          onClick={() => window.dispatchEvent(new Event("open-login"))}
          className="clay-btn px-12 py-5 rounded-2xl text-2xl font-black mt-4 hover-bounce z-10"
        >
          Bắt đầu học ngay
        </button>
      </section>

      {/* 0.5 Analytics Dashboard */}
      <section className="w-full max-w-5xl relative z-10 mb-10 -mt-8">
        <div className="w-full anim-float">
          <AnalyticsDashboard />
        </div>
      </section>

      {/* 0.5 Marquee */}
      <section className="w-full overflow-hidden py-4 -my-8">
        <div className="flex w-max animate-marquee gap-6 pr-6">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} onClick={() => setActiveGuide({ title: item.title, svg: item.svg })} className="w-64 h-64 shrink-0 clay-card rounded-xl p-6 flex flex-col justify-center items-center text-center gap-6 hover-tilt cursor-pointer">
              <div className="w-20 h-20 rounded-md clay-btn flex items-center justify-center">
                {item.svg}
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2 text-[var(--color-maroon)]">{item.title}</h3>
                <p className="text-sm font-bold opacity-60">Khám phá ngay</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1. Số liệu nổi bật */}
      <section className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="p-8 flex flex-col items-center text-center gap-3 anim-float">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-2">
              <Icon d={s.d} className={`w-8 h-8 ${s.color}`} />
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)]">{s.value}</h3>
            <p className="font-black text-lg">{s.label}</p>
            <p className="text-base font-bold opacity-60">{s.note}</p>
          </div>
        ))}
      </section>

      {/* 2. Danh mục khoá học */}
      <section className="w-full max-w-7xl flex flex-col gap-10">
        <SectionTitle
          title="10 danh mục, một nơi học hết"
          sub="Từ IELTS bốn kỹ năng, SAT, đến ngữ pháp, từ vựng và giao tiếp. Chọn một thẻ để xem lộ trình của danh mục đó."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((c) => (
            <div
              key={c.title}
              onClick={() => setActiveGuide({ title: c.title, svg: <Icon d={c.d} className={`w-10 h-10 ${c.color}`} /> })}
              className="clay-card rounded-lg p-6 flex flex-col items-center text-center gap-4 hover-tilt cursor-pointer"
            >
              <div className="w-14 h-14 rounded-md clay-btn flex items-center justify-center">
                <Icon d={c.d} className={`w-7 h-7 ${c.color}`} />
              </div>
              <h3 className="font-black text-lg leading-snug">{c.title}</h3>
              <p className="text-sm font-bold opacity-70">{c.count}</p>
              <Tag>{c.level}</Tag>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Cách hoạt động */}
      <section className="w-full max-w-7xl flex flex-col gap-10">
        <SectionTitle title="Bắt đầu học trong 4 bước" sub="Không cần tự lên kế hoạch. Bạn chỉ cần mở app và làm bài của hôm nay." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-maroon)] text-white flex items-center justify-center font-black text-3xl shadow-lg">
                {s.n}
              </div>
              <h3 className="font-black text-2xl">{s.title}</h3>
              <p className="opacity-70 leading-relaxed font-bold text-lg">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Tính năng nổi bật */}
      <section className="w-full max-w-7xl flex flex-col gap-10">
        <SectionTitle title="Học thông minh hơn, không phải học nhiều hơn" sub="Sáu công cụ giúp mỗi phút học của bạn đều có kết quả." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f) => (
            <div
              key={f.title}
              onClick={() => setActiveGuide({ title: f.title, description: f.detail, svg: <Icon d={f.d} className={`w-10 h-10 ${f.color}`} /> })}
              className="flex flex-col gap-5 cursor-pointer group p-4 rounded-2xl hover:bg-black/5 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                <Icon d={f.d} className={`w-8 h-8 ${f.color}`} />
              </div>
              <h3 className="font-black text-2xl leading-snug group-hover:text-[var(--color-maroon)] transition-colors">{f.title}</h3>
              <p className="opacity-70 leading-relaxed font-bold text-lg">{f.desc}</p>
              <p className="font-black text-[var(--color-maroon)] mt-auto group-hover:underline">Xem chi tiết →</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Lộ trình theo mục tiêu */}
      <section id="paths" className="w-full max-w-7xl flex flex-col gap-10 scroll-m-24">
        <SectionTitle title="Chọn lộ trình theo mục tiêu điểm" sub="Mỗi lộ trình có số tuần, số bài và nội dung rõ ràng để bạn biết mình sẽ học gì." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((p) => (
            <div key={p.name} className="clay-card rounded-lg p-8 flex flex-col gap-5 hover-squeeze">
              <div>
                <h3 className="font-black text-2xl text-[var(--color-maroon)]">{p.name}</h3>
                <p className="font-bold opacity-70 mt-1">{p.goal}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Tag>{p.time}</Tag>
                <Tag>{p.lessons}</Tag>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 font-medium">
                    <span className="mt-1 shrink-0"><Icon d={P.check} className="w-5 h-5 text-green-500" /></span>
                    <span className="opacity-80">{pt}</span>
                  </li>
                ))}
              </ul>
              <Link href="/study" className="clay-btn w-full py-3 rounded-md font-black text-center hover-squeeze">
                Học lộ trình này
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Kho tài liệu */}
      <section className="w-full max-w-7xl flex flex-col gap-10">
        <SectionTitle title="Kho tài liệu miễn phí" sub="Tài liệu ngắn gọn, đọc xong dùng được ngay." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((r) => (
            <div
              key={r.title}
              onClick={() => setActiveGuide({ title: r.title, description: r.desc, svg: <Icon d={r.d} className={`w-10 h-10 ${r.color}`} /> })}
              className="flex items-start gap-5 cursor-pointer group p-6 rounded-2xl hover:bg-black/5 transition-colors"
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Icon d={r.d} className={`w-8 h-8 ${r.color}`} />
              </div>
              <div>
                <h3 className="font-black text-xl leading-snug group-hover:text-[var(--color-maroon)] transition-colors">{r.title}</h3>
                <p className="text-base opacity-70 mt-2 font-bold">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Học viên nói gì (thay bằng dữ liệu thật khi có) */}
      <section id="testimonials" className="w-full max-w-7xl flex flex-col gap-10 scroll-m-24">
        <SectionTitle title="Học viên nói gì về Prelynx" sub="Những thay đổi thật sau vài tuần học đều mỗi ngày." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="clay-card rounded-lg p-8 flex flex-col gap-5 hover-jiggle">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full clay-btn flex items-center justify-center font-black text-xl text-[var(--color-maroon)]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-lg">{t.name}</h3>
                  <p className="text-sm opacity-60 font-bold">{t.role}</p>
                </div>
              </div>
              <p className="opacity-80 leading-relaxed font-medium flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 font-black">
                <Tag>{t.from}</Tag>
                <Icon d="M5 12h14M13 6l6 6-6 6" className="w-5 h-5 text-[var(--color-maroon)]" />
                <span className="clay-btn px-4 py-1 rounded-sm text-[var(--color-maroon)]">{t.to}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bảng giá */}
      <section id="plans" className="w-full max-w-7xl flex flex-col gap-10 scroll-m-24">
        <SectionTitle title="Chọn gói phù hợp với bạn" sub="Lộ trình học tập đa dạng, linh hoạt theo mục tiêu và tài chính của bạn." />
        <div className="flex flex-wrap justify-center gap-6 items-stretch *:w-full *:md:w-[calc(50%-0.75rem)] *:lg:w-[calc(33.333%-1rem)]">
          {plans.map((p) => (
            <div key={p.name} className={`clay-card rounded-lg p-8 flex flex-col gap-6 relative ${p.hot ? "anim-glow" : ""}`}>
              {p.hot && (
                <span className="clay-btn absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 rounded-sm text-sm font-black">Được chọn nhiều nhất</span>
              )}
              <div>
                <h3 className="font-black text-2xl text-[var(--color-maroon)]">{p.name}</h3>
                <p className="opacity-70 font-medium mt-1">{p.desc}</p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">{p.price}</span>
                <span className="opacity-60 font-bold pb-1">{p.per}</span>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 font-medium">
                    <span className="mt-1 shrink-0"><Icon d={P.check} className="w-5 h-5 text-green-500" /></span>
                    <span className="opacity-80">{perk}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.dispatchEvent(new Event("open-login"))}
                className="clay-btn w-full py-4 rounded-md font-black hover-bounce"
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Câu hỏi thường gặp */}
      <section className="w-full max-w-4xl flex flex-col gap-10">
        <SectionTitle title="Câu hỏi thường gặp" sub="Chưa thấy câu bạn cần? Hãy nhắn cho tụi mình trong app." />
        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="clay-card rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-black text-lg">{f.q}</span>
                  <span className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                    <Icon d={P.chevron} className="w-6 h-6 text-[var(--color-maroon)]" />
                  </span>
                </button>
                {open && <p className="px-6 pb-6 opacity-80 leading-relaxed font-medium">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. Cam kết */}
      <section className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { t: "Nội dung biên soạn kỹ", d: "Mỗi bài đều được rà soát trước khi đăng, có giải thích tiếng Việt dễ hiểu.", i: P.shield, c: "text-blue-500" },
          { t: "Học ở đâu cũng được", d: "Điện thoại, máy tính bảng hay laptop, tiến độ luôn đồng bộ.", i: P.layers, c: "text-green-500" },
          { t: "Hoàn tiền trong 7 ngày", d: "Không hài lòng với gói trả phí, bạn được hoàn tiền trong 7 ngày đầu.", i: P.trophy, c: "text-yellow-500" },
        ].map((x) => (
          <div key={x.t} className="clay-card rounded-lg p-8 flex items-center gap-6 anim-heartbeat">
            <div className="w-16 h-16 shrink-0 rounded-md clay-btn flex items-center justify-center">
              <Icon d={x.i} className={`w-8 h-8 ${x.c}`} />
            </div>
            <div>
              <h3 className="font-black text-xl">{x.t}</h3>
              <p className="opacity-70 font-medium mt-1">{x.d}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 11. CTA cuối trang */}
      <section className="w-full max-w-7xl clay-card rounded-lg p-12 md:p-16 flex flex-col items-center text-center gap-6 anim-glow">
        <h2 className="text-4xl md:text-5xl font-black leading-tight text-[var(--color-maroon)]">
          Bài học đầu tiên đang chờ bạn
        </h2>
        <p className="text-lg opacity-80 max-w-2xl font-medium">
          Tạo tài khoản miễn phí, làm bài test đầu vào 20 phút và nhận lộ trình riêng ngay hôm nay.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button onClick={() => window.dispatchEvent(new Event("open-login"))} className="clay-btn px-10 py-4 rounded-md text-xl font-black hover-bounce">
            Tạo tài khoản miễn phí
          </button>
          <Link href="/practice" className="clay-btn px-10 py-4 rounded-md text-xl font-black hover-squeeze">
            Làm thử bài test
          </Link>
        </div>
      </section>
    </div>

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
