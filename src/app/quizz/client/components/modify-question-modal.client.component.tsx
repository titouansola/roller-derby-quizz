'use client';

import { useState } from 'react';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { FullQuestionModel } from '@internals/common/models/question.model';
import { useQuestionForm } from '@internals/common/components/question-form/use-question-form.hook';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@internals/common/components/ui/dialog.component';
import {
  QuestionFormContent,
  QuestionFormDescription,
  QuestionFormFooter,
  QuestionFormWrapper,
} from '@internals/common/components/question-form/question-form.client.component';
import { Button } from '@internals/common/components/ui/button.component';

export function ModifyQuestionModal(props: {
  question: FullQuestionModel;
  disabled?: boolean;
  onSubmit?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const service = useQuestionForm(() => {
    setOpen(false);
    props.onSubmit?.();
  }, props.question);
  //
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={props.disabled || false}>
          <Pencil2Icon className="mr-2" />
          Modifier la question
        </Button>
      </DialogTrigger>
      <DialogContent>
        <QuestionFormWrapper {...service}>
          <DialogHeader>
            <DialogTitle>✍️ Modifier une question</DialogTitle>
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
