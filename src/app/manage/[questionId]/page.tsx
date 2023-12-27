import Link from 'next/link';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { RouteEnum } from '@internals/common/constants/route.enum';
import { getQuestionById } from '@internals/common/requests/questions.request';
import { getAnswersByQuestionId } from '@internals/common/requests/answers.request';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@internals/common/components/ui/table.component';
import { Button } from '@internals/common/components/ui/button.component';
import { ModifyQuestionModal } from '@internals/app/quizz/client/components/modify-question-modal.client.component';
import { ReportToggleButton } from '@internals/app/manage/[questionId]/client/components/report-toggle-button.client.component';
import { DeleteQuestionModal } from '@internals/app/manage/[questionId]/client/components/delete-question-modal.client.component';

export const revalidate = 1;

export default async function QuestionAnswers({
  params,
}: {
  params: { questionId: string };
}) {
  const question = await getQuestionById(params.questionId);
  const answers = await getAnswersByQuestionId(params.questionId);
  //
  return (
    <div className="w-full">
      <Link href={RouteEnum.MANAGE}>
        <Button variant="outline">
          <ChevronLeftIcon className="mr-2" />
          Retour
        </Button>
      </Link>
      <p className="font-bold mt-8">{question.content}</p>
      <p className="italic text-sm mt-2">
        {question.description ||
          "Aucune explication n'est enregistrée pour cette question."}
      </p>
      <div className="flex gap-3 my-5">
        <ModifyQuestionModal question={{ ...question, answers }} />
        <ReportToggleButton question={question} />
        <DeleteQuestionModal questionId={question.id} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Identifiant</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Bonne réponse</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {answers.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.id.substring(0, 8)}...</TableCell>
              <TableCell>{a.content}</TableCell>
              <TableCell>{a.isRight ? 'Oui' : 'Non'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
