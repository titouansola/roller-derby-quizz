'use server';

import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import {
  QuestionCreationDto,
  QuestionModel,
} from '@internals/common/models/question.model';
import {
  AnswerCreationDto,
  AnswerModel,
} from '@internals/common/models/answer.model';
import {
  answersControls,
  questionControls,
} from '@internals/common/utils/form.controls';
import { revalidateQuizz } from '@internals/common/actions/revalidate-quizz.server.action';

export async function submitQuestion(
  question: QuestionCreationDto | QuestionModel,
  answers: AnswerCreationDto[] | AnswerModel[],
) {
  if (!questionControls(question) || !answersControls(answers)) {
    throw new Error('Bad request');
  }

  if (!!question.id) {
    await update(question as QuestionModel, answers as AnswerModel[]);
  } else {
    await create(question, answers);
  }
  //
  await revalidateQuizz(question.id);
}

async function create(
  _question: QuestionCreationDto,
  _answers: AnswerCreationDto[],
) {
  const questionId = uuidv4();
  const question: QuestionModel = { ..._question, id: questionId };
  const answers = _answers.map<AnswerModel>((_answer) => ({
    ..._answer,
    id: uuidv4(),
    questionId,
  }));
  await sql`INSERT INTO questions VALUES (${question.id}, ${question.content});`;
  await insertAnswers(answers);
}

async function update(question: QuestionModel, answers: AnswerModel[]) {
  await sql`UPDATE questions SET content = ${question.content} WHERE id = ${question.id}`;
  await sql`DELETE FROM answers WHERE question_id = ${question.id}`;
  await insertAnswers(
    answers.map((a) => ({ ...a, id: uuidv4(), questionId: question.id })),
  );
}

async function insertAnswers(answers: AnswerModel[]) {
  for (const answer of answers) {
    await sql`INSERT INTO answers VALUES (${answer.id}, ${answer.questionId}, ${answer.content}, ${answer.isRight});`;
  }
}
