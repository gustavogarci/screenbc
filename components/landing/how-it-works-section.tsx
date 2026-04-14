import { SectionWrapper } from "./section-wrapper";
import { Search, Bell, ClipboardCheck, TestTube, Brain, MapPin } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Identify",
    description:
      "The system uses provincial health registry data to identify patients who are overdue for preventive screening.",
  },
  {
    icon: Bell,
    title: "Notify",
    description:
      'The patient receives an email or text: "You may be due for preventive health screening."',
  },
  {
    icon: ClipboardCheck,
    title: "Enroll",
    description:
      "The patient logs in via BC Services Card, reviews consent, and optionally fills out a brief health questionnaire.",
  },
  {
    icon: TestTube,
    title: "Screen",
    description:
      "The patient receives a lab requisition and takes it to any outpatient lab. Standard blood tests: HbA1c and lipid panel.",
  },
  {
    icon: Brain,
    title: "Interpret",
    description:
      "Results are interpreted using AI grounded in Canadian clinical guidelines. Each result is categorized as Normal, Borderline, or Needs Attention.",
  },
  {
    icon: MapPin,
    title: "Guide",
    description:
      "The patient receives a personalized, plain-language summary: what their results mean, what they can do, and where to find care near them.",
  },
];

export function HowItWorksSection() {
  return (
    <div className="bg-surface">
      <SectionWrapper id="how-it-works">
        <h2 className="text-2xl font-semibold text-bc-blue mb-10">How It Works</h2>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-surface-border hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-6 items-start relative">
                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-bc-blue text-white font-semibold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="h-4 w-4 text-bc-blue" />
                    <h3 className="font-semibold text-text-primary">{step.title}</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
