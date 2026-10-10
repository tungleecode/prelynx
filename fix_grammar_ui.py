import sys

# 1. Update src/app/study/page.tsx (List View)
page_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/page.tsx'
with open(page_path, 'r') as f:
    page_content = f.read()

page_content = page_content.replace(
    "  if (type === 'ielts_task1') return `IELTS Task 1: ${d.chartKind || 'Chart'}`.toUpperCase();\n  return 'Bài học không tên';",
    "  if (type === 'ielts_task1') return `IELTS Task 1: ${d.chartKind || 'Chart'}`.toUpperCase();\n  if (type === 'grammar') return `Bài tập: ${d.skill || 'Ngữ pháp'}`.toUpperCase();\n  return 'Bài học không tên';"
)

page_content = page_content.replace(
    "  if (type === 'ielts_task2' || type === 'ielts_task1') return d.promptText;\n  return 'Khám phá bài học ngay';",
    "  if (type === 'ielts_task2' || type === 'ielts_task1') return d.promptText;\n  if (type === 'grammar') return d.passage || d.stem;\n  return 'Khám phá bài học ngay';"
)

with open(page_path, 'w') as f:
    f.write(page_content)

# 2. Update src/app/study/[id]/page.tsx (Detail View)
detail_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/[id]/page.tsx'
with open(detail_path, 'r') as f:
    detail_content = f.read()

detail_content = detail_content.replace(
    "  if (type === 'ielts_task1') return `IELTS Task 1: ${d.chartKind || 'Chart'}`.toUpperCase();\n  return 'Bài học không tên';",
    "  if (type === 'ielts_task1') return `IELTS Task 1: ${d.chartKind || 'Chart'}`.toUpperCase();\n  if (type === 'grammar') return `Bài tập: ${d.skill || 'Ngữ pháp'}`.toUpperCase();\n  return 'Bài học không tên';"
)

detail_content = detail_content.replace(
    "  const hasQuiz = type === 'sat' || type === 'ielts_reading' || type === 'listening';",
    "  const hasQuiz = type === 'sat' || type === 'ielts_reading' || type === 'listening' || type === 'grammar';"
)

old_quiz_render = """               {hasQuiz && (
                  <QuizEditor questions={d.questions || []} />
               )}"""

new_quiz_render = """               {hasQuiz && (
                  <QuizEditor questions={type === 'grammar' ? [{
                     prompt: d.stem,
                     options: d.options,
                     answerIndex: d.answerIndex,
                     whyVi: d.solutionVi
                  }] : (d.questions || [])} />
               )}"""
detail_content = detail_content.replace(old_quiz_render, new_quiz_render)

# Replace Body Text rendering
old_body = """               {/* Body Text */}
               {d.bodyText && (
                  <div className="mt-8 bg-white p-8 md:p-12 rounded-xl opacity-90 shadow-sm w-full mx-auto leading-relaxed text-lg text-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: d.bodyText }} />
                  </div>
               )}"""
               
new_body = """               {/* Body Text */}
               {(d.bodyText || d.passage || d.paragraphs) && (
                  <div className="mt-8 bg-white p-8 md:p-12 rounded-xl opacity-90 shadow-sm w-full mx-auto leading-relaxed text-lg text-gray-800 font-medium">
                    <div dangerouslySetInnerHTML={{ __html: d.bodyText || d.passage || (d.paragraphs ? d.paragraphs.join('<br/><br/>') : '') }} />
                  </div>
               )}"""
               
if old_body in detail_content:
    detail_content = detail_content.replace(old_body, new_body)
else:
    # try replacing a looser version
    import re
    detail_content = re.sub(
        r'\{\/\* Body Text \*\/\}\s*\{d\.bodyText && \([\s\S]*?\}\)',
        new_body,
        detail_content
    )


with open(detail_path, 'w') as f:
    f.write(detail_content)

print("Updated grammar UI successfully")
