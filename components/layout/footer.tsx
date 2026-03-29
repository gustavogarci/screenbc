export function Footer() {
  return (
    <footer className="no-print mt-auto border-t border-surface-border bg-white">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center">
        <p className="flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-0.5 text-sm text-text-secondary">
          <span>ScreenBC Pilot Program</span>
          <span className="hidden sm:inline text-text-secondary/40">·</span>
          <span className="text-xs text-text-secondary/60">
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/gustavogs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary/80 hover:underline"
            >
              Gustavo Garcia
            </a>
          </span>
        </p>
        <p className="text-xs text-text-secondary/70 mt-1">
          This is not a substitute for medical advice. If you feel unwell, call{" "}
          <span className="font-semibold">8-1-1</span> (HealthLink BC) or visit
          your nearest emergency department.
        </p>
      </div>
    </footer>
  );
}
