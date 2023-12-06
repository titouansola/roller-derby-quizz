import { useMemo, useState } from 'react';
import { AnswerModel } from '../models/answer.model';

export default function useAnswers(answers: AnswerModel[], onNext: () => void) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [userIsRight, setUserIsRight] = useState<boolean | null>(null);
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
      onNext();
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
