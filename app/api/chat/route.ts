import { streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import { getSession } from "@/lib/auth";
import { getPatient } from "@/lib/patient-store";
import { getChatSystemPrompt } from "@/lib/prompts";

export async function POST(request: Request) {
  const patientId = await getSession();
  if (!patientId) {
    return new Response("Not authenticated", { status: 401 });
  }

  const patient = getPatient(patientId);
  if (!patient) {
    return new Response("Patient not found", { status: 404 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response("OPENAI_API_KEY is not configured", { status: 500 });
  }

  const { messages } = await request.json();

  try {
    const result = streamText({
      model: openai("gpt-4o"),
      system: getChatSystemPrompt(patient),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      `AI error: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 }
    );
  }
}
