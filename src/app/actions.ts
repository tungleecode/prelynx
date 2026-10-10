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

  // Calculate new streak
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let newStreak = user.streak || 0;
  
  if (user.lastStudyDate) {
    const lastStudy = new Date(user.lastStudyDate);
    const lastStudyDay = new Date(lastStudy.getFullYear(), lastStudy.getMonth(), lastStudy.getDate());
    const diffTime = Math.abs(today.getTime() - lastStudyDay.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

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

  // Reward 10 gems and update streak for completing a mock test
  await db.update(users)
    .set({ 
      gems: sql`${users.gems} + 10`,
      streak: newStreak,
      lastStudyDate: now
    })
    .where(eq(users.id, user.id));

  return { success: true };
}

export async function toggleLessonProgressAction(lessonId: string, updates: { isFav?: boolean, completed?: boolean }) {
  const session = await auth();
  if (!session || !session.user) return { success: false, error: 'Unauthorized' };

  const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email!) });
  if (!user) return { success: false, error: 'User not found' };

  // Calculate new streak
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let newStreak = user.streak || 0;
  
  if (user.lastStudyDate) {
    const lastStudy = new Date(user.lastStudyDate);
    const lastStudyDay = new Date(lastStudy.getFullYear(), lastStudy.getMonth(), lastStudy.getDate());
    const diffTime = Math.abs(today.getTime() - lastStudyDay.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  const existing = await db.query.userProgresses.findFirst({
    where: (up, { and }) => and(eq(up.userId, user.id), eq(up.lessonId, lessonId))
  });

  if (existing) {
    await db.update(userProgresses)
      .set({
        ...updates,
        lastSeen: new Date()
      })
      .where(eq(userProgresses.id, existing.id));
  } else {
    await db.insert(userProgresses).values({
      id: crypto.randomUUID(),
      userId: user.id,
      lessonId,
      completed: updates.completed ?? false,
      isFav: updates.isFav ?? false,
      lastSeen: new Date()
    });
  }

  // Update streak and conditionally reward gems
  if (updates.completed && (!existing || !existing.completed)) {
    await db.update(users)
      .set({ 
        gems: sql`${users.gems} + 5`,
        streak: newStreak,
        lastStudyDate: now
      })
      .where(eq(users.id, user.id));
  } else if (updates.completed) {
    await db.update(users)
      .set({ 
        streak: newStreak,
        lastStudyDate: now
      })
      .where(eq(users.id, user.id));
  }

  return { success: true };
}
