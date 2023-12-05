'use client';

import { useState } from 'react';
import { AnswerModel } from '../models/answer.model';

export default function Answers(props: { answers: AnswerModel[] }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  return (
    <>
      <ul>
        {props.answers.map((answer) => (
          <li key={answer.id} onClick={() => setSelectedAnswer(answer.id)}>
            {answer.content}
          </li>
        ))}
      </ul>
      <button>Valider</button>
    </>
  );
}
