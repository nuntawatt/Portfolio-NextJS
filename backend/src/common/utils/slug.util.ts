// Utility functions for generating URL-friendly slugs from titles.
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric except spaces/hyphens
    .replace(/[\s-]+/g, '-') // Replace spaces/hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Trim hyphens from edges
}

/** Generates a unique slug by appending a numeric suffix if needed. */
export function generateUniqueSlug(
  title: string,
  existingSlugs: string[],
): string {
  const baseSlug = generateSlug(title);

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;
  let candidateSlug = `${baseSlug}-${suffix}`;

  while (existingSlugs.includes(candidateSlug)) {
    suffix++;
    candidateSlug = `${baseSlug}-${suffix}`;
  }

  return candidateSlug;
}
