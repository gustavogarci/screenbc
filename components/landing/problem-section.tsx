import { Card, CardContent } from "@/components/ui/card";
import { SectionWrapper } from "./section-wrapper";

export function ProblemSection() {
  return (
    <div className="bg-surface">
      <SectionWrapper id="the-problem">
        <h2 className="text-2xl font-semibold text-bc-blue mb-8">The Problem</h2>

        <Card className="border-bc-blue/20 bg-white mb-8">
          <CardContent className="py-8 text-center">
            <p className="text-5xl md:text-6xl font-bold text-bc-blue">700,000+</p>
            <p className="mt-2 text-lg text-text-secondary">
              British Columbians without a family doctor
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            That means no one is routinely screening for common, silent conditions like
            diabetes or high cholesterol. These diseases develop over years without
            symptoms, but can end in heart attacks, strokes, kidney failure, blindness,
            amputations, and premature death.
          </p>
          <p className="font-medium text-text-primary">
            These outcomes are often preventable.
          </p>
          <p>
            Early detection is simple and inexpensive. Basic blood tests cost less than
            $10 each and are already available across the province. When caught early,
            these conditions can be managed with medications and lifestyle changes that
            dramatically reduce the risk of life-altering complications.
          </p>
          <p>
            But without a primary care provider, these tests are often never ordered.
            Patients are left undiagnosed until they present with advanced disease — when
            the damage is already done.
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
}
