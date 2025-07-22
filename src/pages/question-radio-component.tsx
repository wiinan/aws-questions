import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { questionComponentOptionsDto } from "@/dtos/home-page";
import { useQuestionRadio } from "@/hooks/question-radio";

export function QuestionRadioComponent(options: questionComponentOptionsDto) {
  useQuestionRadio(options);

  return (
    <div className="col-span-2">
      <Label className="font-semibold text-xl">
        {options.currentIndex + 1} - {options.currentQuestion?.question}
      </Label>
      <div className="flex h-full items-center">
        <RadioGroup onValueChange={(e) => options.setSelectedQuestion(e)}>
          {options.currentQuestion?.options.map((option, index) => {
            const id = index.toString();

            return (
              <div key={index} className="flex items-center grap-3">
                <RadioGroupItem
                  checked={options.selectedQuestion === id}
                  value={id}
                  id={id}
                />
                <Label className="ml-3" htmlFor={id}>
                  {option.question}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
