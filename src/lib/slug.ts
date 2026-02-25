/**
 * Slug utilities for generating deterministic IDs from entity data.
 * Used by both export/import and normalize-import.
 */

export const slugRegex = /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u;

export function slugify(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || fallback;
}

export function ensureUniqueSlug(base: string, used: Map<string, number>): string {
  const count = used.get(base) ?? 0;
  if (count === 0) {
    used.set(base, 1);
    return base;
  }

  const next = count + 1;
  used.set(base, next);
  return `${base}-${next}`;
}

export function buildJobSlug(job: { company: string; role: string; startDate: string }): string {
  return slugify(`${job.company}-${job.role}-${job.startDate}`, 'job');
}

export function buildHighlightSlug(
  highlight: { title: string; startDate: string },
  jobSlug?: string | null
): string {
  const base = jobSlug
    ? `${jobSlug}-${highlight.title}-${highlight.startDate}`
    : `${highlight.title}-${highlight.startDate}`;
  return slugify(base, 'highlight');
}

export async function uuidFromSlug(slug: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`build-cv:${slug}`);
  let hashBytes: Uint8Array;

  if (globalThis.crypto?.subtle) {
    const hash = await globalThis.crypto.subtle.digest('SHA-1', data);
    hashBytes = new Uint8Array(hash);
  } else {
    const { createHash } = await import('crypto');
    hashBytes = new Uint8Array(createHash('sha1').update(data).digest());
  }

  const bytes = hashBytes.slice(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
