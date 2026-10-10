import sys

def replace_in_file(file_path, replacements):
    with open(file_path, 'r') as f:
        content = f.read()
    
    for old_str, new_str in replacements:
        content = content.replace(old_str, new_str)
        
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"Updated {file_path}")

# 1. page.tsx
page_replacements = [
    ('className="w-full max-w-4xl flex justify-between items-center mb-4"', 'className="w-[95%] flex justify-between items-center mb-4"'),
    ('className="w-full max-w-4xl clay-card rounded-2xl p-8 md:p-12"', 'className="w-[95%] clay-card rounded-2xl p-8 md:p-12"')
]
replace_in_file('/Users/lethanhtunggmail.com/prelynx/src/app/study/[id]/page.tsx', page_replacements)

# 2. QuizEditor.tsx
quiz_replacements = [
    ('className="mt-16 border-t-2 border-[var(--color-clay-pink)]/30 pt-8 w-full max-w-4xl mx-auto"', 'className="mt-16 border-t-2 border-[var(--color-clay-pink)]/30 pt-8 w-full mx-auto"')
]
replace_in_file('/Users/lethanhtunggmail.com/prelynx/src/app/study/[id]/QuizEditor.tsx', quiz_replacements)

# 3. TranslationEditor.tsx
trans_replacements = [
    ('className="mt-8 flex flex-col gap-6 w-full max-w-3xl mx-auto"', 'className="mt-8 flex flex-col gap-6 w-full mx-auto"')
]
replace_in_file('/Users/lethanhtunggmail.com/prelynx/src/app/study/[id]/TranslationEditor.tsx', trans_replacements)

# Wait, if we use 95% for the parent card in page.tsx, the children (QuizEditor, TranslationEditor) 
# which have w-full will automatically take 100% of that 95% space. 
# So removing max-w-4xl from children is correct!

