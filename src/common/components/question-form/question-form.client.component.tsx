'use client';

import { PropsWithChildren } from 'react';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Input } from '@internals/common/components/ui/input.component';
import { Checkbox } from '@internals/common/components/ui/checkbox.component';
import { Label } from '@internals/common/components/ui/label.component';
import { Button } from '@internals/common/components/ui/button.component';
import { Textarea } from '@internals/common/components/ui/textarea-component';
import { UseQuestionFormOutput } from '@internals/common/components/question-form/use-question-form.hook';
import { LoadableLabel } from '@internals/common/components/ui/loader.component';

export function QuestionFormWrapper(
  props: PropsWithChildren<UseQuestionFormOutput>,
) {
  return <form onSubmit={props.onSubmit}>{props.children}</form>;
}

export function QuestionFormDescription() {
  return (
    <>
      Règles à suivre pour l&apos;ajout de questions et réponses :
      <br />* La langue doit être le <b>Français</b> (pour le moment)
      <br />
      * Assure-toi que tes bonnes réponses le sont effectivement !
      <br />* Ici on parle de <b>Roller Derby</b>, et uniquement de&nbsp;
      <b>Roller Derby</b> !
      <br />* <b>Aucun</b> discours haineux, discriminant ou insultant
      n&apos;est toléré et sera <b>supprimé</b>.
    </>
  );
}

export function QuestionFormContent(props: UseQuestionFormOutput) {
  return (
    <div className="grow max-w-2xl">
      <div className="mb-8">
        <label htmlFor="question">Question :</label>
        <Textarea
          id="question"
          value={props.question.content}
          onInput={props.onQuestionInput}
          required
        />
      </div>
      <div>
        <label>Réponses :</label>
        <div className="flex flex-col gap-8">
          {props.answers.map((answer, index) => (
            <div
              className="flex flex-col gap-2 pb-4 border-border border-b last:border-b-0"
              key={index}
            >
              <Input
                value={answer.content}
                onInput={props.onAnswerInput(index)}
                required
              />
              <div className="flex gap-6">
                <div className="flex items-center space-x-2 grow">
                  <Checkbox
                    id={index + '-checkbox'}
                    checked={answer.isRight}
                    onCheckedChange={props.onAnswerIsRightChange(index)}
                  />
                  <Label htmlFor={index + '-checkbox'}>Bonne réponse</Label>
                </div>
                <Button
                  variant="destructive"
                  onClick={props.onRemoveAnswer(index)}
                >
                  <TrashIcon className="mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-8" onClick={props.onAddAnswer}>
          <PlusIcon className="mr-2" />
          Ajouter une réponse
        </Button>
      </div>
    </div>
  );
}

export function QuestionFormFooter(props: UseQuestionFormOutput) {
  return (
    <Button type={'submit'} disabled={!props.isValid || props.loading}>
      <LoadableLabel loadingState={props.loading} idle={'Valider'} />
    </Button>
  );
}
