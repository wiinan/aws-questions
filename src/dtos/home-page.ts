import { Dispatch, SetStateAction } from "react";
import AwsCloudPractitioner from "../exams/aws-cloud-practitioner.json";

export type questionDataDto = {
  question: string;
  correct?: boolean;
  selected?: boolean;
};

export type questionOptionsDataDto = {
  a: questionDataDto;
  b: questionDataDto;
  c: questionDataDto;
  d: questionDataDto;
  e?: questionDataDto;
};

export type questionDto = {
  id: number;
  question: string;
  isMultiple: boolean;
  options: questionOptionsDataDto;
};

export type questionOptionsDto = {
  id: number;
  question: string;
  isMultiple: boolean;
  isCorrect?: boolean;
  options: questionDataDto[];
};

export type updateQuestionsDto = {
  correct?: number;
  incorrect?: number;
  questions?: Array<questionOptionsDto>;
};

export type ChangePageControlStateDto = {
  exam?: typeof AwsCloudPractitioner;
  isComplete: boolean;
  questions?: Array<questionOptionsDto>;
  currentQuestion?: questionOptionsDto;
  currentIndex: number;
} & updateQuestionsDto;

export type questionComponentOptionsDto = {
  currentQuestion?: questionOptionsDto,
  selectedQuestion: string | undefined,
  setSelectedQuestion: Dispatch<SetStateAction<string | string[] | undefined>>;,
};

export type SidemenuDto = {
  isComplete?: boolean;
  questions?: Array<questionOptionsDto>;
  currentQuestion?: questionOptionsDto;
  setSelectedQuestion?: Dispatch<SetStateAction<string | undefined>>;
};

export type ChangePageControlActionPayloadDto = {
  currentIndex: number;
  selectedQuestion: string | string[];
  currentQuestion: questionOptionsDto;
};

export type ChangePageControlActionDto = {
  type: "SET_SELECTED_EXAM" | "SET_QUESTION_HANDLER";
  payload: typeof AwsCloudPractitioner & ChangePageControlActionPayloadDto;
} & ChangePageControlActionPayloadDto;
