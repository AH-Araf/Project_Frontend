import { askGemini, readJson } from "@/lib/gemini";
import { askLocal } from "@/lib/models.mjs";

function jsonOk(text) {
  try {
    readJson(text);
    return true;
  } catch {
    return false;
  }
}

export async function complete(prompt, options = {}) {
  const local = await askLocal(prompt, options);
  if (local.ok && (!options.json || jsonOk(local.text))) {
    return { ok: true, text: local.text, via: "local" };
  }

  const remote = await askGemini(prompt, options);
  if (remote.ok) return { ok: true, text: remote.text, via: "gemini" };

  const why = local.ok ? "The local model did not return usable JSON." : local.message;
  return { ok: false, message: `${why} ${remote.message || ""}`.trim() };
}
