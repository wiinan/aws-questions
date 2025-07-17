import { Checkbox } from "@/components/ui/checkbox";
import { questionComponentOptionsDto } from "@/dtos/home-page";
import { useQuestionCheckbox } from "@/hooks/question-checkbox";
import { Label } from "@radix-ui/react-label";

export function QuestionCheckboxComponent(
  options: questionComponentOptionsDto
) {
  const { setSelectedCheckboxQuestion } = useQuestionCheckbox(options);

  return (
    <div className="col-span-2">
      <Label className="font-semibold">
        {options.currentQuestion?.question}
      </Label>
      <div className="flex h-full items-center">
        <div>
          {options.currentQuestion?.options.map((option, index) => {
            const id = index.toString();

            return (
              <div key={id} className="flex items-center gap-3">
                <Checkbox
                  onCheckedChange={(checked) =>
                    setSelectedCheckboxQuestion(checked, id)
                  }
                  checked={options.selectedQuestion?.includes(id)}
                />
                <Label htmlFor={id}>{option.question}</Label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
