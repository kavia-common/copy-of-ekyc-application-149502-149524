const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

type ApiResult<T> = { ok: true; data: T } | { ok: false; error?: string };

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      ...init
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
      return { ok: false, error: data?.message || `HTTP ${res.status}` };
    }
    return { ok: true, data };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Network error' };
  }
}

// PUBLIC_INTERFACE
export async function registerUser(payload: { email: string; mobile: string; password: string; }): Promise<ApiResult<{ id: number; email: string; mobile: string }>> {
  /** Calls backend register API. */
  return request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function loginUser(payload: { identifier: string; password: string; }): Promise<ApiResult<{ token: string; user: any }>> {
  /** Calls backend login API. */
  return request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function getBankDetails(): Promise<ApiResult<any>> {
  /** Gets current bank details for authenticated user. Token handling omitted in demo. */
  return request('/api/bank-details', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function updateBankDetails(payload: {
  accountNumber: string;
  confirmAccountNumber: string;
  ifsc: string;
  fullNameForESign: string;
  agreeESign: boolean;
  reasonForChange: string;
  critical?: boolean;
  reauthPassword?: string;
}): Promise<ApiResult<any>> {
  /** Updates bank details with e-sign binding fields. */
  return request('/api/bank-details', { method: 'PUT', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function lookupIfsc(ifsc: string): Promise<ApiResult<{ branch: string }>> {
  /** Demo IFSC lookup; in real scenario call backend proxy or external service. */
  // For demo purposes, return mocked branch if format valid
  if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
    return Promise.resolve({ ok: true, data: { branch: 'Demo Branch, Mumbai' } });
  }
  return Promise.resolve({ ok: false, error: 'Invalid IFSC' });
}
