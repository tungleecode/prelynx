"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
export async function saveMockTestResult(lessonId: string, score: number, answers: Record<number, string>) {
  const session = await auth();
  if (!session || !session.user) return { success: false, error: 'Unauthorized' };

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) return { success: false, error: 'User not found' };

  await prisma.userProgress.upsert({
    where: {
      userId_lessonId: { userId: user.id, lessonId }
    },
    update: {
      completed: true,
      score,
      answers,
      lastSeen: new Date()
    },
    create: {
      userId: user.id,
      lessonId,
      completed: true,
      score,
      answers
    }
  });

  // Reward 10 gems for completing a mock test
  await prisma.user.update({
    where: { id: user.id },
    data: { gems: { increment: 10 } }
  });

  return { success: true };
}
