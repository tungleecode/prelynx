const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lessons = await prisma.lesson.findMany();
  let count = 0;
  for (const lesson of lessons) {
     const d = lesson.data;
     let newType = lesson.type;
     
     if (d.exam === 'sat') newType = 'sat';
     else if (d.exam === 'ielts') newType = 'ielts_reading';
     else if (d.task === 'ielts_task1' || d.task === 'ielts_task2') newType = d.task;
     else if (d.audioUrl) newType = 'listening';
     else if (d.vi && d.en && !d.paragraphs) newType = 'translation';
     else if (d.paragraphs) newType = 'press';
     
     if (newType !== lesson.type) {
        await prisma.lesson.update({
           where: { id: lesson.id },
           data: { type: newType }
        });
        count++;
     }
  }
  console.log(`Updated ${count} lesson types.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
