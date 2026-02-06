import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import { EYAL_SYSTEM_PROMPT } from '../src/data/eyal-bio';
import { createChatTools } from '../src/data/chat-tools';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';

  const tools = createChatTools({
    clientIp,
    emailjsServiceId: process.env.VITE_EMAILJS_SERVICE_ID,
    emailjsTemplateId: process.env.VITE_EMAILJS_TEMPLATE_ID,
    emailjsPublicKey: process.env.VITE_EMAILJS_PUBLIC_KEY,
  });

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: EYAL_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}
