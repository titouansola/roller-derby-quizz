'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrashIcon } from '@radix-ui/react-icons';
import { RouteEnum } from '@internals/common/constants/route.enum';
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
} from '@internals/common/components/ui/alert-dialog.component';
import { Button } from '@internals/common/components/ui/button.component';
import { LoadableLabel } from '@internals/common/components/ui/loader.component';
import { deleteQuestion } from '@internals/common/actions/delete-question.server.action';
import { toast } from '@internals/common/components/ui/use-toast.hook';
import { toastMessages } from '@internals/common/constants/toast-messages.const';

export function DeleteQuestionModal(props: { questionId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    try {
      await deleteQuestion(props.questionId);
      router.push(RouteEnum.MANAGE);
      toast(toastMessages.deleteQuestionSuccess);
    } catch (_) {
      toast(toastMessages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <TrashIcon className="mr-2" />
          Supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>🚮 Supprimer la question</AlertDialogTitle>
          <AlertDialogDescription>
            Voulez-vous vraiment supprimer cette question ?
            <br />
            <b>⚠️ Cette action est définitive et irréversible.</b>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            <LoadableLabel loadingState={loading} idle={'Confirmer'} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
