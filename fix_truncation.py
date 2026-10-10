import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

content = content.replace('line-clamp-1', '')
content = content.replace('line-clamp-2', '')

with open(file_path, 'w') as f:
    f.write(content)
print("Removed line-clamp classes")
