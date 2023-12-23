import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { RouteEnum } from '@internals/common/constants/route.enum';
import { revalidateQuizz } from '@internals/common/actions/revalidate-quizz.server.action';

export function EndModal(props: {
  score: number;
  total: number;
  reset: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const retry = async () => {
    props.reset();
    await revalidateQuizz();
    router.refresh();
  };
  const quit = () => router.push(RouteEnum.HOME);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>🎉 Fin du Jam 🎉</AlertDialogTitle>
          <AlertDialogDescription>
            Tu as obtenu un score de{' '}
            <b>
              {props.score} / {props.total}
            </b>
            .
            <br />
            Continues comme ça !
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={quit}>Quitter</AlertDialogCancel>
          <AlertDialogAction onClick={retry}>Recommencer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
