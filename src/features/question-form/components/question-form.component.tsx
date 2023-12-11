'use client';

import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Input } from '@internals/components/ui/input.component';
import { Checkbox } from '@internals/components/ui/checkbox.component';
import { Label } from '@internals/components/ui/label.component';
import { Button } from '@internals/components/ui/button.component';
import useQuestionForm from '../hooks/useQuestionForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@internals/components/ui/card.component';

export default function QuestionForm() {
  const {
    question,
    answers,
    onQuestionInput,
    onAnswerInput,
    onAnswerIsRightChange,
    onAddAnswer,
    onRemoveAnswer,
    onSubmit,
    isValid,
  } = useQuestionForm();

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Proposer une question</CardTitle>
          <CardDescription>
            Règles à suivre pour l&apos;ajout de questions et réponses :
            <br />* La langue doit être le <b>Français</b> (pour le moment)
            <br />
            * Assure-toi que tes bonnes réponses le sont effectivement !
            <br />* Ici on parle de <b>Roller Derby</b>, et uniquement de&nbsp;
            <b>Roller Derby</b> !
            <br />* <b>Aucun</b> discours haineux, discriminant ou insultant
            n&apos;est toléré et sera <b>supprimé</b>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grow max-w-2xl">
            <div className="mb-8">
              <label htmlFor="question">Question :</label>
              <Input
                id="question"
                value={question.content}
                onInput={onQuestionInput}
                maxLength={255}
                required
              />
            </div>
            <div>
              <label>Réponses :</label>
              <div className="flex flex-col gap-8">
                {answers.map((answer, index) => (
                  <div
                    className="flex flex-col gap-2 pb-4 border-border border-b last:border-b-0"
                    key={index}
                  >
                    <Input
                      value={answer.content}
                      onInput={onAnswerInput(index)}
                      maxLength={255}
                      required
                    />
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2 grow">
                        <Checkbox
                          id={index + '-checkbox'}
                          checked={answer.isRight}
                          onCheckedChange={onAnswerIsRightChange(index)}
                        />
                        <Label htmlFor={index + '-checkbox'}>
                          Bonne réponse
                        </Label>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={onRemoveAnswer(index)}
                      >
                        <TrashIcon className="mr-2" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-8" onClick={onAddAnswer}>
                <PlusIcon className="mr-2" />
                Ajouter une réponse
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type={'submit'} disabled={!isValid}>
            Valider
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
