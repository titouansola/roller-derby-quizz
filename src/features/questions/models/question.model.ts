import { AnswerModel } from './answer.model';

export type QuestionModel = {
  id: string;
  content: string;
  answers: AnswerModel[];
};
