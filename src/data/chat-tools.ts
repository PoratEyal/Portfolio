import { tool } from 'ai';
import { z } from 'zod';

// Simple in-memory rate limiter: 1 email per IP per 10 minutes
const emailCooldowns = new Map<string, number>();
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const lastSent = emailCooldowns.get(ip);
  if (lastSent && Date.now() - lastSent < COOLDOWN_MS) {
    return false;
  }
  return true;
}

function recordEmailSent(ip: string) {
  emailCooldowns.set(ip, Date.now());
}

async function sendEmailViaEmailJS(
  params: { name: string; email: string; message: string },
  env: { serviceId: string; templateId: string; publicKey: string }
): Promise<{ success: boolean; error?: string }> {
  const payload = {
    service_id: env.serviceId,
    template_id: env.templateId,
    user_id: env.publicKey,
    template_params: {
      from_name: params.name,
      from_email: params.email,
      message: params.message,
      to_email: 'eyal1.porat@gmail.com',
    },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'origin': 'http://localhost:5173',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const responseText = await response.text();
      return { success: false, error: responseText };
    }
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

interface ChatToolsOptions {
  clientIp?: string;
  emailjsServiceId?: string;
  emailjsTemplateId?: string;
  emailjsPublicKey?: string;
}

const emailSchema = z.object({
  senderName: z.string().describe('The name of the person sending the message'),
  senderEmail: z.string().describe('The email address of the person sending the message'),
  message: z.string().describe('The message content the person wants to send to Eyal'),
});

type EmailInput = z.infer<typeof emailSchema>;

export function createChatTools(options: ChatToolsOptions = {}) {
  const {
    clientIp = 'unknown',
    emailjsServiceId = '',
    emailjsTemplateId = '',
    emailjsPublicKey = '',
  } = options;

  return {
    sendEmail: tool<EmailInput, { success: boolean; message: string }>({
      description:
        'Send an email message to Eyal Porat. Use this when a visitor wants to contact Eyal, send him a message, or reach out. You MUST collect the sender name, sender email, and message content before calling this tool.',
      inputSchema: emailSchema,
      execute: async ({ senderName, senderEmail, message }) => {
        if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
          return {
            success: false,
            message: 'Email service is not configured.',
          };
        }

        if (!checkRateLimit(clientIp)) {
          return {
            success: false,
            message:
              'An email was already sent recently. Please wait a few minutes before sending another one.',
          };
        }

        const result = await sendEmailViaEmailJS(
          { name: senderName, email: senderEmail, message },
          { serviceId: emailjsServiceId, templateId: emailjsTemplateId, publicKey: emailjsPublicKey }
        );

        if (result.success) {
          recordEmailSent(clientIp);
          return {
            success: true,
            message: `Email sent successfully from ${senderName} (${senderEmail}) to Eyal.`,
          };
        } else {
          return {
            success: false,
            message: `Failed to send email: ${result.error}`,
          };
        }
      },
    }),
  };
}
