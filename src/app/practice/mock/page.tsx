export const runtime = "edge";
import { db } from '@/lib/db';
import { lessons } from '@/lib/db/schema';
import { eq, inArray } from 'drizzle-orm';
import MockTestRoom from './MockTestRoom';

export default async function MockTestPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const resolvedParams = await searchParams;
  const lesson = resolvedParams.id
    ? await db.query.lessons.findFirst({ where: eq(lessons.id, resolvedParams.id) })
    : await db.query.lessons.findFirst({ where: inArray(lessons.type, ['reading', 'press']) });

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-black mb-4">Không tìm thấy bài thi</h1>
          <p className="text-gray-500 mb-8">Bài thi này không tồn tại hoặc đã bị xoá.</p>
          <a href="/practice" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Quay lại</a>
        </div>
      </div>
    );
  }

  return <MockTestRoom lesson={lesson} />;
}
