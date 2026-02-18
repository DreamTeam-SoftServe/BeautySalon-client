
import { ENV } from '../../shared/config/env'
import { ApiError } from '../api/api'
import { tokenStore } from '../api/tokenStore'

type FetchOptions = Omit<RequestInit, 'headers'> & { headers?: Record<string, string> }

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${ENV.API_BASE_URL}${path}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  }

  const token = tokenStore.get()
  if (token) headers['Authorization'] = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(url, {
      ...options,
      headers,
      // credentials: 'include'  ← uncomment for cookie-based auth
    })
  } catch {
    throw new ApiError(
      'Network error — cannot reach the server.',
      0,
      null
    )
  }

  if (response.status === 204) return null as T

  const ct = response.headers.get('content-type') ?? ''
  const body = ct.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message = (body as any)?.detail ?? (body as any)?.title ?? `HTTP ${response.status}`
    throw new ApiError(message, response.status, body)
  }

  return body as T
}

export const apiClient = {
  get:    <T>(path: string)              => apiFetch<T>(path, { method: 'GET' }),
  post:   <T>(path: string, data: unknown) => apiFetch<T>(path, { method: 'POST',   body: JSON.stringify(data) }),
  put:    <T>(path: string, data: unknown) => apiFetch<T>(path, { method: 'PUT',    body: JSON.stringify(data) }),
  delete: <T>(path: string)              => apiFetch<T>(path, { method: 'DELETE' }),
}
