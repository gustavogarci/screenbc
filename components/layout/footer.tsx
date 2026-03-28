export function Footer() {
  return (
    <footer className="no-print mt-auto border-t border-surface-border bg-white">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center">
        <p className="text-sm text-text-secondary">
          ScreenBC Pilot Program &middot; Dr. Aisha Patel, MD
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
