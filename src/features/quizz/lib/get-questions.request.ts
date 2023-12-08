'use server';

import { sql } from '@vercel/postgres';
import { QuestionModel } from '../models/question.model';

export default async function getQuestions() {
  return (
    await sql`SELECT q.id, q.content FROM questions q WHERE q.reported IS FALSE;`
  ).rows as QuestionModel[];
}
