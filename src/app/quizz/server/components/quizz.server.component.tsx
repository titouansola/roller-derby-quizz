import Link from 'next/link';
import { RouteEnum } from '@internals/common/constants/route.enum';
import { Runner } from '@internals/app/quizz/client/components/runner.client.component';
import { Button } from '@internals/common/components/ui/button.component';
import { getQuestionsWithAnswers } from '@internals/common/requests/questions.request';

export async function Quizz() {
  const questions = (await getQuestionsWithAnswers())
    // Shuffle
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    // Select only 40
    .slice(0, 40);

  if (!(questions?.length > 0)) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <p>Oh non, il n&apos;y a pas encore de question disponible :(</p>
        <Link href={RouteEnum.ADD_QUESTION}>
          <Button>Ajouter des questions</Button>
        </Link>
      </div>
    );
  }

  return <Runner questions={questions} />;
}
