import re

with open("prisma/schema.prisma", "r") as f:
    content = f.read()

content = content.replace("content     String   @db.Text", "content     String")
content = content.replace("answers   Json?", "answers   String?")
content = content.replace("feedback    Json?", "feedback    String?")

with open("prisma/schema.prisma", "w") as f:
    f.write(content)
