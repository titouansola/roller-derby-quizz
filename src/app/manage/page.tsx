import { QuestionTableContainer } from '@internals/app/manage/client/components/question-table-container.client.component';
import { getAllQuestions } from '@internals/common/requests/questions.request';

export const revalidate = 1;

export default async function Manage() {
  const questions = await getAllQuestions();
  //
  const validQuestionCount = questions.filter(
    ({ reported }) => !reported,
  ).length;
  const invalidQuestionCount = questions.filter(
    ({ reported }) => reported,
  ).length;
  //
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
      <QuestionTableContainer questions={questions} />
    </>
  );
}
