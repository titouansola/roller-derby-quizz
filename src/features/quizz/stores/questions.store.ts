import { create } from 'zustand';
import { QuestionModel } from '../models/question.model';
import { useAnswersStore } from '@internals/features/quizz/stores/answers.store';

const initialState = {
  questions: [] as QuestionModel[],
  currentQuestion: null as QuestionModel | null,
};

type QuestionsStoreActions = {
  push: (questions: QuestionModel[]) => void;
  removeCurrent: () => void;
  next: () => void;
};

export const useQuestionsStore = create<
  typeof initialState & QuestionsStoreActions
>((set, get) => ({
  ...initialState,
  push: (questions) => {
    set({ questions });
    //
    useQuestionsStore.getState().next();
  },
  removeCurrent: () => {
    const { questions, currentQuestion } = get();
    questions.splice(questions.indexOf(currentQuestion!), 1);
    set({ questions: [...questions] });
  },
  next: () => {
    const { currentQuestion, questions } = get();
    const current = questions.indexOf(currentQuestion!);
    const next = selectNextQuestion(current, questions);
    const newQuestion = questions[next];
    set({ currentQuestion: newQuestion });
    //
    void useAnswersStore.getState().fetch(newQuestion.id);
  },
}));

function selectNextQuestion(
  current: number,
  questions: QuestionModel[],
): number {
  const next = Math.floor(Math.random() * questions.length);
  return next === current ? selectNextQuestion(current, questions) : next;
}
