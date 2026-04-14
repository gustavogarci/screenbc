import { SectionWrapper } from "./section-wrapper";

export function AboutIntroSection() {
  return (
    <div id="about" className="bg-white scroll-mt-20">
      <SectionWrapper>
        <h2 className="text-2xl font-semibold text-bc-blue mb-3">
          About This Project
        </h2>
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          ScreenBC was built for the{" "}
          <a
            href="https://www.uvichacks.com/events/healthcare-hackathon"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-bc-link hover:underline"
          >
            BuildersVault Healthcare AI Hackathon
          </a>
          , where it was selected as one of the winning projects. It demonstrates
          how a province-wide screening program could work — identifying patients
          who are overdue for routine blood work, interpreting their results using
          AI grounded in Canadian clinical guidelines, and guiding them to
          appropriate next steps — all without requiring a physician in the loop.
        </p>
      </SectionWrapper>
    </div>
  );
}
