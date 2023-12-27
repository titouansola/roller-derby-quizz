import { sql } from '@vercel/postgres';
import {
  FullQuestionModel,
  QuestionModel,
} from '@internals/common/models/question.model';
import { getAnswers } from '@internals/common/requests/answers.request';
import { AnswerModel } from '@internals/common/models/answer.model';

export async function getQuestionsWithAnswers() {
  // Fetch Answers
  const answers = await getAnswers();
  // Map question id to answer array
  const answerMap = answers.reduce((map, answer) => {
    map.set(answer.questionId, [...(map.get(answer.questionId) ?? []), answer]);
    return map;
  }, new Map<string, AnswerModel[]>());

  // Fetch Questions
  return (await getValidQuestions())
    .filter(({ id }) => answerMap.has(id))
    .map<FullQuestionModel>((question) => ({
      ...question,
      answers: answerMap.get(question.id)!,
    }));
}

export async function getAllQuestions() {
  return (await sql`SELECT * FROM questions;`).rows as QuestionModel[];
}

export async function getValidQuestions() {
  return (await sql`SELECT * FROM questions WHERE reported is FALSE;`)
    .rows as QuestionModel[];
}

export async function getQuestionById(id: string) {
  return (await sql`SELECT * FROM questions WHERE id=${id};`)
    .rows[0] as QuestionModel;
}
