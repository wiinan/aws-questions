"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChangePageControlStateDto } from "@/dtos/home-page";
import { SidebarComponent } from "./sidebar";

import { Button } from "@/components/ui/button";
import { useQuestionCard } from "@/hooks/question-card";
import { QuestionRadioComponent } from "./question-radio-component";
import { QuestionCheckboxComponent } from "./question-checkbox-component";

export function QuestionCard(options: ChangePageControlStateDto) {
  const {
    doneExam,
    selectedQuestion,
    setSelectedQuestion,
    setQuestionHandler,
  } = useQuestionCard(options.currentQuestion);
  const isLastQuestion = options.questions?.length === options.currentIndex + 1;

  return (
    <SidebarProvider>
      <Card className="w-full mt-6 card__height">
        <CardHeader>
          <CardTitle>{options.exam?.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 h-full w-full">
          <SidebarComponent
            questions={options.questions}
            currentQuestion={options.currentQuestion}
            setSelectedQuestion={setSelectedQuestion}
          />
          {options.currentQuestion?.isMultiple ? (
            <QuestionCheckboxComponent
              currentQuestion={options.currentQuestion}
              setSelectedQuestion={setSelectedQuestion}
              selectedQuestion={selectedQuestion}
            />
          ) : (
            <QuestionRadioComponent
              currentQuestion={options.currentQuestion}
              setSelectedQuestion={setSelectedQuestion}
              selectedQuestion={selectedQuestion}
            />
          )}
        </CardContent>
        <CardFooter className="items-end justify-end flex">
          <Button
            onClick={() => doneExam(options.currentIndex - 1)}
            variant="destructive"
          >
            Finalizar Teste
          </Button>
          <Button
            variant="outline"
            disabled={!options.currentIndex}
            className="ml-3"
            onClick={() => setQuestionHandler(options.currentIndex - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            className="ml-3"
            disabled={isLastQuestion || !selectedQuestion}
            onClick={() => setQuestionHandler(options.currentIndex + 1)}
          >
            Proximo
          </Button>
        </CardFooter>
      </Card>
    </SidebarProvider>
  );
}
