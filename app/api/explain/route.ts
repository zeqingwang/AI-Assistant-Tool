import OpenAI from "openai";
import { NextRequest } from "next/server";

export const runtime = "nodejs"; // ensure server-side execution

function errorResponse(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function requireValidApiKey() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      error:
        "OpenAI API key is missing. Add OPENAI_API_KEY to .env.local and restart the dev server.",
    };
  }

  return { ok: true as const, apiKey };
}

function buildPrompt(code: string, tone: "concise" | "detailed") {
  const detailHint =
    tone === "detailed"
      ? "Be detailed, include edge cases and rationale."
      : "Be concise but clear.";

  return `
You are a senior software engineer helping a developer understand code.

Tasks:
1) Write a clear explanation / documentation of what the code does.
2) Suggest improvements (correctness, readability, performance, security, style).

${detailHint}

Return in JSON with exactly these keys:
{
  "summary": "string",
  "improvements": "string"
}

Code:
\`\`\`
${code}
\`\`\`
`;
}

export async function POST(req: NextRequest) {
  try {
    const apiKeyCheck = requireValidApiKey();
    if (!apiKeyCheck.ok) {
      return errorResponse(apiKeyCheck.error, 400);
    }

    const { code, tone } = await req.json();

    if (!code || typeof code !== "string") {
      return errorResponse("`code` is required.", 400);
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const client = new OpenAI({ apiKey: apiKeyCheck.apiKey });

    const response = await client.responses.create({
      model,
      input: buildPrompt(code, tone ?? "concise"),
      // ask for JSON output
      text: { format: { type: "json_object" } },
    });

    const text = response.output_text;
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { summary: text, improvements: "" };
    }

    return Response.json({
      summary: parsed.summary ?? "",
      improvements: parsed.improvements ?? "",
    });
  } catch (err: any) {
    console.error(err);
    return errorResponse(err?.message || "Server error", 500);
  }
}

export async function GET() {
  const apiKeyCheck = requireValidApiKey();

  return Response.json({
    message:
      "Send a POST request with { code: string, tone: 'concise' | 'detailed' }.",
    apiKeyStatus: apiKeyCheck.ok ? "configured" : apiKeyCheck.error,
  });
}

