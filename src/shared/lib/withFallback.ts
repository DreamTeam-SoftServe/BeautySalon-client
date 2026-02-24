export async function withFallback<T>(
  apiFn: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    const result = await apiFn();
    return result ?? fallback;
  } catch {
    return fallback;
  }
}
