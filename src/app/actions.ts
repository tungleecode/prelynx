"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users, userProgresses } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
export async function saveMockTestResult(lessonId: string, score: number, answers: Record<number, string>) {
  const session = await auth();
  if (!session || !session.user) return { success: false, error: 'Unauthorized' };

  const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email!) });
  if (!user) return { success: false, error: 'User not found' };

  await db.insert(userProgresses).values({
    id: crypto.randomUUID(),
    userId: user.id,
    lessonId,
    completed: true,
    score,
    answers,
    lastSeen: new Date()
  }).onDuplicateKeyUpdate({
    set: {
      completed: true,
      score,
      answers,
      lastSeen: new Date()
    }
  });

  // Reward 10 gems for completing a mock test
  await db.update(users)
    .set({ gems: sql`${users.gems} + 10` })
    .where(eq(users.id, user.id));

  return { success: true };
}
