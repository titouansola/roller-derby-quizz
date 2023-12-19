import { Id } from '@internals/common/models/id.model';
import { AnswerModel } from '@internals/common/models/answer.model';

export type QuestionModel = Id & {
  content: string;
};

export type FullQuestionModel = QuestionModel & {
  answers: AnswerModel[];
};

export type QuestionCreationDto = Partial<Id> & Omit<QuestionModel, 'id'>;
