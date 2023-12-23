import { sql } from '@vercel/postgres';
import { QuestionModel } from '@internals/common/models/question.model';
import { QuestionTable } from '@internals/app/manage/client/components/question-table.client.component';

export const revalidate = 1;

export default async function Manage() {
  const questions = (
    await sql`SELECT q.id, q.content, q.reported FROM questions q;`
  ).rows as QuestionModel[];
  const validQuestionCount = questions.filter(
    ({ reported }) => !reported,
  ).length;
  const invalidQuestionCount = questions.filter(
    ({ reported }) => reported,
  ).length;
  return (
    <>
      <div className="w-full flex gap-5 items-baseline">
        <p>
          Questions enregistrées : <b>{questions.length}</b>
        </p>
        <p>
          Questions valides : <b>{validQuestionCount}</b>
        </p>
        <p>
          Questions invalides : <b>{invalidQuestionCount}</b>
        </p>
      </div>
      <QuestionTable questions={questions} />
    </>
  );
}
