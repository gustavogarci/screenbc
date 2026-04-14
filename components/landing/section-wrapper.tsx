import { cn } from "@/lib/utils";

export function SectionWrapper({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("max-w-5xl mx-auto px-6 py-12 md:py-16 scroll-mt-20", className)}>
      {children}
    </section>
  );
}
