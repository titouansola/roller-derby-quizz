import { useMemo, useState } from 'react';
import { useQuestionsStore } from '../stores/questions.store';
import { useAnswersStore } from '../stores/answers.store';

export default function useAnswers() {
  const answers = useAnswersStore((s) => s.answers);
  //
  const nextQuestion = useQuestionsStore((s) => s.next);
  //
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [userIsRight, setUserIsRight] = useState<boolean | null>(null);
  //
  const rightAnswers = useMemo(
    () => answers.filter(({ isRight }) => isRight).map(({ id }) => id),
    [answers],
  );
  const wrongAnswers = useMemo(
    () => answers.filter(({ isRight }) => !isRight).map(({ id }) => id),
    [answers],
  );

  const showAnswers = userIsRight !== null;

  const check = () => {
    if (selectedAnswers.length !== rightAnswers.length) {
      return false;
    }
    return !selectedAnswers.some((a) => wrongAnswers.includes(a));
  };

  const onClickMainAction = () => {
    if (showAnswers) {
      setUserIsRight(null);
      setSelectedAnswers([]);
      nextQuestion();
    } else {
      setUserIsRight(check());
    }
  };

  const onToggleAnswer = (answerId: string, value: boolean) =>
    setSelectedAnswers((sa) => {
      if (!value) {
        return sa.filter((id) => id !== answerId);
      } else {
        return [...sa, answerId];
      }
    });

  return {
    selectedAnswers,
    userIsRight,
    showAnswers,
    onClickMainAction,
    onToggleAnswer,
  };
}
