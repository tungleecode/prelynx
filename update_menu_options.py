import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/StudyMenu.tsx'
with open(file_path, 'r') as f:
    content = f.read()

content = content.replace("{ label: 'IELTS Listening', href: 'ielts_listening' }, // Not explicit in DB, maybe fallback\n      ", "")

with open(file_path, 'w') as f:
    f.write(content)
print("Removed IELTS Listening from menu")
