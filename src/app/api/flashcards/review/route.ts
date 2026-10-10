export const runtime = "edge";
import { auth } from "@/auth";
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { users, flashcardReviews } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// SuperMemo-2 Algorithm
function calculateSM2(quality: number, repetition: number, efactor: number, interval: number) {
  let newInterval = interval;
  let newRepetition = repetition;
  let newEfactor = efactor;

  if (quality >= 3) {
    if (repetition === 0) {
      newInterval = 1;
    } else if (repetition === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * efactor);
    }
    newRepetition += 1;
  } else {
    newRepetition = 0;
    newInterval = 1;
  }

  newEfactor = efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEfactor < 1.3) newEfactor = 1.3;

  return { interval: newInterval, repetition: newRepetition, efactor: newEfactor };
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vocabId, quality } = await req.json();
    
    if (typeof quality !== 'number' || quality < 0 || quality > 5) {
      return NextResponse.json({ error: 'Invalid quality score (0-5 required)' }, { status: 400 });
    }
    if (!vocabId) {
      return NextResponse.json({ error: 'vocabId required' }, { status: 400 });
    }

    // Find user (we assume email is unique and exists from NextAuth)
    const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email!) });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Find existing review
    let review = await db.query.flashcardReviews.findFirst({
      where: and(eq(flashcardReviews.userId, user.id), eq(flashcardReviews.word, vocabId))
    });

    const isNew = !review;
    
    if (!review) {
      review = {
        id: '',
        userId: user.id,
        word: vocabId,
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }

    // Calculate next state
    const sm2 = calculateSM2(quality, review.repetition, review.efactor, review.interval);
    
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + sm2.interval); // Add days

    // Upsert to DB
    let saved;
    if (isNew) {
      await db.insert(flashcardReviews).values({
        id: crypto.randomUUID(),
        userId: user.id,
        word: vocabId,
        interval: sm2.interval,
        repetition: sm2.repetition,
        efactor: sm2.efactor,
        dueDate: dueDate,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      saved = { dueDate };
    } else {
      await db.update(flashcardReviews).set({
        interval: sm2.interval,
        repetition: sm2.repetition,
        efactor: sm2.efactor,
        dueDate: dueDate,
        updatedAt: new Date()
      }).where(eq(flashcardReviews.id, review.id));
      saved = { dueDate };
    }

    return NextResponse.json({ success: true, nextDueDate: saved.dueDate });
  } catch (error) {
    console.error('Error processing SM2 review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
