"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Patient } from "@/lib/types";

interface ProfileCardProps {
  patient: Patient;
}

type EditingField = "email" | "phone" | null;

export function ProfileCard({ patient }: ProfileCardProps) {
  const [email, setEmail] = useState(patient.email);
  const [phone, setPhone] = useState(patient.phone ?? "");
  const [editing, setEditing] = useState<EditingField>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startEditing(field: EditingField) {
    setEditing(field);
    setDraft(field === "email" ? email : phone);
    setError(null);
  }

  function cancelEditing() {
    setEditing(null);
    setDraft("");
    setError(null);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);

    try {
      const payload: Record<string, string> = {
        action: "update-contact",
        [editing]: draft,
      };
      const res = await fetch("/api/patient/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        return;
      }
      if (editing === "email") setEmail(draft);
      else setPhone(draft);
      setEditing(null);
      setDraft("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const dob = new Date(patient.dateOfBirth);
  const formattedDob = dob.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="border-surface-border shadow-sm py-0 gap-0">
      <CardContent className="p-5">
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Your Profile
        </h2>

        <dl className="space-y-2.5 text-sm">
          {/* Read-only fields */}
          <ProfileRow label="Name" value={`${patient.firstName} ${patient.lastName}`} />
          <ProfileRow label="Date of Birth" value={`${formattedDob} (Age ${patient.age})`} />
          <ProfileRow label="Sex" value={patient.sex === "F" ? "Female" : "Male"} />
          <ProfileRow label="PHN" value={patient.phn} mono />
          <ProfileRow label="Postal Code" value={patient.postalCode} />

          {/* Editable: Email */}
          <div className="pt-2 border-t border-surface-border">
            <div className="flex items-center justify-between mb-1">
              <dt className="text-text-secondary font-medium">Email Address</dt>
              {editing !== "email" && (
                <button
                  type="button"
                  onClick={() => startEditing("email")}
                  className="text-xs font-semibold text-bc-link hover:underline uppercase tracking-wide"
                >
                  Edit
                </button>
              )}
            </div>
            {editing === "email" ? (
              <EditField
                value={draft}
                onChange={setDraft}
                onSave={save}
                onCancel={cancelEditing}
                saving={saving}
                error={error}
                type="email"
                placeholder="you@example.com"
              />
            ) : (
              <dd className="font-medium text-text-primary text-sm break-all">{email}</dd>
            )}
          </div>

          {/* Editable: Phone */}
          <div className="pt-2 border-t border-surface-border">
            <div className="flex items-center justify-between mb-1">
              <dt className="text-text-secondary font-medium">
                Cell Number <span className="font-normal text-xs">(SMS notifications)</span>
              </dt>
              {editing !== "phone" && (
                <button
                  type="button"
                  onClick={() => startEditing("phone")}
                  className="text-xs font-semibold text-bc-link hover:underline uppercase tracking-wide"
                >
                  Edit
                </button>
              )}
            </div>
            {editing === "phone" ? (
              <EditField
                value={draft}
                onChange={setDraft}
                onSave={save}
                onCancel={cancelEditing}
                saving={saving}
                error={error}
                type="tel"
                placeholder="(250) 555-0000"
              />
            ) : (
              <dd className="font-medium text-text-primary text-sm">
                {phone || <span className="text-text-secondary italic">Not provided</span>}
              </dd>
            )}
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

function ProfileRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-text-secondary">{label}</dt>
      <dd className={`font-medium text-text-primary ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

function EditField({
  value,
  onChange,
  onSave,
  onCancel,
  saving,
  error,
  type,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-sm"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button size="sm" onClick={onSave} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
