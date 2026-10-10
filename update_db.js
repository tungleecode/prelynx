const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log("Loading merged data...");
  const mergedData = JSON.parse(fs.readFileSync('readup_all_data_merged.json', 'utf8'));
  
  console.log("Updating database...");
  let count = 0;
  for (const item of mergedData) {
    if (item.id) {
       await prisma.lesson.updateMany({
         where: { id: item.id },
         data: { data: item }
       });
       count++;
       if (count % 100 === 0) console.log(`Updated ${count}/${mergedData.length}`);
    }
  }
  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
