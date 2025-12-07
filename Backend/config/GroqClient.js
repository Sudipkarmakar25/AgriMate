import OpenAI from "openai";

const MODEL_LIST = [
  "llama-3.1-8b-instant",
  "llama-3.1-70b-versatile",
  "mixtral-8x7b-32768"
];

let workingModel = null;

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/**
 * Detect first working model (same logic as Java)
 */
async function detectWorkingModel() {
  if (workingModel) return workingModel;

  console.log("🔍 Detecting available Groq model...");

  for (const model of MODEL_LIST) {
    try {
      const response = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: "health_check" }],
      });

      if (response && response.choices && response.choices.length > 0) {
        workingModel = model;
        console.log("✅ Groq model selected:", workingModel);
        return workingModel;
      }
    } catch (_) {}
  }

  throw new Error("❌ No working Groq model found. Check GROQ_API_KEY");
}

/**
 * Proper JSON-safe string escape
 */
function escapePrompt(prompt) {
  return prompt
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

/**
 * Main API call — equivalent to generateReview() in Java
 */
export async function generateGroqResponse(prompt) {
  const model = await detectWorkingModel();

  const safePrompt = escapePrompt(prompt);

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: safePrompt }],
      temperature: 0.2,
    });

    return response;
  } catch (error) {
    throw new Error(`❌ Groq request failed using model '${model}' — ${error.message}`);
  }
}
