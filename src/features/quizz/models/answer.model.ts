export type AnswerModel = {
  id: string;
  content: string;
  isRight: boolean;
};

export type AnswerCreationDto = Omit<AnswerModel, 'id'>;
