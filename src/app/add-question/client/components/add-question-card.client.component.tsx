'use client';

import { useQuestionForm } from '@internals/common/components/question-form/use-question-form.hook';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@internals/common/components/ui/card.component';
import {
  QuestionFormContent,
  QuestionFormDescription,
  QuestionFormFooter,
  QuestionFormWrapper,
} from '@internals/common/components/question-form/question-form.client.component';
import { revalidateQuizz } from '@internals/app/quizz/server/actions/revalidate-quizz.server.action';

export default function AddQuestionCard() {
  const service = useQuestionForm(revalidateQuizz);
  return (
    <QuestionFormWrapper {...service}>
      <Card>
        <CardHeader>
          <CardTitle>Proposer une question</CardTitle>
          <CardDescription>
            <QuestionFormDescription />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuestionFormContent {...service} />
        </CardContent>
        <CardFooter className="justify-end">
          <QuestionFormFooter {...service} />
        </CardFooter>
      </Card>
    </QuestionFormWrapper>
  );
}
