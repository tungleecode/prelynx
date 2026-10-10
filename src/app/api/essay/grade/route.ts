export const runtime = "edge";
import { auth } from "@/auth";
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { users, essaySubmissions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, content } = await req.json();

    if (!content || content.split(' ').length < 10) {
      return NextResponse.json({ error: 'Nội dung bài viết quá ngắn' }, { status: 400 });
    }

    const wordCount = content.trim().split(/\s+/).filter((w: string) => w.length > 0).length;

    // --- MÔ PHỎNG AI CHẤM ĐIỂM (Vì chưa có API Key thực tế) ---
    // Phân tích heuristic đơn giản
    const hasComplexWords = /furthermore|moreover|nevertheless|consequently|significant|substantial/i.test(content);
    const hasComplexGrammar = /although|despite|while|whereas|not only|but also/i.test(content);
    
    let baseScore = 5.0;
    if (wordCount > 150) baseScore += 0.5;
    if (wordCount > 250) baseScore += 0.5;
    if (hasComplexWords) baseScore += 0.5;
    if (hasComplexGrammar) baseScore += 0.5;

    // Giới hạn max 9.0
    const finalScore = Math.min(9.0, baseScore);

    const feedback = {
      overall: finalScore,
      taskResponse: {
        score: finalScore - 0.5 > 0 ? finalScore - 0.5 : finalScore,
        comment: wordCount >= 250 ? "Bạn đã hoàn thành tốt yêu cầu về số lượng từ. Tuy nhiên cần tập trung phát triển ý sâu hơn." : "Bài viết chưa đủ số từ yêu cầu (250 từ). Bạn cần viết chi tiết hơn."
      },
      coherence: {
        score: finalScore,
        comment: hasComplexGrammar ? "Sử dụng khá tốt các từ nối. Cấu trúc đoạn văn logic." : "Nên sử dụng thêm các từ nối (furthermore, however...) để bài viết mạch lạc hơn."
      },
      lexical: {
        score: hasComplexWords ? finalScore + 0.5 : finalScore - 0.5,
        comment: hasComplexWords ? "Có sử dụng một số từ vựng học thuật tốt." : "Từ vựng còn cơ bản. Hãy thay thế các từ phổ thông bằng từ vựng Academic."
      },
      grammar: {
        score: finalScore,
        comment: hasComplexGrammar ? "Sử dụng được câu phức và cấu trúc ngữ pháp đa dạng." : "Phần lớn là câu đơn. Nên kết hợp câu ghép và câu phức."
      },
      corrections: [
        {
          original: "I think",
          suggestion: "From my perspective / I firmly believe",
          explanation: "Sử dụng cụm từ trang trọng hơn trong văn viết Academic."
        }
      ]
    };

    // Save to DB
    const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email!) });
    if (user) {
      await db.insert(essaySubmissions).values({
        id: crypto.randomUUID(),
        userId: user.id,
        lessonId: lessonId || 'custom-writing',
        content: content,
        wordCount: wordCount,
        score: finalScore,
        feedback: feedback,
        submittedAt: new Date()
      });
      
      // Cập nhật currentBand của User nếu điểm này cao hơn
      if (!user.currentBand || finalScore > user.currentBand) {
        await db.update(users)
          .set({ currentBand: finalScore })
          .where(eq(users.id, user.id));
      }
    }

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error('Error grading essay:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
