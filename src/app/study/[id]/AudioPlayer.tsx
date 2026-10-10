"use client"
import { useState, useRef } from 'react'

export default function AudioPlayer({ audioUrl, paragraphs }: { audioUrl: string, paragraphs?: string[] }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause()
      else audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const changeSpeed = () => {
    if (audioRef.current) {
      const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 0.75 : 1
      audioRef.current.playbackRate = nextSpeed
      setSpeed(nextSpeed)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="clay-card p-6 md:p-8 rounded-3xl shadow-lg bg-white/80 border border-[var(--color-clay-pink)]/30 sticky top-4 z-10">
        <h3 className="text-xl font-black text-[var(--color-maroon)] mb-4 flex items-center gap-2">
          🎧 Bảng điều khiển Audio
        </h3>
        
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
          onEnded={() => setIsPlaying(false)}
        />
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-bold text-gray-500 w-12">{formatTime(progress)}</span>
            <input 
              type="range" 
              min={0} 
              max={duration || 100} 
              value={progress} 
              onChange={handleSeek}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-maroon)]"
            />
            <span className="font-mono text-sm font-bold text-gray-500 w-12 text-right">{formatTime(duration)}</span>
          </div>
          
          <div className="flex justify-between items-center px-4">
            <button onClick={changeSpeed} className="clay-btn px-4 py-2 rounded-xl font-black text-[var(--color-maroon)] hover-squeeze">
              {speed}x
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[var(--color-maroon)] text-white flex items-center justify-center shadow-lg hover-squeeze shadow-[var(--color-maroon)]/30 transition-transform"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      {paragraphs && paragraphs.length > 0 && (
        <div className="clay-card p-6 md:p-10 rounded-2xl shadow-inner bg-white/50 border border-[var(--color-clay-pink)]/30 space-y-6">
          <h4 className="text-lg font-black text-gray-400 uppercase tracking-widest mb-4">Transcript</h4>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-justify leading-loose text-gray-800 text-lg font-medium">
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
