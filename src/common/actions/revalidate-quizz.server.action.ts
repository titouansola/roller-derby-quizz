'use server';

import { revalidatePath } from 'next/cache';
import { RouteEnum } from '@internals/common/constants/route.enum';

export async function revalidateQuizz(questionId?: string) {
  revalidatePath(RouteEnum.QUIZZ);
  revalidatePath(RouteEnum.MANAGE);
  if (!!questionId) {
    revalidatePath(`${RouteEnum.MANAGE}/${questionId}`);
  }
}
