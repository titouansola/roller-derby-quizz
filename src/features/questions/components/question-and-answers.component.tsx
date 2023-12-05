import { QuestionModel } from '../models/question.model';
import Answers from './answers.component';

export default function QuestionAndAnswers(props: { question: QuestionModel }) {
  return (
    <div>
      <h2>Question ?</h2>
      <Answers answers={props.question.answers} />
    </div>
  );
}
