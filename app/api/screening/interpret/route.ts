import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getSession } from "@/lib/auth";
import { getPatient, updatePatient } from "@/lib/patient-store";
import { getSummarySystemPrompt, buildSummaryUserMessage } from "@/lib/prompts";

export async function POST() {
  const patientId = await getSession();
  if (!patientId) {
    return new Response("Not authenticated", { status: 401 });
  }

  const patient = getPatient(patientId);
  if (!patient || !patient.labResults) {
    return new Response("No results available", { status: 404 });
  }

  if (patient.cachedSummary) {
    return Response.json({ summary: patient.cachedSummary });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured in .env.local" },
      { status: 500 }
    );
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: getSummarySystemPrompt(),
      prompt: buildSummaryUserMessage(patient),
    });

    updatePatient(patientId, { cachedSummary: text });

    return Response.json({ summary: text });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown AI error";
    console.error("AI summary error:", message);

    if (message.includes("quota")) {
      return Response.json(
        {
          error:
            "Your OpenAI account has run out of credits. Add billing at platform.openai.com/account/billing.",
        },
        { status: 402 }
      );
    }
    if (message.includes("API key") || message.includes("auth")) {
      return Response.json(
        {
          error:
            "Invalid OpenAI API key. Check your OPENAI_API_KEY in .env.local.",
        },
        { status: 401 }
      );
    }

    return Response.json({ error: message }, { status: 500 });
  }
}
