import sys
import re

file_path = '/Users/lethanhtunggmail.com/prelynx/src/app/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Add import
import_stmt = 'import AnalyticsDashboard from "./AnalyticsDashboard";\n'
if import_stmt not in content:
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\n' + import_stmt)

# Remove Block 9 and 10 and replace with AnalyticsDashboard
block_pattern = r'\{\/\* Block 9: Wide Banner \*\/\}.*?(?=\{\/\* Footer \*\/\})'
dashboard_html = """{/* Block 9: Analytics Dashboard (Full Width) */}
        <div className="md:col-span-5 w-full mt-12 mb-4 flex justify-center">
          <AnalyticsDashboard />
        </div>

      </div>

      """
      
content = re.sub(block_pattern, dashboard_html, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(content)

print("Homepage updated with Analytics Dashboard")
