'use client';

import { useRouter } from 'next/navigation';
import cn from 'clsx';
import { RouteEnum } from '@internals/common/constants/route.enum';
import { QuestionModel } from '@internals/common/models/question.model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@internals/common/components/ui/table.component';

export function QuestionTable(props: { questions: QuestionModel[] }) {
  const router = useRouter();
  //
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Identifiant</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Explications</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.questions.map((q) => (
          <TableRow
            key={q.id}
            onClick={() => router.push(`${RouteEnum.MANAGE}/${q.id}`)}
            className={cn(
              { 'text-destructive': !!q.reported },
              'hover:cursor-pointer',
            )}
          >
            <TableCell>{q.id.substring(0, 8)}...</TableCell>
            <TableCell>{q.content}</TableCell>
            <TableCell>{!!q.description ? 'Oui' : 'Non'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
