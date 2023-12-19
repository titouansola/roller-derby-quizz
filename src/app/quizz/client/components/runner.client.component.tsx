'use client';

import cn from 'clsx';
import { FullQuestionModel } from '@internals/common/models/question.model';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@internals/common/components/ui/card.component';
import { Checkbox } from '@internals/common/components/ui/checkbox.component';
import { Label } from '@internals/common/components/ui/label.component';
import { Button } from '@internals/common/components/ui/button.component';
import { EndModal } from '@internals/app/quizz/client/components/end-modal.client.component';
import { useQuizzRunner } from '@internals/app/quizz/hooks/use-quizz-runner.hook';
import { Report } from '@internals/app/quizz/client/components/report.client.component';
import { ModifyQuestionModal } from '@internals/app/quizz/client/components/modify-question-modal.client.component';

export function Runner(props: { questions: FullQuestionModel[] }) {
  const { state, actions } = useQuizzRunner(props.questions);
  return (
    <>
      {state.end && (
        <EndModal
          score={state.score}
          total={state.total}
          reset={actions.reset}
        />
      )}
      <Report
        question={state.currentQuestion}
        nextQuestion={actions.nextQuestion}
      />
      <ModifyQuestionModal
        question={state.currentQuestion}
        onSubmit={actions.nextQuestion}
      />
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Roller Derby Quizz</CardTitle>
          <CardDescription>
            Répond correctement aux questions pour réviser tes MST !
            <br />
            Plusieurs bonnes réponses sont possibles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-3">
            Score: {state.score}
            <br />
            Question: {state.questionNumber} / {state.total}
          </p>
          <p className="text-xl font-bold text-center mb-6">
            {state.currentQuestion.content}
          </p>
          <ul className="flex flex-col gap-3">
            {state.answers.map((answer) => {
              const isSelected = state.selectedAnswers.includes(answer.id);
              return (
                <li
                  key={answer.id}
                  className={cn(
                    'flex items-center space-x-2 grow cursor-pointer p-5 border-2 rounded transition-all',
                    {
                      'quizz-right-answer': state.showAnswers && answer.isRight,
                      'quizz-wrong-answer':
                        state.showAnswers && !answer.isRight,
                      'quizz-selected-answer': !state.showAnswers && isSelected,
                      'quizz-regular-answer': !isSelected,
                      'quizz-disabled-answer': state.showAnswers,
                    },
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    actions.toggleAnswer(answer.id, !isSelected);
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
        <CardFooter className="flex-col items-stretch">
          <div className="text-center font-semibold mb-2">
            {state.isRight === true && <>Bravo !</>}
            {state.isRight === false && <>Raté !</>}
            {state.isRight === null && <>&nbsp;</>}
          </div>
          <Button
            className="grow"
            onClick={(e) => {
              e.preventDefault();
              if (state.showAnswers) {
                actions.nextQuestion();
              } else {
                actions.computeAnswers();
              }
            }}
            disabled={state.selectedAnswers.length === 0}
          >
            {state.showAnswers ? 'Question suivante' : 'Valider'}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
