import type { Patient } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://screenbc.vercel.app";
const logoUrl = `${baseUrl}/bc-logo.png`;

function emailHeader(): string {
  return `<div style="background:#013366;padding:20px 30px;display:flex;align-items:center;gap:12px;">
      <img src="${logoUrl}" alt="British Columbia" width="44" height="32" style="display:block;" />
      <span style="color:#ffffff;font-size:16px;font-weight:700;letter-spacing:-0.01em;">ScreenBC</span>
    </div>`;
}

export function getScreeningDueEmail(patient: Patient): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;">
    ${emailHeader()}
    <div style="height:2px;background:#FCBA19;"></div>
    <div style="padding:30px;">
      <p style="color:#2D2D2D;font-size:15px;line-height:1.6;margin:0 0 16px;">Hi ${patient.firstName},</p>
      <p style="color:#2D2D2D;font-size:15px;line-height:1.6;margin:0 0 16px;">Our records show that you may be overdue for basic preventive health screening.</p>
      <p style="color:#2D2D2D;font-size:15px;line-height:1.6;margin:0 0 16px;">ScreenBC is a pilot program that screens for type 2 diabetes and high cholesterol — two conditions that develop silently and are easy to catch with a simple blood test.</p>
      <p style="color:#2D2D2D;font-size:15px;line-height:1.6;margin:0 0 24px;">Getting screened is free and available at any LifeLabs location in British Columbia.</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${baseUrl}/login" style="display:inline-block;background:#013366;color:#ffffff;padding:12px 32px;border-radius:4px;text-decoration:none;font-size:14px;font-weight:600;">Learn More and Enroll</a>
      </div>
      <p style="color:#474543;font-size:13px;line-height:1.5;margin:24px 0 0;">If you're not interested, no action is needed. This is a one-time notification.</p>
    </div>
    <div style="border-top:1px solid #D8D8D8;padding:20px 30px;">
      <p style="color:#474543;font-size:12px;line-height:1.5;margin:0;">ScreenBC — Preventive Health Screening for British Columbians<br>A pilot program under Dr. Aisha Patel, MD</p>
    </div>
  </div>
</body>
</html>`;
}

export function getResultsReadyEmail(patient: Patient): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;">
    ${emailHeader()}
    <div style="height:2px;background:#FCBA19;"></div>
    <div style="padding:30px;">
      <p style="color:#2D2D2D;font-size:15px;line-height:1.6;margin:0 0 16px;">Hi ${patient.firstName},</p>
      <p style="color:#2D2D2D;font-size:15px;line-height:1.6;margin:0 0 16px;">Your preventive health screening results are now available on your ScreenBC portal.</p>
      <p style="color:#2D2D2D;font-size:15px;line-height:1.6;margin:0 0 24px;">Log in to view your personalized health summary, including a plain-language explanation of what your results mean and recommended next steps.</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${baseUrl}/login" style="display:inline-block;background:#013366;color:#ffffff;padding:12px 32px;border-radius:4px;text-decoration:none;font-size:14px;font-weight:600;">View Your Results</a>
      </div>
      <p style="color:#474543;font-size:13px;line-height:1.5;margin:24px 0 0;">If you have questions about your results after reviewing them, use the chat feature on your results page or call 8-1-1 (HealthLink BC).</p>
    </div>
    <div style="border-top:1px solid #D8D8D8;padding:20px 30px;">
      <p style="color:#474543;font-size:12px;line-height:1.5;margin:0;">ScreenBC — Preventive Health Screening for British Columbians<br>A pilot program under Dr. Aisha Patel, MD</p>
    </div>
  </div>
</body>
</html>`;
}
