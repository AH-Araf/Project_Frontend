const MODEL = "gemini-3.8-flash";

export function hasGemini() {
  return Boolean(process.env.GEMINI_API_KEY);
}

export async function askGemini(prompt, { json = false } = {}) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, message: "Add GEMINI_API_KEY in .env, then restart the dev server." };

  let response;
  try {
    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 1200,
          ...(json ? { responseMimeType: "application/json" } : {}),
        },
      }),
    });
  } catch {
    return { ok: false, message: "Could not reach Gemini." };
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) return { ok: false, message: payload?.error?.message || "Gemini could not answer." };

  const parts = payload?.candidates?.[0]?.content?.parts || [];
  const text = parts.filter((part) => part.text && !part.thought).map((part) => part.text).join("\n").trim();
  if (!text) return { ok: false, message: "Gemini returned an empty answer." };
  return { ok: true, text };
}

export function readJson(text) {
  const cleaned = String(text).trim().replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```$/, "").trim();
  return JSON.parse(cleaned);
}
