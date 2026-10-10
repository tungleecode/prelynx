import sys

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/study/[id]/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

old_block = """          {/* Questions */}
          {d.questions && d.questions.length > 0 && (
             <QuizEditor questions={d.questions} />
          )}"""

new_block = """          {/* Questions */}
          {((d.questions && d.questions.length > 0) || lesson.type === 'grammar') && (
             <QuizEditor questions={lesson.type === 'grammar' ? [{
                 prompt: d.stem,
                 options: d.options,
                 answerIndex: d.answerIndex,
                 whyVi: d.solutionVi
             }] : d.questions} />
          )}"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(file_path, 'w') as f:
        f.write(content)
    print("QuizEditor replaced successfully!")
else:
    print("Error: Could not find old block")

