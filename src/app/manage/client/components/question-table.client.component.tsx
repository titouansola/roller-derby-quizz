'use client';

import { FormEventHandler, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import cn from 'clsx';
import { QuestionModel } from '@internals/common/models/question.model';
import { RouteEnum } from '@internals/common/constants/route.enum';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@internals/common/components/ui/table.component';
import {
  Combobox,
  ComboboxOption,
} from '@internals/common/components/ui/combobox.component';
import { Input } from '@internals/common/components/ui/input.component';

enum ReportStatusEnum {
  ALL = 'all',
  VALID = 'valid',
  INVALID = 'invalid',
}

const reportStatusOptions: ComboboxOption[] = [
  { label: 'Toutes', value: ReportStatusEnum.ALL },
  { label: 'Valides', value: ReportStatusEnum.VALID },
  { label: 'Invalides', value: ReportStatusEnum.INVALID },
];

const reportedFilter = (q: QuestionModel, value: ReportStatusEnum) => {
  switch (value) {
    case ReportStatusEnum.VALID:
      return !q.reported;
    case ReportStatusEnum.INVALID:
      return q.reported;
    default:
      return true;
  }
};

const labelFilter = (q: QuestionModel, value: string) => {
  return (
    value.length === 0 || !!q.content.toLowerCase().match(value.toLowerCase())
  );
};

export function QuestionTable(props: { questions: QuestionModel[] }) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    reported: ReportStatusEnum.ALL,
    label: '',
  });

  const filteredQuestions = props.questions.filter((q) => {
    return reportedFilter(q, filters.reported) && labelFilter(q, filters.label);
  });

  const onChangeReportedFilter = useCallback(
    (reported: ReportStatusEnum) => setFilters((f) => ({ ...f, reported })),
    [],
  );

  const onChangeLabelFilter: FormEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();
      setFilters((f) => ({
        ...f,
        label: (e.target as HTMLInputElement).value,
      }));
    },
    [],
  );

  return (
    <>
      <div className=" w-full my-5">
        <p className="font-bold">Filtres</p>
        <div className="flex gap-5 my-3">
          <Input
            className="max-w-[300px]"
            placeholder="Chercher une question..."
            onInput={onChangeLabelFilter}
          />
          <Combobox
            options={reportStatusOptions}
            selectedValue={filters.reported}
            onChange={onChangeReportedFilter}
          />
        </div>
        <p>
          Affichées : <b>{filteredQuestions.length}</b>
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Identifiant</TableHead>
            <TableHead>Label</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQuestions.map((q) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredQuestions.length === 0 && <p>Aucune correspondance.</p>}
    </>
  );
}
