export function resetPasswordEmailTemplate(resetLink: string) {
  return `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color:#162B6E;">Please Reset Your Zabbot Password</h2>

    <p>You requested a password reset. Click the button below:</p>

    <a href="${resetLink}" 
       style="
        display:inline-block;
        padding:12px 20px;
        background:#24A5EE;
        color:white;
        border-radius:8px;
        text-decoration:none;
        margin-top:10px;
       ">
      Reset Password
    </a>

    <p style="margin-top:20px; font-size:12px; color:#777;">
      This link expires in 30 minutes. If you didn’t request this, ignore this email.
    </p>
  </div>
  `;
}