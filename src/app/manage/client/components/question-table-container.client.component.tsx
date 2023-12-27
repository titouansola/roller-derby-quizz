'use client';

import { QuestionModel } from '@internals/common/models/question.model';
import { useQuestionTableFilters } from '@internals/app/manage/client/hooks/use-question-table-filters.hook';
import { QuestionTableFilters } from '@internals/app/manage/client/components/question-table-filters.client.component';
import { QuestionTable } from '@internals/app/manage/client/components/question-table.client.component';

export function QuestionTableContainer(props: { questions: QuestionModel[] }) {
  const service = useQuestionTableFilters(props.questions);
  //
  return (
    <>
      <div className=" w-full my-5">
        <QuestionTableFilters {...service} />
      </div>
      {service.filteredQuestions.length === 0 ? (
        <p>Aucune correspondance.</p>
      ) : (
        <QuestionTable questions={service.filteredQuestions} />
      )}
    </>
  );
}
