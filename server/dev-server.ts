import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import { EYAL_SYSTEM_PROMPT } from '../src/data/eyal-bio';
import { createChatTools } from '../src/data/chat-tools';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

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

    // Convert the AI SDK stream to a web-standard Response, then pipe to Express
    const response = result.toUIMessageStreamResponse();

    // Forward status and headers
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Stream the body
    if (response.body) {
      const reader = response.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            return;
          }
          res.write(value);
        }
      };
      await pump();
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Dev API server running at http://localhost:${PORT}`);
});
