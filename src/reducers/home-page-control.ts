"use client";

import {
  INDEX_BY_QUESTIONS,
  QUESTION_BY_INDEX,
  QUESTION_REDUCERS,
} from "@/constants/questions";
import {
  ChangePageControlActionDto,
  ChangePageControlActionPayloadDto,
  ChangePageControlStateDto,
  questionDataDto,
  questionDto,
  questionOptionsDataDto,
  questionOptionsDto,
  updateQuestionsDto,
} from "@/dtos/home-page";
import AwsCloudPractitioner from "../exams/aws-cloud-practitioner.json";
import {
  getArrayLengthByNumber,
  getCorrectAndIncorrectQuestion,
  getCurrentQuestion,
  getUpdatedQuestions,
  hasAnsweredCorrectly,
  randomIntFromInterval,
  resetSelectedOptions,
} from "@/utils/utils";

const {
  SET_SELECTED_EXAM,
  SET_QUESTION_HANDLER,
  DONE_EXAM_HANDLER,
  RESET_EXAM_HANDLER,
} = QUESTION_REDUCERS;

export const INITIAL_HOME_PAGE_STATE: ChangePageControlStateDto = {
  exam: undefined,
  questions: undefined,
  correct: 0,
  incorrect: 0,
  isComplete: false,
  currentQuestion: undefined,
  currentIndex: 0,
};

function mountQuestionOptions(
  questionOptions: questionOptionsDataDto
): questionDataDto[] {
  const copyQuestions = { ...QUESTION_BY_INDEX };

  const optionsData = Object.values(
    questionOptions
  ).reduce<questionOptionsDataDto>(
    (acc: questionOptionsDataDto, currentQuestion: questionDataDto) => {
      const TOTAL_OPTIONS = Object.keys(copyQuestions).length;
      const optionIndex = randomIntFromInterval(0, TOTAL_OPTIONS - 1);
      const alternative = Object.values(copyQuestions)[optionIndex];

      if (!alternative) {
        return acc;
      }

      acc[alternative] = currentQuestion;

      const alternativeId = INDEX_BY_QUESTIONS[alternative];
      delete copyQuestions[alternativeId];

      return acc;
    },
    {
      a: { question: "" },
      b: { question: "" },
      c: { question: "" },
      d: { question: "" },
      e: { question: "" },
    }
  );

  return Object.values(optionsData).filter((option) => option.question);
}

function mountQuestion(exam: questionDto): questionOptionsDto {
  return {
    id: exam.id,
    question: exam.question,
    isMultiple: exam.isMultiple,
    options: mountQuestionOptions(exam.options),
  };
}

function mountQuestions(exam: typeof AwsCloudPractitioner) {
  const TOTAL_QUESTIONS = exam.questions.length;
  let questions = exam.questions;

  const mountedQuestions = getArrayLengthByNumber(TOTAL_QUESTIONS).map(() => {
    const totalQuestions = questions.length;
    const questionIndex = randomIntFromInterval(0, totalQuestions - 1);
    const currentQuestion = questions[questionIndex];

    if (!currentQuestion) {
      return;
    }

    questions = questions.filter(
      (question) => question.id !== currentQuestion.id
    );
    return mountQuestion(currentQuestion);
  });

  return {
    ...INITIAL_HOME_PAGE_STATE,
    exam,
    questions: mountedQuestions,
    currentQuestion: mountedQuestions[0],
  };
}

function updateQuestions(
  options: ChangePageControlStateDto,
  questionOptions: ChangePageControlActionPayloadDto
): updateQuestionsDto {
  if (
    questionOptions.currentQuestion.isMultiple ||
    !questionOptions.currentIndex ||
    !questionOptions.selectedQuestion ||
    !options.questions
  ) {
    return {};
  }

  const currentQuestion = getCurrentQuestion(
    options.questions,
    options.currentQuestion?.id
  );

  if (!currentQuestion) {
    return {};
  }

  resetSelectedOptions(currentQuestion.options);

  const selectedOption = currentQuestion.options[
    questionOptions.selectedQuestion
  ] as questionDataDto;

  selectedOption.selected = true;
  currentQuestion.isCorrect = hasAnsweredCorrectly(
    questionOptions.selectedQuestion,
    currentQuestion
  );

  return {
    ...getCorrectAndIncorrectQuestion(options.questions),
    questions: getUpdatedQuestions(options.questions, currentQuestion),
  };
}

function updateMultipleQuestions(
  options: ChangePageControlStateDto,
  questionOptions: ChangePageControlActionPayloadDto
): updateQuestionsDto {
  if (
    !questionOptions.currentQuestion.isMultiple ||
    !questionOptions.currentIndex ||
    !questionOptions.selectedQuestion?.length ||
    !options.questions
  ) {
    return {};
  }

  const currentQuestion = getCurrentQuestion(
    options.questions,
    options.currentQuestion?.id
  );

  if (!currentQuestion) {
    return {};
  }

  resetSelectedOptions(currentQuestion.options);

  questionOptions.selectedQuestion.forEach((questionIndex) => {
    const selectedOption = currentQuestion.options[
      questionIndex
    ] as questionDataDto;

    selectedOption.selected = true;
  });

  currentQuestion.isCorrect = hasAnsweredCorrectly(
    questionOptions.selectedQuestion,
    currentQuestion
  );

  return {
    ...getCorrectAndIncorrectQuestion(options.questions),
    questions: getUpdatedQuestions(options.questions, currentQuestion),
  };
}

export function changePageControl(
  state: ChangePageControlStateDto,
  action: ChangePageControlActionDto
) {
  switch (action.type) {
    case SET_SELECTED_EXAM:
      return { ...state, ...mountQuestions(action.payload) };
    case SET_QUESTION_HANDLER:
      return {
        ...state,
        ...updateQuestions(state, action.payload),
        ...updateMultipleQuestions(state, action.payload),
        currentQuestion:
          state.questions && state.questions[action.payload.currentIndex],
        currentIndex: action.payload.currentIndex,
      };
    case DONE_EXAM_HANDLER:
      return {
        ...state,
        isComplete: true,
      };
    case RESET_EXAM_HANDLER:
      return INITIAL_HOME_PAGE_STATE;
    default:
      return state;
  }
}
