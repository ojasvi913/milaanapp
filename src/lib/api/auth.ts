import { api, isApiConfigured } from "@/lib/api/client";

export type PhoneOtpRequest = {
  phoneE164: string;
};

export type PhoneOtpResponse = {
  phoneE164: string;
};

/**
 * Asks the API to text a login code.
 * With no API URL configured, this resolves locally so the screen can be built first.
 * The real call is POST /v1/auth/phone/otp.
 */
export type AuthProvider = "password" | "google" | "phone";

export async function startSession(provider: AuthProvider) {
  if (isApiConfigured()) {
    return api<{ provider: AuthProvider }>("/v1/auth/session", {
      method: "POST",
      body: { provider },
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  return { provider };
}

export async function requestEmailVerification(email: string) {
  if (isApiConfigured()) {
    return api<{ email: string }>("/v1/auth/email/otp", {
      method: "POST",
      body: { email },
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  return { email };
}

export async function requestPhoneOtp(phoneE164: string): Promise<PhoneOtpResponse> {
  if (isApiConfigured()) {
    return api<PhoneOtpResponse>("/v1/auth/phone/otp", {
      method: "POST",
      body: { phoneE164 } satisfies PhoneOtpRequest,
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 450));
  return { phoneE164 };
}
