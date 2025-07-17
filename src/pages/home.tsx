"use client";

import { useHome } from "@/hooks/home";
import { HomeCard } from "./home-card";
import { QuestionCard } from "./question-card";

import "./card.css";
import { DoneQuestionCard } from "./done-question-card";

export function HomePage() {
  const { state } = useHome();
  console.log(state)

  return (
    <>
      <div className="p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          AWS Questions
        </h3>
        {!state?.exam && <HomeCard />}
        {state?.exam && !state.isComplete && <QuestionCard {...state} />}
        {state?.exam && state.isComplete && <DoneQuestionCard {...state} />}
      </div>
    </>
  );
}
