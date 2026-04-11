export function welcomeEmailTemplate(name?: string | null) {
  return `
  <div style="font-family: Arial;">
    <h2 style="color:#162B6E;">Welcome to Zabbot 🚀</h2>

    <p>Hi ${name || "there"},</p>

    <p>
      Welcome to your Yoruba learning journey. Speak. Learn. Belong.
    </p>

    <p style="margin-top:20px;">
      Start learning now inside your dashboard.
    </p>
  </div>
  `;
}