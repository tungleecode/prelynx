import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/[id]/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

old_h1 = """          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)] leading-tight mb-4 capitalize">
            {d.title || d.titleEn || d.titleVi || (lesson.type === 'translation' ? `Dịch câu: ${(d.en || '').slice(0, 40)}...` : d.task === 'ielts_task2' ? `IELTS Task 2: ${d.topicSlug || ''} (${(d.essayKind || '').replace(/_/g, ' ')})` : d.task === 'ielts_task1' ? `IELTS Task 1: ${d.chartKind || 'Chart'}` : "Bài học không tên")}
          </h1>"""

new_h1 = """          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-maroon)] leading-tight mb-4 capitalize">
            {d.title || d.titleEn || d.titleVi || (lesson.type === 'translation' ? `Dịch câu: ${(d.en || '').slice(0, 40)}...` : d.task === 'ielts_task2' ? `IELTS Task 2: ${d.topicSlug || ''} (${(d.essayKind || '').replace(/_/g, ' ')})` : d.task === 'ielts_task1' ? `IELTS Task 1: ${d.chartKind || 'Chart'}` : lesson.type === 'grammar' ? `Bài tập: ${d.skill || 'Ngữ pháp'}` : "Bài học không tên")}
          </h1>"""

if old_h1 in content:
    content = content.replace(old_h1, new_h1)
    with open(file_path, 'w') as f:
        f.write(content)
    print("H1 replaced successfully!")
else:
    print("Error: Could not find old H1")
