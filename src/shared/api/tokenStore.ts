// shared/api/tokenStore.ts
// In-memory JWT store. Swap to httpOnly cookie in production.
let _token: string | null = null

export const tokenStore = {
  get: ()            => _token,
  set: (t: string)   => { _token = t },
  clear: ()          => { _token = null },
}
