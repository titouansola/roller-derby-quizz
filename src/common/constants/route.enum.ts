export enum RouteEnum {
  HOME = '/',
  QUIZZ = '/quizz',
  ADD_QUESTION = '/add-question',
  MANAGE = '/manage',
}

export const ROUTE_LIST = [
  { href: RouteEnum.HOME, label: 'Accueil' },
  { href: RouteEnum.QUIZZ, label: 'Répondre au quizz' },
  { href: RouteEnum.ADD_QUESTION, label: 'Proposer une question' },
];
