import { Card, CardContent } from "@/components/ui/card";
import { SectionWrapper } from "./section-wrapper";
import { UserRound, Stethoscope, Building2 } from "lucide-react";

export function WhyItWorksSection() {
  const cards = [
    {
      icon: UserRound,
      title: "For Patients",
      description:
        "It's passive. You get a notification, walk into an outpatient lab, and get your results interpreted in plain language with clear next steps — even without a doctor. No apps to learn, no new habits to build.",
    },
    {
      icon: Stethoscope,
      title: "For Physicians",
      description:
        "Nothing new to learn and no added workload. For diabetes and dyslipidemia screening, no physician is needed in the loop — results are never emergencies, and the clinical guidelines are unambiguous enough for automated interpretation.",
    },
    {
      icon: Building2,
      title: "For the System",
      description:
        "Every early catch is a potential ER visit, hospitalization, or surgery avoided. A less than $10 test can prevent tens of thousands of dollars in future costs per patient, while reducing system strain.",
    },
  ];

  return (
    <div className="bg-surface">
      <SectionWrapper id="why-it-works">
        <h2 className="text-2xl font-semibold text-bc-blue mb-8">Why It Works</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.title} className="border-surface-border bg-white">
              <CardContent className="pt-6">
                <card.icon className="h-8 w-8 text-bc-blue mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
