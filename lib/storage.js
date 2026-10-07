export async function uploadMedia(client, file, folder) {
  if (!file || typeof file === "string" || !file.size) return { url: null, error: null };
  if (!file.type?.startsWith("image/")) return { url: null, error: "Upload a JPG, PNG, or WebP image." };
  if (file.size > 5 * 1024 * 1024) return { url: null, error: "Image must be under 5 MB." };

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await client.storage.from("media").upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return { url: null, error: error.message };
  const { data } = client.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
