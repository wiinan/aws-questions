"use client";

import { HomePageControlContext } from "@/contexts/home-control";
import { HomePage } from "@/pages/home";
import {
  changePageControl,
  INITIAL_HOME_PAGE_STATE,
} from "@/reducers/home-page-control";
import { useReducer } from "react";

export default function Home() {
  const [state, dispatch] = useReducer(
    changePageControl,
    INITIAL_HOME_PAGE_STATE
  );

  return (
    <HomePageControlContext.Provider value={{ state, dispatch }}>
      <HomePage />
    </HomePageControlContext.Provider>
  );
}
