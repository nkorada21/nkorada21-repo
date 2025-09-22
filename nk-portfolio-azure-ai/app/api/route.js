import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import OpenAI from "openai";
import { NextResponse } from "next/server";

// ✅ Setup Azure Entra ID token provider
const tokenProvider = getBearerTokenProvider(
  new DefaultAzureCredential(),
  "https://cognitiveservices.azure.com/.default"
);

// ✅ Configure OpenAI client for Azure
const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY, // ✅ required
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_MODEL}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION }, // ✅ correct
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },       // ✅ needed for Azure
});

// Health check
export async function GET() {
  return NextResponse.json({ status: "✅ Azure Chat API ready. Use POST." });
}

// Chat request
export async function POST(req) {
  try {
    const { message } = await req.json();

    const result = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL, // ⚠️ must match deployment name
      messages: [
        { role: "system", content: "You are PortfolioGPT, answer based on Narendra's resume." },
        { role: "user", content: message },
      ],
      max_tokens: 128,
    });

    return NextResponse.json({
      reply: result.choices[0].message.content,
    });
  } catch (err) {
    console.error("Azure Chat error:", err);
    return NextResponse.json({ error: "Azure Chat request failed" }, { status: 500 });
  }
}