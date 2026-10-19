const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** True once EXPO_PUBLIC_API_URL is set. Screens should not check this themselves. */
export function isApiConfigured() {
  return Boolean(API_URL);
}

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string | null;
};

/**
 * The only function that talks to the server.
 * Leave EXPO_PUBLIC_API_URL empty until Cloud Run exists; service functions
 * fall back to local behavior when it is unset.
 */
export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  if (!API_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not set");
  }

  const { body, token, headers, ...rest } = options;
  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new ApiError(message || response.statusText, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
