import { useCallback, useState } from 'react';
import { FullQuestionModel } from '@internals/common/models/question.model';

function checkAnswers(
  selectedAnswers: string[],
  rightAnswers: string[],
  wrongAnswers: string[],
) {
  return (
    rightAnswers.every((ra) => selectedAnswers.includes(ra)) &&
    wrongAnswers.every((wa) => !selectedAnswers.includes(wa))
  );
}

const initialState = {
  questionIndex: 0,
  isRight: null as boolean | null,
  score: 0,
  selectedAnswers: [] as string[],
  end: false,
};

export function useQuizzRunner(questions: FullQuestionModel[]) {
  const [state, setState] = useState({ ...initialState });
  //
  const currentQuestion = questions[state.questionIndex];
  const { answers } = currentQuestion;
  const questionNumber = state.questionIndex + 1;
  const total = questions.length;
  const showAnswers = state.isRight !== null;

  const toggleAnswer = useCallback((answerId: string, checked: boolean) => {
    setState((s) => ({
      ...s,
      selectedAnswers: !checked
        ? s.selectedAnswers.filter((id) => id !== answerId)
        : [...s.selectedAnswers, answerId],
    }));
  }, []);

  const computeAnswers = useCallback(() => {
    const isRight = checkAnswers(
      state.selectedAnswers,
      answers.filter(({ isRight }) => isRight).map(({ id }) => id),
      answers.filter(({ isRight }) => !isRight).map(({ id }) => id),
    );
    setState((s) => ({
      ...s,
      isRight,
      score: s.score + (isRight ? 1 : 0),
    }));
  }, [answers, state.selectedAnswers]);

  const nextQuestion = useCallback(() => {
    const newIndex = state.questionIndex + 1;
    if (newIndex >= total) {
      setState((s) => ({ ...s, end: true }));
    } else {
      setState((s) => ({
        ...s,
        questionIndex: newIndex,
        isRight: null,
        selectedAnswers: [],
      }));
    }
  }, [state.questionIndex, total]);

  const reset = useCallback(() => setState({ ...initialState }), []);

  return {
    state: {
      ...state,
      currentQuestion,
      answers,
      questionNumber,
      total,
      showAnswers,
    },
    actions: {
      toggleAnswer,
      computeAnswers,
      nextQuestion,
      reset,
    },
  };
}
