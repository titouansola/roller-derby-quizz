import { create } from 'zustand';
import { AnswerModel } from '../models/answer.model';
import getAnswersByQuestionId from '@internals/features/quizz/lib/get-answers-by-question-id.request';

const initialState = {
  answers: [] as AnswerModel[],
};

type AnswersStoreActions = {
  fetch: (questionId: string) => void;
};

export const useAnswersStore = create<
  typeof initialState & AnswersStoreActions
>((set) => ({
  ...initialState,
  //
  fetch: async (questionId) => {
    const answers = await getAnswersByQuestionId(questionId);
    set({ answers });
  },
}));
