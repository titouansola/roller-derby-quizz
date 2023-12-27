import { FormEventHandler, useCallback, useState } from 'react';
import { QuestionModel } from '@internals/common/models/question.model';
import { BooleanOptionEnum } from '@internals/common/constants/boolean-option.enum';

export function useQuestionTableFilters(questions: QuestionModel[]) {
  const [filters, setFilters] = useState({
    reported: BooleanOptionEnum.ALL,
    description: BooleanOptionEnum.ALL,
    label: '',
  });

  const filteredQuestions = questions.filter((q) => {
    return (
      reportedFilter(q, filters.reported) &&
      descriptionFilter(q, filters.description) &&
      labelFilter(q, filters.label)
    );
  });

  const onChangeReportedFilter = useCallback(
    (reported: BooleanOptionEnum) => setFilters((f) => ({ ...f, reported })),
    [],
  );

  const onChangeDescriptionFilter = useCallback(
    (description: BooleanOptionEnum) =>
      setFilters((f) => ({ ...f, description })),
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

  return {
    filters,
    filteredQuestions,
    onChangeReportedFilter,
    onChangeDescriptionFilter,
    onChangeLabelFilter,
  };
}

export type UseQuestionTableFiltersOutput = ReturnType<
  typeof useQuestionTableFilters
>;

const reportedFilter = (q: QuestionModel, value: BooleanOptionEnum) => {
  switch (value) {
    case BooleanOptionEnum.TRUE:
      return !q.reported;
    case BooleanOptionEnum.FALSE:
      return q.reported;
    default:
      return true;
  }
};

const descriptionFilter = (q: QuestionModel, value: BooleanOptionEnum) => {
  switch (value) {
    case BooleanOptionEnum.TRUE:
      return !!q.description;
    case BooleanOptionEnum.FALSE:
      return !q.description;
    default:
      return true;
  }
};

const labelFilter = (q: QuestionModel, value: string) => {
  return (
    value.length === 0 || !!q.content.toLowerCase().match(value.toLowerCase())
  );
};
