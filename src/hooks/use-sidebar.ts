import { QUESTION_REDUCERS } from "@/constants/questions";
import { useHomePageControlContext } from "@/contexts/home-control";
import { questionOptionsDto } from "@/dtos/home-page";
import { Dispatch, SetStateAction } from "react";

export function useSidebarComponent(
  setSelectedQuestion?: Dispatch<SetStateAction<string | undefined>>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dispatch } = useHomePageControlContext() as any;

  const setQuestionHandler = (index: number) => {
    dispatch({
      type: QUESTION_REDUCERS.SET_QUESTION_HANDLER,
      payload: { currentIndex: index },
    });

    if (setSelectedQuestion) {
      setSelectedQuestion(undefined);
    }
  };

  const getClassButton = (
    currentQuestion?: questionOptionsDto,
    questionId?: number,
    isComplete?: boolean
  ): string => {
    if (isComplete && currentQuestion?.isCorrect) {
      return "bg-green-700 rounded-md";
    }

    if (isComplete && !currentQuestion?.isCorrect) {
      return "bg-red-700 rounded-md";
    }

    if (currentQuestion?.id === questionId) {
      return "bg-gray-700 rounded-md";
    }

    return "";
  };

  return { setQuestionHandler, getClassButton };
}
