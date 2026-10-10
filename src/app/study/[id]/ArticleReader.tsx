export default function ArticleReader({ paragraphs, attribution, cefrLevel, readabilityScore }: { paragraphs?: string[], attribution?: string, cefrLevel?: string, readabilityScore?: number }) {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Metadata Bar */}
      <div className="flex flex-wrap gap-4 mb-2">
        {cefrLevel && (
          <span className="clay-card px-4 py-2 rounded-lg font-black text-[var(--color-maroon)] text-sm shadow-sm bg-white/60">
            Trình độ: {cefrLevel}
          </span>
        )}
        {readabilityScore !== undefined && (
          <span className="clay-card px-4 py-2 rounded-lg font-black text-blue-600 text-sm shadow-sm bg-white/60">
            Độ khó (Readability): {readabilityScore}
          </span>
        )}
      </div>

      {/* Content */}
      {paragraphs && paragraphs.length > 0 && (
        <div className="clay-card p-6 md:p-12 rounded-3xl shadow-inner bg-white/60 border border-[var(--color-clay-pink)]/40 space-y-8 font-serif">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-justify leading-loose text-gray-900 text-xl md:text-2xl">
              {p}
            </p>
          ))}
        </div>
      )}
      
      {/* Attribution Footer */}
      {attribution && (
        <div className="mt-8 clay-card p-6 rounded-2xl bg-gray-50/50 border border-gray-200">
          <h4 className="text-sm font-black uppercase text-gray-500 mb-2">Bản quyền & Nguồn</h4>
          <p className="text-sm font-bold text-gray-600 opacity-80 leading-relaxed italic">
            {attribution}
          </p>
        </div>
      )}
    </div>
  )
}
