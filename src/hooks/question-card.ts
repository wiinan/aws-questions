/* eslint-disable @typescript-eslint/no-explicit-any */
import { QUESTION_REDUCERS } from "@/constants/questions";
import { useHomePageControlContext } from "@/contexts/home-control";
import { questionOptionsDto } from "@/dtos/home-page";
import { useState } from "react";

export function useQuestionCard(currentQuestion?: questionOptionsDto) {
  const [selectedQuestion, setSelectedQuestion] = useState<any | undefined>();

  const { dispatch } = useHomePageControlContext() as any;

  const setQuestionHandler = (index: number) => {
    dispatch({
      type: QUESTION_REDUCERS.SET_QUESTION_HANDLER,
      payload: { currentIndex: index, selectedQuestion, currentQuestion },
    });

    setSelectedQuestion(undefined);
  };

  const doneExam = (index: number) => {
    if (setQuestionHandler) {
      setQuestionHandler(index);
    }

    dispatch({ type: QUESTION_REDUCERS.DONE_EXAM_HANDLER });
  };

  return {
    doneExam,
    selectedQuestion,
    setSelectedQuestion,
    setQuestionHandler,
  };
}
