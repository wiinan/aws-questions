"use client";

import { useHomePageControlContext } from "@/contexts/home-control";
import AwsCloudPractitioner from "../exams/aws-cloud-practitioner.json";
import { QUESTION_REDUCERS } from "@/constants/questions";

export function useHomeCard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dispatch } = useHomePageControlContext() as any;

  const onSelectExam = (exam: typeof AwsCloudPractitioner) => {
    dispatch({ type: QUESTION_REDUCERS.SET_SELECTED_EXAM, payload: exam });
  };

  return {
    AwsCloudPractitioner,
    onSelectExam,
  };
}
