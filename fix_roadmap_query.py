import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

old_logic = """  let typeFilter: any = { not: 'unknown' };
  if (cat === 'writing') typeFilter = { in: ['ielts_task1', 'ielts_task2'] };
  if (cat === 'translation') typeFilter = 'translation';
  if (cat === 'press') typeFilter = 'press';
  if (cat === 'listening') typeFilter = 'listening';
  if (cat === 'sat') typeFilter = 'sat';
  if (cat === 'ielts_reading') typeFilter = 'ielts_reading';"""

new_logic = """  let typeFilter: any = { not: 'unknown' };
  if (view === 'roadmap') {
    typeFilter = 'grammar';
  } else {
    if (cat === 'writing') typeFilter = { in: ['ielts_task1', 'ielts_task2'] };
    else if (cat === 'translation') typeFilter = 'translation';
    else if (cat === 'press') typeFilter = 'press';
    else if (cat === 'listening') typeFilter = 'listening';
    else if (cat === 'sat') typeFilter = 'sat';
    else if (cat === 'ielts_reading') typeFilter = 'ielts_reading';
  }"""

content = content.replace(old_logic, new_logic)

# Change limit to 1000 so all roadmap items are loaded on one page
old_limit = "const take = view === 'roadmap' ? 200 : 40"
new_limit = "const take = view === 'roadmap' ? 1000 : 40"
content = content.replace(old_limit, new_limit)

with open(file_path, 'w') as f:
    f.write(content)
print("Updated page.tsx logic for roadmap")
