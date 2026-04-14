import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutIntroSection } from "@/components/landing/about-intro-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { InsightSection } from "@/components/landing/insight-section";
import { WhyThisIdeaSection } from "@/components/landing/why-this-idea-section";
import { WhyItWorksSection } from "@/components/landing/why-it-works-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { RoadmapSection } from "@/components/landing/roadmap-section";
import { TeamSection } from "@/components/landing/team-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <AboutIntroSection />
        <ProblemSection />
        <InsightSection />
        <WhyThisIdeaSection />
        <WhyItWorksSection />
        <HowItWorksSection />
        <RoadmapSection />
        <TeamSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
