'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateQuizz() {
  revalidatePath('/quizz');
}
