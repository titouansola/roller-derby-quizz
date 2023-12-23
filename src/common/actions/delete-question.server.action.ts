'use server';

import { sql } from '@vercel/postgres';
import { revalidateQuizz } from '@internals/common/actions/revalidate-quizz.server.action';

export async function deleteQuestion(questionId: string) {
  await sql`DELETE FROM questions WHERE id=${questionId};`;
  await revalidateQuizz();
}
