import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { getSession } from "@/lib/auth";
import { getPatient } from "@/lib/patient-store";
import { getSummarySystemPrompt, buildSummaryUserMessage } from "@/lib/prompts";

export async function POST() {
  const patientId = await getSession();
  if (!patientId) {
    return new Response("Not authenticated", { status: 401 });
  }

  const patient = await getPatient(patientId);
  if (!patient || !patient.labResults) {
    return new Response("No results available", { status: 404 });
  }

  try {
    const result = streamText({
      model: gateway("openai/gpt-4o"),
      system: getSummarySystemPrompt(),
      prompt: buildSummaryUserMessage(patient),
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown AI error";
    console.error("AI summary error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
