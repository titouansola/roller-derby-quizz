'use client';

import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@internals/components/ui/card.component';
import { Skeleton } from '@internals/components/ui/skeleton.component';
import Report from '@internals/features/report/components/report.component';
import { useQuestionsStore } from '../stores/questions.store';
import { useAnswersStore } from '../stores/answers.store';
import { QuestionModel } from '../models/question.model';
import Answers from './answers.component';

export default function QuestionAndAnswers(props: {
  questions: QuestionModel[];
}) {
  const question = useQuestionsStore((s) => s.currentQuestion);
  const answers = useAnswersStore((s) => s.answers);
  //
  const pushQuestions = useQuestionsStore((s) => s.push);

  useEffect(() => {
    pushQuestions(props.questions);
  }, [props.questions, pushQuestions]);

  return (
    <div className="flex flex-col items-center w-full px-8 py-20">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Roller Derby Quizz</CardTitle>
          <CardDescription>
            Répond correctement aux questions pour réviser tes MST !
            <br />
            Plusieurs bonnes réponses sont possibles.
          </CardDescription>
        </CardHeader>
        {!!question && answers!?.length > 0 ? (
          <Answers />
        ) : (
          <CardContent>
            <Skeleton className="w-3/4 mx-auto h-[25px] mb-6" />
            <div className="flex flex-col gap-3">
              <Skeleton className="w-full h-[20px]" />
              <Skeleton className="w-full h-[20px]" />
              <Skeleton className="w-full h-[20px]" />
              <Skeleton className="w-full h-[20px]" />
            </div>
          </CardContent>
        )}
      </Card>
      {!!question && <Report />}
    </div>
  );
}
