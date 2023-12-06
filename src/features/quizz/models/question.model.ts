export type QuestionModel = {
  id: string;
  content: string;
};

export type QuestionCreationDto = Omit<QuestionModel, 'id'>;
