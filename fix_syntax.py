import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Fix the broken logo Link
broken_logo = """        <Link href="/" className="flex items-center gap-3 cursor-pointer hover-wobble">
          <img src="/logo.png" alt="Prelynx Logo" className="w-14 h-14 object-contain drop-shadow-sm" />
          <h1 className="text-3xl font-black tracking-tight text-[var(--color-maroon)]">Prelynx</h1>
        </ProLink>"""
        
fixed_logo = """        <Link href="/" className="flex items-center gap-3 cursor-pointer hover-wobble">
          <img src="/logo.png" alt="Prelynx Logo" className="w-14 h-14 object-contain drop-shadow-sm" />
          <h1 className="text-3xl font-black tracking-tight text-[var(--color-maroon)]">Prelynx</h1>
        </Link>"""
        
content = content.replace(broken_logo, fixed_logo)

# Fix the actual ProLink closing tag
old_prolink_block = """                           <ProLink 
                             href={`/study/${lesson.id}`} 
                             key={lesson.id} 
                             isPro={isPro}
                             className="clay-card p-4 rounded-xl flex items-center gap-4 hover-squeeze group transition-all"
                           >
                              <div className="w-10 h-10 rounded-full clay-btn flex items-center justify-center text-gray-400 group-hover:text-[var(--color-maroon)]">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                              </div>
                              <div className="flex-1">
                                 <h4 className="font-bold text-lg">{getTitle(d, lesson.type)}</h4>
                                 <p className="text-sm font-medium opacity-60 line-clamp-1">{getSummary(d, lesson.type)}</p>
                              </div>
                              <div className="text-xs font-bold clay-card px-3 py-1 rounded-md opacity-70">
                                {getWords(d, lesson.type)} từ
                              </div>
                           </Link>"""

new_prolink_block = """                           <ProLink 
                             href={`/study/${lesson.id}`} 
                             key={lesson.id} 
                             isPro={isPro}
                             className="clay-card p-4 rounded-xl flex items-center gap-4 hover-squeeze group transition-all"
                           >
                              <div className="w-10 h-10 rounded-full clay-btn flex items-center justify-center text-gray-400 group-hover:text-[var(--color-maroon)]">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                              </div>
                              <div className="flex-1">
                                 <h4 className="font-bold text-lg">{getTitle(d, lesson.type)}</h4>
                                 <p className="text-sm font-medium opacity-60">{getSummary(d, lesson.type)}</p>
                              </div>
                              <div className="text-xs font-bold clay-card px-3 py-1 rounded-md opacity-70">
                                {getWords(d, lesson.type)} từ
                              </div>
                           </ProLink>"""

# Also notice I removed line-clamp-1 earlier, but if it didn't match, maybe it wasn't removed inside the ProLink block?
# Let's just use regex to replace the </Link> that follows <ProLink
import re
content = re.sub(
    r'(<ProLink\s+href=\{`/study/\$\{lesson\.id\}`\}(?:[\s\S]*?))</Link>',
    r'\1</ProLink>',
    content
)

with open(file_path, 'w') as f:
    f.write(content)
print("Syntax fixed")
