import { QueryResultRow, sql } from '@vercel/postgres';
import { AnswerModel } from '@internals/common/models/answer.model';

export async function getAnswers() {
  return (await sql`SELECT * FROM answers;`).rows.map(mapProjectionToModel);
}

export async function getAnswersByQuestionId(questionId: string) {
  return (
    await sql`SELECT * FROM answers WHERE question_id=${questionId};`
  ).rows.map(mapProjectionToModel);
}

function mapProjectionToModel(projected: QueryResultRow): AnswerModel {
  return {
    id: projected.id,
    content: projected.content,
    questionId: projected.question_id,
    isRight: projected.is_right,
  };
}
