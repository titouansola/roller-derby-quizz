'use server';

import { QuestionModel } from '@internals/common/models/question.model';
import { sql } from '@vercel/postgres';

export async function reportQuestion(question: QuestionModel) {
  await sql`UPDATE questions SET reported = true WHERE id = ${question.id};`;
}
