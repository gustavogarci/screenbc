"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Patient } from "@/lib/types";

interface PatientInfo {
  id: string;
  name: string;
  label: string;
  tier: string;
}

const PATIENTS: PatientInfo[] = [
  { id: "PAT-001", name: "Margaret Johnson", label: "PAT-001", tier: "Yellow Demo" },
  { id: "PAT-002", name: "Sarah Chen", label: "PAT-002", tier: "Green Demo" },
  { id: "PAT-003", name: "Robert Kim", label: "PAT-003", tier: "Red Demo" },
];

const TIER_COLORS: Record<string, string> = {
  "Yellow Demo": "bg-status-yellow text-text-primary",
  "Green Demo": "bg-status-green text-white",
  "Red Demo": "bg-status-red text-white",
};

export default function AdminPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [emailModal, setEmailModal] = useState<{
    open: boolean;
    html: string;
    title: string;
  }>({ open: false, html: "", title: "" });

  const fetchPatients = useCallback(async () => {
    const results = await Promise.all(
      PATIENTS.map(async (p) => {
        const res = await fetch(`/api/admin/patient?id=${p.id}`);
        if (res.ok) return res.json();
        return null;
      })
    );
    setPatients(results.filter(Boolean));
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  async function handleReset(patientId: string) {
    await fetch("/api/admin/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId }),
    });
    toast.success(
      patientId === "all" ? "All patients reset" : "Patient reset"
    );
    fetchPatients();
  }

  async function handleSimulate(patientId: string) {
    await fetch("/api/admin/simulate-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId }),
    });
    toast.success("Lab results simulated");
    fetchPatients();
  }

  async function handleViewEmail(patientId: string, type: "due" | "results") {
    const res = await fetch(
      `/api/admin/email-preview?id=${patientId}&type=${type}`
    );
    const { html } = await res.json();
    setEmailModal({
      open: true,
      html,
      title:
        type === "due"
          ? "Screening Due Email Preview"
          : "Results Ready Email Preview",
    });
  }

  async function handleSendEmail(patientId: string, type: "due" | "results") {
    const res = await fetch("/api/admin/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId, type }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(`Email sent to ${data.to}`);
    } else {
      toast.error(`Failed to send: ${data.error}`);
    }
  }

  function getPatientData(id: string) {
    return patients.find((p) => p.id === id);
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-bc-blue">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <span className="text-white font-semibold text-sm">
            ScreenBC &mdash; Demo Admin Panel
          </span>
        </div>
      </div>
      <div className="h-0.5 bg-bc-gold" />

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <Card className="border-surface-border shadow-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="bg-bc-blue hover:bg-bc-blue-hover"
                onClick={async () => {
                  await Promise.all(
                    PATIENTS.map((p) =>
                      fetch("/api/admin/simulate-results", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ patientId: p.id }),
                      })
                    )
                  );
                  toast.success("All lab results simulated");
                  fetchPatients();
                }}
              >
                Simulate All Lab Results
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleReset("all")}
              >
                Reset Entire Demo
              </Button>
            </div>
            <p className="text-xs text-text-secondary mt-2 text-center">
              Simulate loads preset lab results for all patients. Reset clears everything back to initial state.
            </p>
          </CardContent>
        </Card>

        {PATIENTS.map((info) => {
          const patient = getPatientData(info.id);
          return (
            <Card key={info.id} className="border-surface-border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-semibold text-text-primary">
                      {info.name}{" "}
                      <span className="text-xs text-text-secondary font-mono">
                        ({info.label})
                      </span>
                    </h2>
                    <Badge className={`${TIER_COLORS[info.tier]} text-xs mt-1`}>
                      {info.tier}
                    </Badge>
                  </div>
                  {patient && (
                    <Badge variant="outline" className="text-xs">
                      {patient.screeningStatus}
                    </Badge>
                  )}
                </div>

                {patient?.email && (
                  <p className="text-xs text-text-secondary mb-3">
                    Email: {patient.email}
                  </p>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewEmail(info.id, "due")}
                    className="text-xs"
                  >
                    View &ldquo;Screening Due&rdquo;
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewEmail(info.id, "results")}
                    className="text-xs"
                  >
                    View &ldquo;Results Ready&rdquo;
                  </Button>
                  <div />
                  <Button
                    size="sm"
                    className="bg-bc-blue hover:bg-bc-blue-hover text-xs"
                    onClick={() => handleSendEmail(info.id, "due")}
                  >
                    Send &ldquo;Screening Due&rdquo;
                  </Button>
                  <Button
                    size="sm"
                    className="bg-bc-blue hover:bg-bc-blue-hover text-xs"
                    onClick={() => handleSendEmail(info.id, "results")}
                  >
                    Send &ldquo;Results Ready&rdquo;
                  </Button>
                  <div />
                  <Button
                    size="sm"
                    className="bg-bc-blue hover:bg-bc-blue-hover text-xs"
                    onClick={() => handleSimulate(info.id)}
                  >
                    Simulate Lab Results
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReset(info.id)}
                    className="text-xs"
                  >
                    Reset {info.name.split(" ")[0]} Only
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog
        open={emailModal.open}
        onOpenChange={(open) => setEmailModal((s) => ({ ...s, open }))}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{emailModal.title}</DialogTitle>
          </DialogHeader>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: emailModal.html }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
