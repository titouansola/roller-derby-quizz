'use server';

import { sql } from '@vercel/postgres';
import { revalidateQuizz } from '@internals/common/actions/revalidate-quizz.server.action';
import { QuestionModel } from '@internals/common/models/question.model';

export async function toggleReported(question: QuestionModel) {
  await sql`UPDATE questions SET reported=${!question.reported} WHERE id=${
    question.id
  };`;
  await revalidateQuizz(question.id);
}
