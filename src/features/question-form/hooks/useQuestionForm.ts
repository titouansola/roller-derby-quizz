import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import { AnswerCreationDto } from '@internals/features/quizz/models/answer.model';
import { QuestionCreationDto } from '@internals/features/quizz/models/question.model';
import {
  answersControls,
  questionControls,
} from '@internals/features/question-form/lib/form.controls';
import submit from '@internals/features/question-form/server-actions/submit';

const initialQuestion = { content: '' };
const initialAnswers = [{ content: '', isRight: false }];

export default function useQuestionForm() {
  const [question, setQuestion] =
    useState<QuestionCreationDto>(initialQuestion);
  const [answers, setAnswers] = useState<AnswerCreationDto[]>(initialAnswers);

  const onQuestionInput: FormEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      setQuestion((q) => ({
        ...q,
        content: (e.target as HTMLInputElement).value,
      })),
    [],
  );

  const onAnswerInput: (index: number) => FormEventHandler<HTMLInputElement> =
    useCallback(
      (index) => (e) =>
        setAnswers((a) => {
          a[index].content = (e.target as HTMLInputElement).value;
          return [...a];
        }),
      [],
    );

  const onAnswerIsRightChange: (index: number) => (checked: boolean) => void =
    useCallback(
      (index) => () =>
        setAnswers((a) => {
          a[index].isRight = !a[index].isRight;
          return [...a];
        }),
      [],
    );

  const onAddAnswer: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault();
    //
    setAnswers((a) => [...a, { content: '', isRight: false }]);
  }, []);

  const onRemoveAnswer: (
    index: number,
  ) => MouseEventHandler<HTMLButtonElement> = useCallback(
    (index: number) => (e) => {
      e.preventDefault();
      //
      setAnswers((a) => {
        a.splice(index, 1);
        return [...a];
      });
    },
    [],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      //
      void submit(question, answers);
      //
      setQuestion(initialQuestion);
      setAnswers(initialAnswers);
    },
    [question, answers],
  );

  return {
    question,
    answers,
    onQuestionInput,
    onAnswerInput,
    onAnswerIsRightChange,
    onAddAnswer,
    onRemoveAnswer,
    onSubmit,
    isValid: questionControls(question) && answersControls(answers),
  };
}
