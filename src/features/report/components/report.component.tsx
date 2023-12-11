'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@internals/components/ui/alert-dialog.component';
import { Button } from '@internals/components/ui/button.component';
import { useQuestionsStore } from '@internals/features/quizz/stores/questions.store';
import { reportQuestion } from '../lib/report-question.request';

export default function Report() {
  const question = useQuestionsStore((s) => s.currentQuestion);
  const removeQuestion = useQuestionsStore((s) => s.removeCurrent);
  const nextQuestion = useQuestionsStore((s) => s.next);
  //
  const onConfirm = async () => {
    await reportQuestion(question!);
    removeQuestion();
    nextQuestion();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <ExclamationTriangleIcon className="mr-2" />
          Signaler une erreur pour cette question
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Cette question est problématique ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Elle sera analysée et supprimée{' '}
            <b>si nous identifions effectivement un problème.</b>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm}>Je confirme</AlertDialogAction>
          <AlertDialogCancel>Retour</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
