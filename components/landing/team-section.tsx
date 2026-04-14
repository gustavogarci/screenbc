import { SectionWrapper } from "./section-wrapper";

export function TeamSection() {
  return (
    <div className="bg-surface">
      <SectionWrapper id="team">
        <h2 className="text-2xl font-semibold text-bc-blue mb-6">The Team</h2>
        <p className="text-text-secondary leading-relaxed">
          <strong>ScreenBC</strong> was built by{" "}
          <a
            href="https://www.linkedin.com/in/gustavogs/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-bc-link hover:underline"
          >
            Gustavo Garcia
          </a>{" "}
          (product &amp; engineering) in
          collaboration with <strong>Dr. Sally Carver</strong>, Family
          Physician, with input from physicians in British Columbia.
        </p>
      </SectionWrapper>
    </div>
  );
}
