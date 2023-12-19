import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@internals/common/components/ui/dialog.component';
import { useQuestionForm } from '@internals/common/components/question-form/use-question-form.hook';
import { FullQuestionModel } from '@internals/common/models/question.model';
import {
  QuestionFormContent,
  QuestionFormDescription,
  QuestionFormFooter,
  QuestionFormWrapper,
} from '@internals/common/components/question-form/question-form.client.component';
import { Button } from '@internals/common/components/ui/button.component';
import { Pencil2Icon } from '@radix-ui/react-icons';

export function ModifyQuestionModal(props: {
  question: FullQuestionModel;
  onSubmit: () => void;
}) {
  const [open, setOpen] = useState(false);
  const service = useQuestionForm(() => {
    setOpen(false);
    props.onSubmit();
  }, props.question);
  //
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pencil2Icon className="mr-2" />
          Modifier la question
        </Button>
      </DialogTrigger>
      <DialogContent>
        <QuestionFormWrapper {...service}>
          <DialogHeader>
            <DialogTitle>Modifier une question</DialogTitle>
          </DialogHeader>
          <p>
            <QuestionFormDescription />
          </p>
          <QuestionFormContent {...service} />
          <DialogFooter>
            <QuestionFormFooter {...service} />
          </DialogFooter>
        </QuestionFormWrapper>
      </DialogContent>
    </Dialog>
  );
}
