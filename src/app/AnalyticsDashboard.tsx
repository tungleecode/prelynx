import React from 'react';

export default function AnalyticsDashboard() {
  return (
    <div className="w-full max-w-5xl mx-auto clay-card rounded-[2rem] p-8 md:p-10 relative bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      
      <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-medium {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-fast {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.03); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -40; }
        }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4.2s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3.5s ease-in-out infinite; }
        .animate-dash-flow { animation: dash-flow 1.5s linear infinite; }
      `}</style>
      
      {/* Floating Live Sync Pill */}
      <div className="absolute -top-6 right-8 bg-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-50 z-20 hover-bounce cursor-pointer animate-float-slow">
        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <span className="font-bold text-gray-800 text-lg">Live Sync</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Thống kê học tập (Mô phỏng)</h2>
          <div className="flex items-center gap-6 text-sm font-semibold text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>IELTS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>SAT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Ngữ pháp</span>
            </div>
          </div>
        </div>
        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold mt-2">
          +24.5%
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 w-full mb-12">
        {/* SVG Chart */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 250">
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="0" y1="125" x2="1000" y2="125" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="0" y1="200" x2="1000" y2="200" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="5,5" />

          {/* Purple Area & Dashed Line */}
          <path d="M 0 220 Q 200 210 400 180 T 1000 100 L 1000 250 L 0 250 Z" fill="url(#purpleGrad)" />
          <path d="M 0 220 Q 200 210 400 180 T 1000 100" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="8,8" className="animate-dash-flow" />

          {/* Blue Area & Solid Line */}
          <path d="M 0 190 Q 250 160 500 100 T 1000 50 L 1000 250 L 0 250 Z" fill="url(#blueGrad)" />
          <path d="M 0 190 Q 250 160 500 100 T 1000 50" fill="none" stroke="#3b82f6" strokeWidth="4" />

          {/* Data Points */}
          <circle cx="0" cy="190" r="6" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="250" cy="150" r="6" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="500" cy="100" r="6" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="750" cy="75" r="6" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="1000" cy="50" r="6" fill="#fff" stroke="#3b82f6" strokeWidth="3" />

          {/* Bottom Green Bars */}
          <rect x="20" y="230" width="70" height="20" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="110" y="225" width="70" height="25" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="200" y="225" width="70" height="25" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="290" y="235" width="70" height="15" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="380" y="220" width="70" height="30" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="470" y="230" width="70" height="20" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="560" y="210" width="70" height="40" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="650" y="215" width="70" height="35" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="740" y="210" width="70" height="40" rx="4" fill="#86efac" fillOpacity="0.5" />
          <rect x="830" y="190" width="70" height="60" rx="4" fill="#22c55e" />
          <rect x="920" y="195" width="70" height="55" rx="4" fill="#22c55e" />
        </svg>

        {/* Floating Active Badge */}
        <div className="absolute right-0 top-[15%] translate-x-8 bg-white px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-center cursor-default animate-float-fast">
          <span className="text-gray-500 font-bold mb-1 text-sm">Active now</span>
          <span className="text-3xl font-black text-purple-700">1,247</span>
        </div>
      </div>

      {/* Bottom Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        
        {/* Floating Milestone Badge */}
        <div className="absolute -left-10 top-[20%] bg-white p-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-gray-50 z-20 flex gap-4 items-center cursor-default animate-float-medium">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">New milestone!</h4>
            <p className="text-xs font-semibold opacity-60">10K users reached</p>
          </div>
        </div>

        {/* Card 1: Users */}
        <div className="border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-200 transition-colors bg-white">
          <div className="flex items-center gap-2 text-gray-500 font-bold mb-4 text-sm">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            Người học
          </div>
          <div className="text-3xl font-black text-gray-900 mb-2">8.5K</div>
          <div className="mt-auto h-8 w-full flex items-end justify-end">
            <svg viewBox="0 0 100 30" className="w-16 h-6 overflow-visible">
              <path d="M0 20 Q 25 30 50 15 T 100 5" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Sources */}
        <div className="border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-200 transition-colors bg-white">
          <div className="flex items-center gap-2 text-gray-500 font-bold mb-4 text-sm">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 11V3a8 8 0 11-8 8h8z"/></svg>
            Tỷ lệ hoàn thành
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              {/* Circular Progress */}
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-purple-600" strokeWidth="4" strokeDasharray="100" strokeDashoffset="20" strokeLinecap="round" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-500" strokeWidth="4" strokeDasharray="100" strokeDashoffset="75" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-3xl font-black text-gray-900">80%</span>
          </div>
        </div>

        {/* Card 3: Growth */}
        <div className="border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-between hover:border-green-200 transition-colors bg-white">
          <div className="flex items-center gap-2 text-gray-500 font-bold mb-4 text-sm">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            Tăng trưởng
          </div>
          <div className="text-3xl font-black text-green-500 mb-4">+32%</div>
          <div className="flex gap-2 w-full">
            <div className="flex-1 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 h-3 rounded-full bg-green-400"></div>
            <div className="flex-1 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 h-3 rounded-full bg-green-400"></div>
            <div className="flex-1 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

      </div>

    </div>
  );
}
