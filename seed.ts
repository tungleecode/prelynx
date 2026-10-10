import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Reading data...');
  const dataPath = path.join(process.cwd(), 'readup_all_data_merged.json');
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  const lessons = JSON.parse(fileContent);

  console.log(`Found ${lessons.length} items. Starting seed...`);
  
  let count = 0;
  for (const lesson of lessons) {
    if (!lesson || !lesson.id) continue;
    
    // Determine type
    let type = 'unknown';
    if (lesson.id.startsWith('satrw-')) type = 'grammar';
    else if (lesson.id.startsWith('tr-')) type = 'translation';
    else if (lesson.id.startsWith('bl-')) type = 'reading';
    else if (lesson.id.startsWith('pr-')) type = 'press';
    else if (lesson.id.startsWith('voa-')) type = 'listening';
    else if (lesson.id.startsWith('w-t1-') || lesson.task === 'ielts_task1') type = 'ielts_task1';
    else if (lesson.id.startsWith('w-t2-') || lesson.task === 'ielts_task2') type = 'ielts_task2';
    else if (['I', 'II', 'III', 'IV', 'V', 'VI'].includes(lesson.id)) type = 'study_week';
    else type = 'article'; // Fallback for UUIDs and external items
    
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: {
        type,
        data: lesson,
      },
      create: {
        id: lesson.id,
        type,
        data: lesson,
      }
    });
    
    count++;
    if (count % 100 === 0) {
      console.log(`Seeded ${count} items...`);
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
