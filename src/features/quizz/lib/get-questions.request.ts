'use server';

import { sql } from '@vercel/postgres';
import { QuestionModel } from '../models/question.model';

export default async function getQuestions() {
  return (await sql`SELECT * FROM questions;`).rows as QuestionModel[];
}
