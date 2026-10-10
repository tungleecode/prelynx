import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Replace pointer-events-none
old_class = "opacity-50 grayscale pointer-events-none"
new_class = "opacity-50 grayscale"
content = content.replace(old_class, new_class)

# Add an onClick handler to PRO links to show an alert, instead of navigating
old_link = """                           <Link href={`/study/${lesson.id}`} key={lesson.id} className="clay-card p-4 rounded-xl flex items-center gap-4 hover-squeeze group transition-all">"""
new_link = """                           <Link 
                             href={`/study/${lesson.id}`} 
                             key={lesson.id} 
                             onClick={(e) => {
                               if (isPro) {
                                 e.preventDefault();
                                 alert('🚀 Tính năng này thuộc Gói PRO!\\n\\nBạn cần nâng cấp tài khoản để mở khóa lộ trình từ Chủ đề 3 trở đi nhé!');
                               }
                             }}
                             className="clay-card p-4 rounded-xl flex items-center gap-4 hover-squeeze group transition-all"
                           >"""
content = content.replace(old_link, new_link)

with open(file_path, 'w') as f:
    f.write(content)
print("Fixed PRO click issue")
