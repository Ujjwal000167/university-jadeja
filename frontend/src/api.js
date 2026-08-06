const BASE = '/api/v1';

function getToken() {
  return localStorage.getItem('jadeja_token');
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}
