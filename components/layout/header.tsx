"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BCLogo } from "./bc-logo";

export function Header({ showLogout = false }: { showLogout?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header className="no-print">
      <div className="bg-bc-blue">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/portal" className="flex items-center gap-2">
            <BCLogo className="h-10 w-auto" />
          </Link>
          {showLogout && (
            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Log out
            </button>
          )}
        </div>
      </div>
      <div className="h-0.5 bg-bc-gold" />
    </header>
  );
}
