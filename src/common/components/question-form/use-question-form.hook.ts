import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { AnswerCreationDto } from '@internals/common/models/answer.model';
import {
  FullQuestionModel,
  QuestionCreationDto,
} from '@internals/common/models/question.model';
import {
  answersControls,
  questionControls,
} from '@internals/common/utils/form.controls';
import { submitQuestion } from '@internals/common/components/question-form/submit-question.server.action';
import { useToast } from '@internals/common/components/ui/use-toast.hook';

const initialQuestion: QuestionCreationDto = { content: '' };
const initialAnswers: AnswerCreationDto[] = [];

export type UseQuestionFormOutput = ReturnType<typeof useQuestionForm>;

export function useQuestionForm(
  onSubmit: () => void,
  questionToUpdate?: FullQuestionModel,
) {
  const { toast } = useToast();
  //
  const [question, setQuestion] = useState({
    ...(questionToUpdate ?? initialQuestion),
  });
  const [answers, setAnswers] = useState([
    ...(questionToUpdate?.answers ?? initialAnswers),
  ]);

  useEffect(() => {
    setQuestion(questionToUpdate ?? initialQuestion);
    setAnswers([...(questionToUpdate?.answers ?? initialAnswers)]);
  }, [questionToUpdate]);

  const onQuestionInput: FormEventHandler<HTMLTextAreaElement> = useCallback(
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

  const onSubmitForm: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      //
      try {
        await submitQuestion(question, answers);
        toast({
          title: 'Question enregistrée',
          description: 'Merci de ta participation !',
          variant: 'success',
        });
        setQuestion(initialQuestion);
        setAnswers(initialAnswers);
        //
        onSubmit();
      } catch (_) {
        toast({
          title: 'Oops !',
          description: 'Une erreur est survenue, réessaye plus tard.',
          variant: 'destructive',
        });
      }
    },
    [question, answers, toast, onSubmit],
  );

  return {
    question,
    answers,
    onQuestionInput,
    onAnswerInput,
    onAnswerIsRightChange,
    onAddAnswer,
    onRemoveAnswer,
    onSubmit: onSubmitForm,
    isValid: questionControls(question) && answersControls(answers),
  };
}
