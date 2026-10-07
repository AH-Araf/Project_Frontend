export function media(path) {
  return `/media/${String(path)
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}
