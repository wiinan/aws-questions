import { questionDataDto, questionOptionsDto } from "@/dtos/home-page";
import { faker } from "@faker-js/faker";

export function randomIntFromInterval(min: number, max: number): number {
  return faker.number.int({ min, max })
}

export function getArrayLengthByNumber(int: number) {
  return Array.from(Array(int).keys());
}

export function getCorrectAndIncorrectQuestion(
  questions: Array<questionOptionsDto>
) {
  return questions.reduce<{
    correct: number;
    incorrect: number;
  }>(
    (acc, question) => {
      const questionProp = question.isCorrect ? "correct" : "incorrect";
      acc[questionProp] = acc[questionProp] + 1;

      return acc;
    },
    {
      correct: 0,
      incorrect: 0,
    }
  );
}

export function getCurrentQuestion(
  questions: questionOptionsDto[],
  currentQuestionId?: number
): questionOptionsDto | undefined {
  return questions.find((question) => question.id === currentQuestionId);
}

export function resetSelectedOptions(options: questionDataDto[]): void {
  options.forEach((option) => (option.selected = false));
}

export function getUpdatedQuestions(
  questions: questionOptionsDto[],
  currentQuestion: questionOptionsDto
) {
  return questions.reduce<questionOptionsDto[]>((acc, question) => {
    if (question.id === currentQuestion.id) {
      acc.push(currentQuestion);
    } else {
      acc.push(question);
    }

    return acc;
  }, []);
}

export function hasAnsweredCorrectly(
  selectedQuestion: string | string[],
  currentQuestion: questionOptionsDto
): boolean {
  if (typeof selectedQuestion === "string") {
    const selectedOption = currentQuestion.options[
      selectedQuestion
    ] as questionDataDto;
    return !!selectedOption.correct;
  }

  return selectedQuestion.every((questionIndex) => {
    const selectedOption = currentQuestion.options[
      questionIndex
    ] as questionDataDto;

    return selectedOption.correct;
  });
}
