import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

old_str = """        {/* Category Filters */}
        <div className="flex flex-wrap justify-end gap-3 mt-4 md:mt-0">
          <Link href={`/study?cat=all&view=${view}`} className={`clay-btn px-5 py-2 rounded-lg font-black transition-all ${cat === 'all' ? 'bg-[var(--color-maroon)] text-white' : 'text-[var(--color-maroon)]'}`}>Tất cả</Link>
          <Link href={`/study?cat=listening&view=${view}`} className={`clay-btn px-5 py-2 rounded-lg font-black transition-all ${cat === 'listening' ? 'bg-[var(--color-maroon)] text-white' : 'text-[var(--color-maroon)]'}`}>Luyện Nghe (VOA)</Link>
          <Link href={`/study?cat=writing&view=${view}`} className={`clay-btn px-5 py-2 rounded-lg font-black transition-all ${cat === 'writing' ? 'bg-[var(--color-maroon)] text-white' : 'text-[var(--color-maroon)]'}`}>IELTS Writing</Link>
          <Link href={`/study?cat=translation&view=${view}`} className={`clay-btn px-5 py-2 rounded-lg font-black transition-all ${cat === 'translation' ? 'bg-[var(--color-maroon)] text-white' : 'text-[var(--color-maroon)]'}`}>Dịch thuật</Link>
          <Link href={`/study?cat=press&view=${view}`} className={`clay-btn px-5 py-2 rounded-lg font-black transition-all ${cat === 'press' ? 'bg-[var(--color-maroon)] text-white' : 'text-[var(--color-maroon)]'}`}>Báo song ngữ</Link>
        </div>"""

new_str = """        {/* Category Filters */}
        <div className="mt-4 md:mt-0">
          <StudyMenu currentCat={cat} currentView={view} />
        </div>"""

if old_str in content:
    content = content.replace(old_str, new_str)
    with open(file_path, 'w') as f:
        f.write(content)
    print("Replaced successfully!")
else:
    print("Could not find the target string. Using regex fallback.")
    import re
    # Just replace from {/* Category Filters */} to </div>
    pattern = r'\{\/\* Category Filters \*\/\}.*?</div>\s*</div>\s*</div>'
    # Actually wait, let's just print why it failed
