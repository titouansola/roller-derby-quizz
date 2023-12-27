import { QuestionModel } from '@internals/common/models/question.model';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@internals/common/components/ui/alert-dialog.component';
import { Button } from '@internals/common/components/ui/button.component';

export function ShowDescriptionModal(props: {
  activated: boolean;
  question: QuestionModel;
}) {
  if (!(props.question.description?.length > 0)) {
    return null;
  }
  //
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={!props.activated}>
          Voir les explications
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>☝️🤓 Explications</AlertDialogTitle>
          <AlertDialogDescription>
            {props.question.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>J&apos;ai compris !</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
