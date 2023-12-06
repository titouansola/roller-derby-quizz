import getQuestions from '../lib/get-questions.request';
import QuestionAndAnswers from './question-and-answers.component';

export default async function QuizzRunner() {
  const questions = await getQuestions();
  return <QuestionAndAnswers questions={questions} />;
}
