"use client"
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('q', query)
      params.set('page', '1')
    } else {
      params.delete('q')
    }
    router.push(`/study?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto h-full">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm 2800+ bài..." 
        className="clay-card px-4 py-2 flex-1 md:w-64 rounded-xl border-none outline-none text-sm font-bold placeholder:opacity-50 text-[var(--color-maroon)] bg-[var(--color-bg-cream)] h-[44px]" 
      />
      <button type="submit" className="clay-btn px-4 py-2 rounded-xl text-sm font-bold hover-bounce shrink-0 text-[var(--color-maroon)] h-[44px] flex items-center justify-center">
        Lọc
      </button>
    </form>
  )
}
