"use client";

import { useHomePageControlContext } from "@/contexts/home-control";
import AwsCloudPractitioner from "../exams/aws-cloud-practitioner.json";

export function useHome() {
  const { state } = useHomePageControlContext();

  return {
    AwsCloudPractitioner,
    state,
  };
}
