"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function QuestionnaireForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [familyDiabetes, setFamilyDiabetes] = useState<string>("");
  const [familyHeart, setFamilyHeart] = useState<string>("");
  const [smoking, setSmoking] = useState<string>("");
  const [systolicBp, setSystolicBp] = useState<string>("");
  const [bpMedication, setBpMedication] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const toBoolean = (v: string) =>
      v === "yes" ? true : v === "no" ? false : null;

    await fetch("/api/questionnaire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        familyHistoryDiabetes: toBoolean(familyDiabetes),
        familyHistoryHeartDisease: toBoolean(familyHeart),
        smokingStatus:
          smoking === "yes"
            ? "current"
            : smoking === "former"
              ? "former"
              : smoking === "no"
                ? "never"
                : null,
        systolicBp: systolicBp ? parseInt(systolicBp, 10) : null,
        onBpMedication: toBoolean(bpMedication),
      }),
    });

    router.push("/portal");
    router.refresh();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold text-text-primary mb-1">
        Health Questionnaire
      </h1>
      <p className="text-sm text-text-secondary mb-8">
        This helps us calculate your cardiovascular risk score for more specific
        cholesterol guidance. All fields are optional.
      </p>

      <Card className="border-surface-border shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-7">
            <fieldset className="space-y-3">
              <Label className="text-sm font-medium leading-snug">
                Do you have a first-degree relative (parent, sibling) with
                diabetes?
              </Label>
              <RadioGroup value={familyDiabetes} onValueChange={setFamilyDiabetes} className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="fd-yes" />
                  <Label htmlFor="fd-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="fd-no" />
                  <Label htmlFor="fd-no" className="font-normal">No</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="unsure" id="fd-unsure" />
                  <Label htmlFor="fd-unsure" className="font-normal">Not sure</Label>
                </div>
              </RadioGroup>
            </fieldset>

            <hr className="border-surface-border" />

            <fieldset className="space-y-3">
              <Label className="text-sm font-medium leading-snug">
                Do you have a first-degree relative (parent, sibling) who was
                diagnosed with heart disease at an early age &mdash; before 55
                for men or before 65 for women?
              </Label>
              <RadioGroup value={familyHeart} onValueChange={setFamilyHeart} className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="fh-yes" />
                  <Label htmlFor="fh-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="fh-no" />
                  <Label htmlFor="fh-no" className="font-normal">No</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="unsure" id="fh-unsure" />
                  <Label htmlFor="fh-unsure" className="font-normal">Not sure</Label>
                </div>
              </RadioGroup>
            </fieldset>

            <hr className="border-surface-border" />

            <fieldset className="space-y-3">
              <Label className="text-sm font-medium leading-snug">
                Do you currently smoke cigarettes?
              </Label>
              <RadioGroup value={smoking} onValueChange={setSmoking} className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="sm-yes" />
                  <Label htmlFor="sm-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="sm-no" />
                  <Label htmlFor="sm-no" className="font-normal">No</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="former" id="sm-former" />
                  <Label htmlFor="sm-former" className="font-normal">Former smoker</Label>
                </div>
              </RadioGroup>
            </fieldset>

            <hr className="border-surface-border" />

            <fieldset className="space-y-3">
              <Label htmlFor="bp" className="text-sm font-medium leading-snug">
                Do you know your blood pressure? If yes, what is the top number
                (systolic)?
              </Label>
              <Input
                id="bp"
                type="number"
                value={systolicBp}
                onChange={(e) => setSystolicBp(e.target.value)}
                placeholder="e.g., 120"
                min={70}
                max={250}
                className="max-w-[200px]"
              />
              <p className="text-xs text-text-secondary">
                This is the top number when your blood pressure is taken (e.g.,
                120/80 &rarr; enter 120)
              </p>
            </fieldset>

            <hr className="border-surface-border" />

            <fieldset className="space-y-3">
              <Label className="text-sm font-medium leading-snug">
                Are you currently taking medication for blood pressure?
              </Label>
              <RadioGroup value={bpMedication} onValueChange={setBpMedication} className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="bp-yes" />
                  <Label htmlFor="bp-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="bp-no" />
                  <Label htmlFor="bp-no" className="font-normal">No</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="unsure" id="bp-unsure" />
                  <Label htmlFor="bp-unsure" className="font-normal">Not sure</Label>
                </div>
              </RadioGroup>
            </fieldset>

            <div className="pt-5 mt-2 border-t border-surface-border">
              <Button
                type="submit"
                disabled={loading}
                className="bg-bc-blue hover:bg-bc-blue-hover w-full sm:w-auto"
                size="lg"
              >
                {loading ? "Submitting..." : "Submit Questionnaire"}
              </Button>
              <p className="text-xs text-text-secondary mt-3">
                This information is used only to calculate your cardiovascular
                risk score. It is not shared with anyone outside the ScreenBC
                program.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
