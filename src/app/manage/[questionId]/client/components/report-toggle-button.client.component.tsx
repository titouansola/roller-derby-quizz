'use client';

import { useState } from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { QuestionModel } from '@internals/common/models/question.model';
import { useToast } from '@internals/common/components/ui/use-toast.hook';
import { toggleReported } from '@internals/common/actions/toggle-reported.server.action';
import { Button } from '@internals/common/components/ui/button.component';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@internals/common/components/ui/alert-dialog.component';
import { toastMessages } from '@internals/common/constants/toast-messages.const';
import { LoadableLabel } from '@internals/common/components/ui/loader.component';

export function ReportToggleButton(props: { question: QuestionModel }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //
  const onClick = () => {
    if (props.question.reported) {
      setOpen(true);
    } else {
      void confirm();
    }
  };
  const onDialogEvent = (confirmation: boolean) => async () => {
    if (confirmation) {
      await confirm();
    }
    setOpen(false);
  };
  const confirm = async () => {
    setLoading(true);
    try {
      await toggleReported(props.question);
      toast(toastMessages.updateQuestionSuccess);
    } catch (_) {
      toast(toastMessages.error);
    } finally {
      setLoading(false);
    }
  };
  //
  return (
    <>
      <Button variant="destructive" onClick={onClick}>
        <ExclamationTriangleIcon className="mr-2" />
        {props.question.reported ? 'Remettre en jeu' : 'Retirer temporairement'}
      </Button>
      {/**/}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ Action dangeureuse</AlertDialogTitle>
            <AlertDialogDescription>
              Confirmez-vous le retour de cette question dans le jeu ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={onDialogEvent(false)}
              disabled={loading}
            >
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDialogEvent(true)} disabled={loading}>
              <LoadableLabel loadingState={loading} idle={'Confirmer'} />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
