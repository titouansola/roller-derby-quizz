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
        <Button
          variant="ghost"
          className="mx-auto mt-10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          size="sm"
        >
          <ExclamationTriangleIcon className="mr-2" />
          Signaler un problème
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
          <AlertDialogCancel>Retour</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Je confirme</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
