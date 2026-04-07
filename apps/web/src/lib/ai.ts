import { getOpenAI } from "./openai";

export async function generateAIResponse(prompt: string) {
  const openai = getOpenAI(); // ✅ runtime initialization

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a friendly Yoruba language tutor helping users learn conversational Yoruba in a fun, simple, and culturally rich way.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "No response";
}