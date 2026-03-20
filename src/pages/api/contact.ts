import type { APIRoute } from "astro";
import { Resend } from "resend";

export type Email = {
  name: string;
  email: string;
  subject: string;
  body: string;
};

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_KEY);
  const res: Email = await request.json();
  const { name, email, subject, body } = res;

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [import.meta.env.P_EMAIL],
    subject: `Portfolio Message - ${subject}`,
    html: `<p>From: ${name} (${email})</p><p>${body}</p>`,
  });

  console.log(error);

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
