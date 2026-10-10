import sys
import re

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Replace <nav ...> ... </nav> block
pattern = r'<nav className="w-full max-w-7xl flex justify-between items-center mb-4">.*?</nav>'
new_nav = """<nav className="w-full max-w-7xl flex justify-between items-center mb-4 relative z-50">
        <div className="flex items-center gap-3 cursor-pointer hover-wobble">
          <img src="/logo.png" alt="Prelynx Logo" className="w-14 h-14 object-contain" />
          <h1 className="text-3xl font-black tracking-tight text-[var(--color-maroon)]">Prelynx</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="font-bold hover:opacity-70 transition-opacity">Về chúng tôi</Link>
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="clay-btn px-6 py-2 rounded-sm text-sm anim-pulse-soft"
          >
            Đăng nhập
          </button>
        </div>
      </nav>"""

content = re.sub(pattern, new_nav, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(content)

print("Navbar updated using regex!")
