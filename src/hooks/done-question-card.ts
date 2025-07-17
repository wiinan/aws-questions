import { QUESTION_REDUCERS } from "@/constants/questions";
import { useHomePageControlContext } from "@/contexts/home-control";
import { ChangePageControlStateDto } from "@/dtos/home-page";

export function useDoneQuestionCard(options: ChangePageControlStateDto) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dispatch } = useHomePageControlContext() as any;

  const totalCorrectQuestion = options.correct ? options.correct / 2 : 0;
  const totalIncorrectQuestion = options.incorrect ? options.incorrect / 2 : 0;
  const percentage =
    (totalCorrectQuestion / (options.questions?.length || 0)) * 100;

  const onDone = () => {
    dispatch({ type: QUESTION_REDUCERS.RESET_EXAM_HANDLER });
  };

  return { totalCorrectQuestion, totalIncorrectQuestion, percentage, onDone };
}
