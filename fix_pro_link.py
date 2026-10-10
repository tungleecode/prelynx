import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

if 'import ProLink' not in content:
    content = content.replace("import StudyMenu from './StudyMenu'", "import StudyMenu from './StudyMenu'\nimport ProLink from './ProLink'")

old_link = """                           <Link 
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

new_link = """                           <ProLink 
                             href={`/study/${lesson.id}`} 
                             key={lesson.id} 
                             isPro={isPro}
                             className="clay-card p-4 rounded-xl flex items-center gap-4 hover-squeeze group transition-all"
                           >"""

content = content.replace(old_link, new_link)
content = content.replace("</Link>", "</ProLink>", 1) # Only replace the first closing Link in that block? 
# Wait, there are multiple </Link>s. The one inside the roadmap is right after getWords
old_close = """                                 {getWords(d, lesson.type)} từ
                              </div>
                           </Link>"""
new_close = """                                 {getWords(d, lesson.type)} từ
                              </div>
                           </ProLink>"""
content = content.replace(old_close, new_close)

with open(file_path, 'w') as f:
    f.write(content)
print("Updated page.tsx to use ProLink")
