import { Button } from '@internals/components/ui/button.component';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className={'text-xl font-bold'}>Les MS Théoriques faciles</h1>
      <p className={'text-sm text-center'}>
        Site communautaire de travail sur les règles du Roller Derby
      </p>
      <div className={'mt-8 text-center'}>
        <p className={'mb-3'}>Je suis un.e joueur.se confirmé.e :</p>
        <Link href={'/add'}>
          <Button>J&apos;ajoute des questions</Button>
        </Link>
      </div>
      <div className={'mt-8 text-center'}>
        <p className={'mb-3'}>Je suis un.e simple Fresh Meat :</p>
        <Link href={'/quizz'}>
          <Button>Je me teste</Button>
        </Link>
      </div>
    </>
  );
}
