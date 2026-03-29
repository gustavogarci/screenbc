"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound, Smartphone, UserRound } from "lucide-react";

export function LoginForm() {
  const [mode, setMode] = useState<"select" | "credentials">("select");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDemoLogin() {
    setDemoLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "margaret.johnson", password: "demo1234" }),
      });
      if (!res.ok) {
        setError("Unable to start demo. Please try again.");
        setDemoLoading(false);
        return;
      }
      const data = await res.json();
      window.location.href = data.consentAccepted ? "/portal" : "/consent";
    } catch {
      setError("An error occurred. Please try again.");
      setDemoLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.consentAccepted) {
        window.location.href = "/portal";
      } else {
        window.location.href = "/consent";
      }
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="py-8 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-sm text-text-secondary mb-1">Log in to:</p>
          <h1 className="text-2xl font-semibold text-bc-blue">ScreenBC</h1>
          <p className="text-sm text-text-secondary mt-3">
            This service will receive your: name, email address, PHN
          </p>
        </div>

        {mode === "select" ? (
          <Card className="border-surface-border shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm font-medium text-text-secondary text-center mb-2">
                Continue with:
              </p>

              <button
                onClick={() =>
                  toast.info(
                    "Coming soon — BC Services Card integration",
                    { duration: 3000 }
                  )
                }
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-md border border-surface-border hover:bg-muted transition-colors text-left"
              >
                <Smartphone className="h-5 w-5 text-bc-blue shrink-0" />
                <span className="text-sm font-medium text-text-primary">
                  BC Services Card app
                </span>
              </button>

              <button
                onClick={() => setMode("credentials")}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-md border border-surface-border hover:bg-muted transition-colors text-left"
              >
                <KeyRound className="h-5 w-5 text-bc-blue shrink-0" />
                <span className="text-sm font-medium text-text-primary">
                  Username/password + BC Token
                </span>
              </button>

              <div className="pt-4 border-t border-surface-border space-y-3">
                <button
                  onClick={handleDemoLogin}
                  disabled={demoLoading}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-md border border-dashed border-bc-blue/40 hover:bg-bc-blue/5 transition-colors text-left"
                >
                  <UserRound className="h-5 w-5 text-bc-blue shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-bc-blue">
                      {demoLoading ? "Signing in..." : "Try as Sample Patient"}
                    </span>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Sign in as Margaret Johnson to explore the demo
                    </p>
                  </div>
                </button>

                <p className="text-xs text-text-secondary text-center">
                  No account?{" "}
                  <span className="text-bc-link">
                    Find out how to get the mobile app.
                  </span>{" "}
                  Or,{" "}
                  <span className="text-bc-link">
                    how to get a BC Token to use a username and password.
                  </span>
                </p>
                <p className="text-xs text-bc-link text-center mt-2 font-medium">
                  Set up a BC Services Card account &rarr;
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-surface-border shadow-sm">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. margaret.johnson"
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-status-red font-medium">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-bc-blue hover:bg-bc-blue-hover"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <button
                  type="button"
                  onClick={() => setMode("select")}
                  className="w-full text-sm text-bc-link hover:underline"
                >
                  &larr; Back to login options
                </button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
