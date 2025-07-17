import { questionComponentOptionsDto } from "@/dtos/home-page";
import { useEffect } from "react";

export function useQuestionRadio({
  currentQuestion,
  selectedQuestion,
  setSelectedQuestion,
}: questionComponentOptionsDto) {
  const questionIndex = currentQuestion?.options.findIndex(
    (option) => option.selected
  );
  const selectedQuestionIndex =
    questionIndex && questionIndex >= 0 ? questionIndex.toString() : undefined;

  useEffect(() => {
    if (selectedQuestionIndex && !selectedQuestion) {
      setSelectedQuestion(selectedQuestionIndex);
    }
  }, []);
}
