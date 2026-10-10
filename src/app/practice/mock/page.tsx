export const runtime = "edge";
import prisma from '@/lib/prisma';
import MockTestRoom from './MockTestRoom';
import { redirect } from 'next/navigation';

import { unstable_cache } from "next/cache";

const getMockLesson = unstable_cache(
  async (id?: string) => {
    if (id) {
      return await prisma.lesson.findUnique({
        where: { id }
      });
    } else {
      return await prisma.lesson.findFirst({
        where: {
          type: { in: ['reading', 'press'] }
        }
      });
    }
  },
  ['mock-lesson'],
  { revalidate: 3600 } // Cache for 1 hour
);

export default async function MockTestPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const resolvedParams = await searchParams;
  const lesson = await getMockLesson(resolvedParams.id);

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
