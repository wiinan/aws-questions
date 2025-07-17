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
import { useDoneQuestionCard } from "@/hooks/done-question-card";

export function DoneQuestionCard(options: ChangePageControlStateDto) {
  const { totalCorrectQuestion, totalIncorrectQuestion, percentage, onDone } =
    useDoneQuestionCard(options);

  return (
    <SidebarProvider>
      <Card className="w-full mt-6 card__height">
        <CardHeader>
          <CardTitle>{options.exam?.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 h-full w-full">
          <SidebarComponent {...options} />
          <div className="flex h-full items-center">
            <div>
              <h3>Acertos: {totalCorrectQuestion}</h3>
              <h3>Erros: {totalIncorrectQuestion}</h3>
              <h3>Porcentagem: {percentage}</h3>
            </div>
          </div>
        </CardContent>
        <CardFooter className="items-end justify-end flex">
          <Button onClick={onDone} variant="destructive">
            Inicio
          </Button>
        </CardFooter>
      </Card>
    </SidebarProvider>
  );
}
