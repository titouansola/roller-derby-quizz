import { Toast } from '@internals/common/components/ui/use-toast.hook';

type ToastMessageKeys =
  | 'updateQuestionSuccess'
  | 'deleteQuestionSuccess'
  | 'error';

export const toastMessages: { [key in ToastMessageKeys]: Toast } = {
  updateQuestionSuccess: {
    title: 'Question enregistrée',
    description: 'La question a bien été mise à jour !',
    variant: 'success',
  },
  deleteQuestionSuccess: {
    title: 'Question supprimée',
    description: 'La question a bien été supprimée.',
    variant: 'success',
  },
  error: {
    title: 'Oops !',
    description: 'Une erreur est survenue, réessaye plus tard.',
    variant: 'destructive',
  },
};
