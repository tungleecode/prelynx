export const runtime = "edge";
import { auth } from "@/auth";
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const currentBand = parseFloat(body.currentBand);
    const targetBand = parseFloat(body.targetBand);
    const months = parseInt(body.months);
    const dailyGoal = parseInt(body.dailyGoal);

    if (isNaN(currentBand) || isNaN(targetBand) || isNaN(months) || isNaN(dailyGoal)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Calc exam date
    const examDate = new Date();
    examDate.setMonth(examDate.getMonth() + months);

    await db.update(users)
      .set({ currentBand, targetBand, examDate, dailyGoal })
      .where(eq(users.email, session.user.email!));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving plan:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
