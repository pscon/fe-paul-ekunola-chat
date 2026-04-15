function requireEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name]
  if (value === undefined || value === '') {
    throw new Error(
      `Missing ${String(name)}. Copy .env.example to .env and set values for local development.`,
    )
  }
  return value
}

export function getEnv() {
  return {
    apiBaseUrl: requireEnv('VITE_API_BASE_URL').replace(/\/$/, ''),
    authToken: requireEnv('VITE_AUTH_TOKEN'),
  }
}
