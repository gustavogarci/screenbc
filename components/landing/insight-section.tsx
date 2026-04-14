import { SectionWrapper } from "./section-wrapper";

export function InsightSection() {
  return (
    <div className="bg-surface">
      <SectionWrapper id="the-insight">
        <h2 className="text-2xl font-semibold text-bc-blue mb-8">The Insight</h2>

        <div className="rounded-lg bg-bc-blue-light border border-bc-blue/10 px-8 py-8 mb-8">
          <p className="text-xl md:text-2xl font-semibold text-bc-blue leading-snug">
            &ldquo;BC already solved this problem — for cancer.&rdquo;
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            BC Cancer Screening proactively identifies patients who are overdue for
            mammograms, cervical screening, and colon cancer screening. It sends them a
            notification. It doesn&apos;t wait for a family doctor to order the test.
            The program has been running for years, and it works.
          </p>
        </div>

        <p className="text-lg font-medium text-text-primary mb-4">
          Nobody has done the same thing for chronic disease identification.
        </p>
        <p className="text-text-secondary leading-relaxed">
          ScreenBC applies the exact same model to diabetes and dyslipidemia screening.
          The infrastructure is already there. The clinical guidelines exist. The labs
          are inexpensive and accessible. The barrier is that no one has found a way to
          implement population-level screening for these conditions without requiring a
          physician to order and review each individual test.
        </p>
      </SectionWrapper>
    </div>
  );
}
