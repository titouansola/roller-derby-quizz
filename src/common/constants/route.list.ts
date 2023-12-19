export enum RouteList {
  HOME = '/',
  QUIZZ = '/quizz',
  ADD_QUESTION = '/add-question',
}

export const ROUTE_LIST = [
  { href: RouteList.HOME, label: 'Accueil' },
  { href: RouteList.QUIZZ, label: 'Répondre au quizz' },
  { href: RouteList.ADD_QUESTION, label: 'Proposer une question' },
];
