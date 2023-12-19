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
} from '@internals/common/components/ui/alert-dialog.component';
import { Button } from '@internals/common/components/ui/button.component';
import { useToast } from '@internals/common/components/ui/use-toast.hook';
import { QuestionModel } from '@internals/common/models/question.model';
import { reportQuestion } from '@internals/app/quizz/server/actions/report-question.server.action';

export function Report(props: {
  question: QuestionModel;
  nextQuestion: () => void;
}) {
  const { toast } = useToast();
  const onConfirm = async () => {
    await reportQuestion(props.question);
    toast({
      title: 'Question signalée',
      description: 'La précédente question a bien été signalée !',
      variant: 'success',
    });
    props.nextQuestion();
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
