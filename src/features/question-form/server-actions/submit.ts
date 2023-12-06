'use server';

import { v4 as uuidv4 } from 'uuid';
import {
  QuestionCreationDto,
  QuestionModel,
} from '@internals/features/quizz/models/question.model';
import {
  AnswerCreationDto,
  AnswerModel,
} from '@internals/features/quizz/models/answer.model';
import { sql } from '@vercel/postgres';
import {
  answersControls,
  questionControls,
} from '@internals/features/question-form/lib/form.controls';

export default async function submit(
  _question: QuestionCreationDto,
  _answers: AnswerCreationDto[],
) {
  if (!questionControls(_question) || !answersControls(_answers)) {
    throw new Error('Bad request');
  }

  const questionId = uuidv4();
  const question: QuestionModel = { id: questionId, ..._question };
  const answers = _answers.map<AnswerModel>((_answer) => ({
    id: uuidv4(),
    ..._answer,
  }));

  await sql`INSERT INTO questions VALUES (${question.id}, ${question.content});`;
  for (const answer of answers) {
    await sql`INSERT INTO answers VALUES (${answer.id}, ${questionId}, ${answer.content}, ${answer.isRight});`;
  }
}
