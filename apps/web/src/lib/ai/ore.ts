import { getOpenAI } from "../openai";

export async function streamOreResponse(prompt: string) {
  const openai = getOpenAI();

  const stream = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    stream: true,
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are Ore, a friendly Yoruba tutor helping users learn conversational Yoruba in a fun, simple, and culturally rich way.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return stream;
}