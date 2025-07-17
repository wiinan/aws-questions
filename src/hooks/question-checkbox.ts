import { questionComponentOptionsDto } from "@/dtos/home-page";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect } from "react";

export function useQuestionCheckbox({
  currentQuestion,
  selectedQuestion,
  setSelectedQuestion,
}: questionComponentOptionsDto) {
  const selectedQuestionsIndex: string[] = [];

  currentQuestion?.options.forEach(
    (option, index) =>
      option.selected && selectedQuestionsIndex.push(index.toString())
  );

  useEffect(() => {
    if (!selectedQuestion) {
      setSelectedQuestion(selectedQuestionsIndex);
    }
  }, []);

  const setSelectedCheckboxQuestion = (isChecked: CheckedState, id: string) => {
    setSelectedQuestion((prevState) => {
      console.log(prevState);
      if (typeof prevState !== "object") {
        return;
      }

      if (isChecked) {
        return [...prevState, id];
      }

      return prevState.filter((value) => value !== id);
    });
  };

  return { setSelectedCheckboxQuestion };
}
