import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidemenuDto } from "@/dtos/home-page";
import { useSidebarComponent } from "@/hooks/use-sidebar";

export function SidebarComponent({
  isComplete,
  questions,
  currentQuestion,
  setSelectedQuestion,
}: SidemenuDto) {
  const { setQuestionHandler, getClassButton } =
    useSidebarComponent(setSelectedQuestion);

  return (
    <Sidebar collapsible="none" className="sidebar__height">
      <SidebarContent>
        <SidebarMenu>
          {questions?.map((question, index) => (
            <SidebarMenuItem
              onClick={() => !isComplete && setQuestionHandler(index)}
              className={`${getClassButton(
                question,
                currentQuestion?.id,
                isComplete
              )}`}
              key={index}
            >
              <SidebarMenuButton asChild>
                <span className="cursor-pointer h-full">{question.question}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
