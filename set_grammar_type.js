const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lessons = await prisma.lesson.findMany({ where: { type: 'unknown' }});
  let count = 0;
  for (const l of lessons) {
     if (l.data.unitTitle) {
        await prisma.lesson.update({
           where: { id: l.id },
           data: { type: 'grammar' }
        });
        count++;
     }
  }
  console.log('Updated to grammar:', count);
}
main().catch(console.error).finally(() => prisma.$disconnect());
