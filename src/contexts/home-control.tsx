"use client"

import { INITIAL_HOME_PAGE_STATE } from "@/reducers/home-page-control";
import { createContext, useContext } from "react";

export const HomePageControlContext = createContext(INITIAL_HOME_PAGE_STATE);

export function useHomePageControlContext() {
  return useContext(HomePageControlContext);
}
