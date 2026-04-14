import { SectionWrapper } from "./section-wrapper";
import { Target, CheckCircle, Sprout, Zap } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "The most impactful",
    description:
      "It targets a root cause of system stress — unscreened chronic disease — not just a symptom.",
  },
  {
    icon: CheckCircle,
    title: "The most realistic",
    description:
      "It doesn't require new infrastructure, new physician workflows, or new patient behavior. The model is already proven with BC Cancer Screening.",
  },
  {
    icon: Sprout,
    title: "A genuine low-hanging fruit",
    description:
      "The tests are cheap. The guidelines are clear. The labs already exist in every community. The registry data to identify overdue patients already exists.",
  },
  {
    icon: Zap,
    title: "Actionable today",
    description:
      "There's a clear path from pilot to province-wide implementation. No moonshot technology required.",
  },
];

export function WhyThisIdeaSection() {
  return (
    <div className="bg-surface">
      <SectionWrapper id="why-this-idea">
        <h2 className="text-2xl font-semibold text-bc-blue mb-3">
          Why This Idea
        </h2>
        <p className="text-text-secondary leading-relaxed mb-8">
          We evaluated over 30 ideas with input from multiple physicians. The
          healthcare system is under strain for many reasons — but one of the most
          tangible, actionable levers is early intervention for chronic disease. We
          picked ScreenBC because it was:
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex gap-4">
              <reason.icon className="h-6 w-6 text-bc-blue shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  {reason.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
