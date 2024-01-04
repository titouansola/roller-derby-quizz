import { QuestionCreationDto } from '@internals/common/models/question.model';
import { AnswerCreationDto } from '@internals/common/models/answer.model';

export function questionControls(question: QuestionCreationDto) {
  return question?.content?.length > 0;
}

export function answersControls(answers: AnswerCreationDto[]) {
  return (
    answers?.length > 1 &&
    answers.every(({ content }) => content.length > 0) &&
    answers.some(({ isRight }) => isRight)
  );
}
