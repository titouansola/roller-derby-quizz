'use client';

import cn from 'clsx';
import {
  CardContent,
  CardFooter,
} from '@internals/components/ui/card.component';
import { Button } from '@internals/components/ui/button.component';
import { Checkbox } from '@internals/components/ui/checkbox.component';
import { Label } from '@internals/components/ui/label.component';
import useAnswers from '../hooks/useAnswers';
import { useQuestionsStore } from '../stores/questions.store';
import { useAnswersStore } from '../stores/answers.store';

export default function Answers() {
  const question = useQuestionsStore((s) => s.currentQuestion);
  const answers = useAnswersStore((s) => s.answers);
  //
  const { selectedAnswers, showAnswers, onClickMainAction, onToggleAnswer } =
    useAnswers();

  return (
    <>
      <CardContent>
        <p className="text-xl font-bold text-center mb-6">
          {question?.content}
        </p>
        <ul className="flex flex-col gap-3">
          {answers.map((answer) => {
            const isSelected = selectedAnswers.includes(answer.id);

            return (
              <li
                key={answer.id}
                className={cn(
                  'flex items-center space-x-2 grow cursor-pointer p-5 border rounded',
                  {
                    'quizz-right-answer':
                      showAnswers && isSelected && answer.isRight,
                    'quizz-wrong-answer':
                      showAnswers && isSelected && !answer.isRight,
                    'quizz-selected-answer': !showAnswers && isSelected,
                    'quizz-regular-answer': !isSelected,
                    'quizz-disabled-answer': showAnswers,
                  },
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onToggleAnswer(answer.id, !isSelected);
                }}
              >
                <Checkbox id={answer.id} checked={isSelected} />
                <Label
                  className="cursor-pointer select-none"
                  htmlFor={answer.id}
                >
                  {answer.content}
                </Label>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="grow"
          onClick={onClickMainAction}
          disabled={selectedAnswers.length === 0}
        >
          {showAnswers ? 'Question suivante' : 'Valider'}
        </Button>
      </CardFooter>
    </>
  );
}
