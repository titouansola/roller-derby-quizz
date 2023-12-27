import { Quizz } from '@internals/app/quizz/server/components/quizz.server.component';

export const revalidate = 1;

export default async function QuizzPage() {
  return <Quizz />;
}
