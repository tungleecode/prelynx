"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function PlanPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (status === 'unauthenticated') {
    router.push('/login?callbackUrl=/plan')
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      currentBand: formData.get('currentBand'),
      targetBand: formData.get('targetBand'),
      months: formData.get('months'),
      dailyGoal: formData.get('hours')
    }

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (res.ok) {
        router.push('/dashboard')
      } else {
        alert('Có lỗi xảy ra khi lưu lộ trình!')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center bg-[var(--color-bg-cream)]/50">
      <div className="w-full max-w-2xl clay-card p-8 md:p-12 rounded-3xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🎯
          </div>
          <h1 className="text-3xl font-black text-gray-800">Lập lộ trình học tập</h1>
          <p className="text-gray-500 font-medium mt-2">Cho chúng mình biết mục tiêu của bạn để Prelynx sắp xếp bài học phù hợp mỗi ngày nhé.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-700">Trình độ hiện tại của bạn</label>
            <select name="currentBand" className="clay-card p-4 rounded-xl bg-white focus:outline-none border-2 border-transparent focus:border-[var(--color-maroon)] text-gray-800 font-medium appearance-none">
              <option value="0">Mới bắt đầu (Dưới 4.0)</option>
              <option value="4.5">Cơ bản (4.0 - 5.0)</option>
              <option value="5.5">Khá (5.5 - 6.0)</option>
              <option value="6.5">Tốt (6.5+)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-700">Mục tiêu IELTS (Band điểm)</label>
            <select name="targetBand" className="clay-card p-4 rounded-xl bg-white focus:outline-none border-2 border-transparent focus:border-[var(--color-maroon)] text-gray-800 font-medium appearance-none">
              <option value="6.0">6.0 - Đủ điều kiện ra trường</option>
              <option value="6.5">6.5 - Tiêu chuẩn du học</option>
              <option value="7.0">7.0 - Xét tuyển đại học top</option>
              <option value="7.5">7.5+ - Đam mê / Giảng dạy</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-700">Thời gian dự kiến thi</label>
            <select name="months" className="clay-card p-4 rounded-xl bg-white focus:outline-none border-2 border-transparent focus:border-[var(--color-maroon)] text-gray-800 font-medium appearance-none">
              <option value="1">Gấp rút (Dưới 1 tháng)</option>
              <option value="3">Vừa phải (1 - 3 tháng)</option>
              <option value="6">Thong thả (3 - 6 tháng)</option>
              <option value="12">Rất lâu nữa (Trên 6 tháng)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-700">Thời gian học mỗi ngày</label>
            <div className="grid grid-cols-3 gap-4">
              <label className="clay-card p-4 rounded-xl bg-white text-center cursor-pointer hover-squeeze border-2 border-transparent has-[:checked]:border-[var(--color-maroon)] has-[:checked]:bg-[var(--color-clay-pink)]/20">
                <input type="radio" name="hours" value="60" className="hidden" defaultChecked />
                <span className="font-bold text-gray-800 block">1 giờ</span>
              </label>
              <label className="clay-card p-4 rounded-xl bg-white text-center cursor-pointer hover-squeeze border-2 border-transparent has-[:checked]:border-[var(--color-maroon)] has-[:checked]:bg-[var(--color-clay-pink)]/20">
                <input type="radio" name="hours" value="120" className="hidden" />
                <span className="font-bold text-gray-800 block">2 giờ</span>
              </label>
              <label className="clay-card p-4 rounded-xl bg-white text-center cursor-pointer hover-squeeze border-2 border-transparent has-[:checked]:border-[var(--color-maroon)] has-[:checked]:bg-[var(--color-clay-pink)]/20">
                <input type="radio" name="hours" value="180" className="hidden" />
                <span className="font-bold text-gray-800 block">3+ giờ</span>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="clay-btn w-full py-4 mt-4 rounded-xl text-lg font-black text-white bg-[var(--color-maroon)] border-none disabled:opacity-50"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Tạo Lộ Trình Bằng AI 🚀'}
          </button>
        </form>
      </div>
    </div>
  )
}
