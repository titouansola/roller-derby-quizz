import { sql } from '@vercel/postgres';
import {
  FullQuestionModel,
  QuestionModel,
} from '@internals/common/models/question.model';
import { AnswerModel } from '@internals/common/models/answer.model';
import { Runner } from '@internals/app/quizz/client/components/runner.client.component';
import Link from 'next/link';
import { RouteList } from '@internals/common/constants/route.list';
import { Button } from '@internals/common/components/ui/button.component';

export async function Quizz() {
  // Fetch Answers
  const answers = (
    await sql`SELECT id, content, question_id, is_right as isright FROM answers;`
  ).rows.map<AnswerModel>(({ id, content, question_id, isright }) => ({
    id,
    content,
    questionId: question_id,
    isRight: isright,
  }));
  // Fetch Questions
  const questions = (
    (
      await sql`SELECT q.id, q.content FROM questions q WHERE q.reported IS FALSE;`
    ).rows as QuestionModel[]
  )
    .map<FullQuestionModel>((question) => ({
      ...question,
      answers:
        answers?.filter(({ questionId }) => questionId === question.id) ?? [],
    }))
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .slice(0, 40);

  if (!(answers?.length > 0) || !(questions?.length > 0)) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <p>Oh non, il n&apos;y a pas encore de question disponible :(</p>
        <Link href={RouteList.ADD_QUESTION}>
          <Button>Ajouter des questions</Button>
        </Link>
      </div>
    );
  }

  return <Runner questions={questions} />;
}
