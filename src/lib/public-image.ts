export function publicImageSrc(path: string | undefined | null): string {
  if (!path) return "";
  const lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return `${path.slice(0, lastSlash + 1)}${encodeURIComponent(path.slice(lastSlash + 1))}`;
}
