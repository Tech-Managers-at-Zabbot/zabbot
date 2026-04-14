export function verificationEmailTemplate(params: {
  name?: string;
  verifyUrl: string;
}) {
  const { name, verifyUrl } = params;

  return `
  <div style="
    background: linear-gradient(135deg, #e0f2fe, #f8fafc);
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  ">

    <!-- MAIN CARD -->
    <div style="
      max-width: 480px;
      margin: auto;
      background: rgba(255,255,255,0.78);
      border-radius: 20px;
      padding: 32px 24px;
      border: 1px solid rgba(255,255,255,0.6);
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      text-align: center;
    ">

      <!-- 🦜 MASCOT -->
      <div style="margin-bottom: 14px;">
        <img 
          src="https://res.cloudinary.com/dgotesgcy/image/upload/q_auto/f_auto/v1776174635/kvayx5khjhsic3ty5h9d.png"
          width="64"
          height="64"
          style="
            border-radius: 50%;
            background: white;
            padding: 6px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          "
        />
      </div>

      <!-- BRAND TAGLINE -->
      <p style="
        font-size: 13px;
        color: #24A5EE;
        font-weight: 600;
        margin-bottom: 6px;
      ">
        Káàbọ̀ 👋 Welcome to Zabbot
      </p>

      <!-- HEADLINE -->
      <h2 style="
        margin: 0 0 10px;
        color: #0f172a;
        font-size: 20px;
      ">
        Confirm your email to begin 🚀
      </h2>

      <!-- MESSAGE -->
      <p style="
        color: #475569;
        font-size: 14px;
        margin-bottom: 22px;
        line-height: 1.6;
      ">
        Hi ${name || "there"},<br/><br/>

        🦜 Zabbot is built to guide you through language, culture, and fluency.<br/>
        One last step — confirm your email to unlock your journey.
      </p>

      <!-- CTA BUTTON -->
      <a href="${verifyUrl}"
         style="
           display: inline-block;
           padding: 12px 22px;
           background: #24A5EE;
           color: white;
           border-radius: 12px;
           text-decoration: none;
           font-weight: 600;
           font-size: 14px;
           box-shadow: 0 6px 16px rgba(36,165,238,0.4);
         ">
        Verify Email
      </a>

      <!-- FALLBACK LINK -->
      <p style="
        font-size: 12px;
        color: #94a3b8;
        margin-top: 18px;
        line-height: 1.5;
      ">
        If the button doesn't work, copy this link:<br/>
        <span style="word-break: break-all;">
          ${verifyUrl}
        </span>
      </p>

      <!-- EXPIRY -->
      <p style="
        font-size: 12px;
        color: #94a3b8;
        margin-top: 12px;
      ">
        This verification link expires in 1 hour.
      </p>

      <!-- DIVIDER -->
      <div style="
        height: 1px;
        background: rgba(0,0,0,0.05);
        margin: 24px 0;
      "></div>

      <!-- FOOTER BRAND -->
      <div style="margin-bottom: 14px;">
        <img 
          src="https://res.cloudinary.com/dgotesgcy/image/upload/q_auto/f_auto/v1776174635/uknqd3jnzsvjnbz0nbyn.png"
          width="90"
          style="margin-bottom: 6px;"
        />

        <p style="
          font-size: 12px;
          color: #64748b;
          margin: 0;
        ">
          Learn. Speak. Own your heritage.
        </p>
      </div>

      <!-- SOCIAL LINKS -->
      <div style="margin-top: 16px; font-size: 12px; color: #64748b;">
        <p style="margin-bottom: 6px;">
          Need help? Contact us:
        </p>

        <p style="margin: 0;">
          📩 support@zabbot.com
        </p>

        <p style="margin: 6px 0;">
          🔗 
          <a href="https://www.linkedin.com/company/zabbot/" style="color:#24A5EE; text-decoration:none;">
            LinkedIn
          </a>
          &nbsp;|&nbsp;
          <a href="https://www.youtube.com/@zabbotlearning" style="color:#24A5EE; text-decoration:none;">
            YouTube
          </a>
        </p>
      </div>

    </div>
  </div>
  `;
}