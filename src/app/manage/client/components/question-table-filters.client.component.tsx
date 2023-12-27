'use client';

import { BooleanOptionEnum } from '@internals/common/constants/boolean-option.enum';
import { UseQuestionTableFiltersOutput } from '@internals/app/manage/client/hooks/use-question-table-filters.hook';
import { Input } from '@internals/common/components/ui/input.component';
import {
  Combobox,
  ComboboxOption,
} from '@internals/common/components/ui/combobox.component';

const reportStatusOptions: ComboboxOption[] = [
  { label: 'Toutes', value: BooleanOptionEnum.ALL },
  { label: 'Valides', value: BooleanOptionEnum.TRUE },
  { label: 'Invalides', value: BooleanOptionEnum.FALSE },
];

const descriptionStatusOptions: ComboboxOption[] = [
  { label: 'Toutes', value: BooleanOptionEnum.ALL },
  { label: 'Oui', value: BooleanOptionEnum.TRUE },
  { label: 'Non', value: BooleanOptionEnum.FALSE },
];

export function QuestionTableFilters(props: UseQuestionTableFiltersOutput) {
  return (
    <>
      <p className="font-bold">Filtres</p>
      <div className="flex gap-5 my-3">
        <div className="flex flex-col gap-1">
          <label>Label :</label>
          <Input
            className="max-w-[300px]"
            placeholder="Chercher une question..."
            onInput={props.onChangeLabelFilter}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Signalement :</label>
          <Combobox
            options={reportStatusOptions}
            selectedValue={props.filters.reported}
            onChange={props.onChangeReportedFilter}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Explications :</label>
          <Combobox
            options={descriptionStatusOptions}
            selectedValue={props.filters.description}
            onChange={props.onChangeDescriptionFilter}
          />
        </div>
      </div>
      <p>
        Affichées : <b>{props.filteredQuestions.length}</b>
      </p>
    </>
  );
}
