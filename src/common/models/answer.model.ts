import { Id } from '@internals/common/models/id.model';

export type AnswerModel = Id & {
  content: string;
  questionId: string;
  isRight: boolean;
};

export type AnswerCreationDto = Partial<Id> &
  Omit<AnswerModel, 'id' | 'questionId'>;
