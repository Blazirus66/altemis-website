import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(name: string, email: string, message: string) {
  await resend.emails.send({
    from: 'Altemis <noreply@altemis.xyz>',
    to: 'contact@altemis.xyz',
    replyTo: email,
    subject: `Nouveau message de ${name}`,
    html: `
      <h2>Nouveau message via le site Altemis</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });
}

async function sendTelegram(name: string, email: string, message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram environment variables not configured');
  }

  const text = [
    '📩 *Nouveau message — Altemis*',
    '',
    `👤 *Nom :* ${escapeMarkdown(name)}`,
    `📧 *Email :* ${escapeMarkdown(email)}`,
    '',
    '💬 *Message :*',
    escapeMarkdown(message),
  ].join('\n');

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'MarkdownV2',
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API error: ${res.status} ${body}`);
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Tous les champs sont requis.' },
      { status: 400 },
    );
  }

  const results = await Promise.allSettled([
    sendEmail(name, email, message),
    sendTelegram(name, email, message),
  ]);

  const emailResult = results[0];
  const telegramResult = results[1];

  if (emailResult.status === 'rejected') {
    console.error('Resend error:', emailResult.reason);
  }
  if (telegramResult.status === 'rejected') {
    console.error('Telegram error:', telegramResult.reason);
  }

  const atLeastOneSuccess = results.some((r) => r.status === 'fulfilled');

  if (!atLeastOneSuccess) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
