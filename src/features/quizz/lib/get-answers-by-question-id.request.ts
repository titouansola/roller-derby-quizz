'use server';

import { sql } from '@vercel/postgres';
import { AnswerModel } from '@internals/features/quizz/models/answer.model';

export default async function getAnswersByQuestionId(questionId: string) {
  return (
    await sql`SELECT a.id, a.content, a.is_right as isright FROM answers a WHERE a.question_id = ${questionId};`
  ).rows.map<AnswerModel>(({ id, content, isright }) => ({
    id,
    content,
    isRight: isright,
  }));
}
