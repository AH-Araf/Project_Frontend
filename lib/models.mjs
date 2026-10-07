import path from "path";

export const LOCAL_LLM = "Xenova/LaMini-Flan-T5-248M";
export const LOCAL_EMBED = "Xenova/all-MiniLM-L6-v2";
export const EMBED_DIMS = 384;

let configured = false;
let extractorPromise = null;
let generatorPromise = null;

async function transformers() {
  const mod = await import("@huggingface/transformers");
  if (!configured) {
    mod.env.cacheDir = path.join(process.cwd(), ".cache", "huggingface");
    mod.env.allowLocalModels = true;
    mod.env.allowRemoteModels = true;
    configured = true;
  }
  return mod;
}

export async function embedLocal(texts) {
  if (!extractorPromise) {
    extractorPromise = transformers()
      .then(({ pipeline }) => pipeline("feature-extraction", LOCAL_EMBED, { dtype: "q8", device: "cpu" }))
      .catch((error) => {
        extractorPromise = null;
        throw error;
      });
  }

  const extractor = await extractorPromise;
  const vectors = [];
  for (let index = 0; index < texts.length; index += 16) {
    const batch = texts.slice(index, index + 16).map((text) => String(text).slice(0, 2000));
    const tensor = await extractor(batch, { pooling: "mean", normalize: true });
    const width = tensor.dims[tensor.dims.length - 1];
    if (width !== EMBED_DIMS) {
      throw new Error(`Local embeddings are ${width} dimensions. The index expects ${EMBED_DIMS}.`);
    }
    const rows = tensor.dims.length > 1 ? tensor.dims[0] : 1;
    for (let row = 0; row < rows; row += 1) {
      vectors.push(Array.from(tensor.data.slice(row * width, (row + 1) * width)));
    }
  }
  if (vectors.length !== texts.length) {
    throw new Error("The local embedding model returned an unexpected batch.");
  }
  return vectors;
}

function textOf(output) {
  const first = Array.isArray(output) ? output[0] : output;
  const generated = first?.generated_text ?? first;
  if (typeof generated === "string") return generated.trim();
  if (Array.isArray(generated)) {
    const last = generated[generated.length - 1];
    if (typeof last === "string") return last.trim();
    if (last && typeof last.content === "string") return last.content.trim();
  }
  if (generated && typeof generated.content === "string") return generated.content.trim();
  return "";
}

export async function askLocal(prompt, { json = false } = {}) {
  try {
    if (!generatorPromise) {
      generatorPromise = transformers()
        .then(({ pipeline }) => pipeline("text2text-generation", LOCAL_LLM, { dtype: "q8", device: "cpu" }))
        .catch((error) => {
          generatorPromise = null;
          throw error;
        });
    }
    const generator = await generatorPromise;
    const clipped = prompt.length > 1800 ? `${prompt.slice(0, 1450)}\n\n${prompt.slice(-300)}` : prompt;
    const instruction = json
      ? "Reply with JSON only. No markdown."
      : "You are the BAIUST registry assistant in Cumilla. Be brief and use only the facts you are given.";
    const output = await generator(`${instruction}\n${clipped}`, {
      max_new_tokens: json ? 180 : 120,
      do_sample: false,
    });
    const text = textOf(output);
    if (!text) return { ok: false, message: "The local model returned an empty answer." };
    return { ok: true, text };
  } catch (error) {
    return { ok: false, message: error?.message || "The local model could not answer." };
  }
}
