// shared/lib/withFallback.ts
// Tries apiFn; silently returns fallback on any error.
// Remove in production — let error states render instead.
export async function withFallback<T>(
  apiFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    const result = await apiFn()
    return result ?? fallback
  } catch {
    return fallback
  }
}
