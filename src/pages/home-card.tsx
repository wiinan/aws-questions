"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHomeCard } from "@/hooks/home-card";

export function HomeCard() {
  const { AwsCloudPractitioner, onSelectExam } = useHomeCard();

  return (
    <Card className="w-full mt-6 card__height">
      <CardHeader>
        <CardTitle>Selecione um dos exames:</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center h-full items-center">
        <Button
          onClick={() => onSelectExam(AwsCloudPractitioner)}
          variant={"outline"}
        >
          Aws Cloud Practitioner
        </Button>
      </CardContent>
    </Card>
  );
}
