import sgMail from "@sendgrid/mail";

// Initialize SendGrid API key
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("Missing SENDGRID_API_KEY in environment variables");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM!, // must be verified sender in SendGrid
      subject,
      html,
    });
  } catch (error) {
    console.error("SendGrid email error:", error);
    throw error; // rethrow so API routes can handle it properly
  }
}