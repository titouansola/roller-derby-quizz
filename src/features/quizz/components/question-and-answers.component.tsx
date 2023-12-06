'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@internals/components/ui/card.component';
import { QuestionModel } from '../models/question.model';
import Answers from './answers.component';
import { useCallback, useEffect, useState } from 'react';
import { AnswerModel } from '@internals/features/quizz/models/answer.model';
import getAnswersByQuestionId from '@internals/features/quizz/lib/get-answers-by-question-id.request';
import { Skeleton } from '@internals/components/ui/skeleton.component';

export default function QuestionAndAnswers(props: {
  questions: QuestionModel[];
}) {
  const [question, setQuestion] = useState<QuestionModel | null>(null);
  const [answers, setAnswers] = useState<AnswerModel[] | null>(null);

  const onNext = useCallback(async () => {
    const index = Math.floor(Math.random() * props.questions.length);
    const newQuestion = props.questions[index];
    setQuestion(newQuestion);
    setAnswers(await getAnswersByQuestionId(newQuestion.id));
  }, [props.questions]);

  useEffect(() => {
    void onNext();
  }, [onNext]);

  return (
    <div className="flex justify-center w-full px-8 py-20">
      <Card>
        <CardHeader>
          <CardTitle>Roller Derby Quizz</CardTitle>
          <CardDescription>
            Répond correctement aux questions pour réviser tes MST !
            <br />
            Plusieurs bonnes réponses sont possibles.
          </CardDescription>
        </CardHeader>
        {!!question && answers!?.length > 0 ? (
          <Answers
            question={question.content}
            answers={answers!}
            onNext={onNext}
          />
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
    </div>
  );
}
