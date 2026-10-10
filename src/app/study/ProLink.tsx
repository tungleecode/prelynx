"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProLink({ isPro, href, children, className }: { isPro: boolean, href: string, children: React.ReactNode, className?: string }) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (isPro) {
      e.preventDefault();
      setShowModal(true);
    }
  }

  return (
    <>
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>

      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border-2 border-gray-100 flex flex-col items-center text-center zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4">🎁</div>
            <h3 className="text-2xl font-black text-[var(--color-maroon)] mb-2">Đặc quyền PRO!</h3>
            <p className="text-gray-500 font-medium mb-8">Tính năng này lẽ ra thuộc Gói PRO, nhưng vì bạn là người dùng sớm, chúng tôi <b>mở khoá hoàn toàn miễn phí</b> cho bạn trải nghiệm!</p>
            <div className="flex gap-4 w-full">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                Quay lại
              </button>
              <button onClick={() => {
                setShowModal(false);
                router.push(href);
              }} className="flex-1 py-3 rounded-xl font-black text-white bg-[var(--color-maroon)] hover:bg-red-800 transition-colors shadow-md hover:shadow-lg">
                Vào học ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
