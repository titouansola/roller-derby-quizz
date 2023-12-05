import QuestionAndAnswers from './question-and-answers.component';
// import { sql } from '@vercel/postgres';

export default async function QuizzRunner() {
  // const { rows } = await sql``;

  return (
    <QuestionAndAnswers
      question={{
        id: 'qid1',
        content: 'Question ?',
        answers: [{ id: '1', content: 'Réponse 1' }],
      }}
    />
  );
}
