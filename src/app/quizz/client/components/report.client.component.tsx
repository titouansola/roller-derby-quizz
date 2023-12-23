import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { QuestionModel } from '@internals/common/models/question.model';
import { useToast } from '@internals/common/components/ui/use-toast.hook';
import { toggleReported } from '@internals/common/actions/toggle-reported.server.action';
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
import { toastMessages } from '@internals/common/constants/toast-messages.const';

export function Report(props: {
  question: QuestionModel;
  nextQuestion: () => void;
}) {
  const { toast } = useToast();
  const onConfirm = async () => {
    try {
      await toggleReported(props.question);
      toast({
        title: 'Question signalée',
        description: 'La précédente question a bien été signalée !',
        variant: 'success',
      });
      props.nextQuestion();
    } catch (_) {
      toast(toastMessages.error);
    }
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
          <AlertDialogCancel>Retour</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Je confirme</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
