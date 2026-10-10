"use client"
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    <button onClick={() => router.back()} className="clay-btn bg-white/80 px-4 py-2 rounded-xl font-black text-[var(--color-maroon)] flex items-center gap-2 hover-squeeze transition-all border border-[var(--color-clay-pink)] shadow-sm">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      Quay lại Thư viện
    </button>
  )
}
