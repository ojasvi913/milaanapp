import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TextButton } from "@/components/buttons";
import { Field } from "@/components/field";
import { Note, OnboardingFrame } from "@/components/onboarding-frame";
import { Colors, Radius } from "@/constants/theme";
import { requestEmailVerification, requestPhoneOtp } from "@/lib/api/auth";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";
import { isEmail, isIndianMobile } from "@/onboarding/validate";

export default function ContactScreen() {
  const { draft, update } = useDraft();
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [sending, setSending] = useState<"phone" | "email" | null>(null);

  async function sendPhoneCode() {
    if (!isIndianMobile(draft.phone)) {
      setErrors((current) => ({ ...current, phone: "Enter a 10-digit mobile number." }));
      return;
    }
    setSending("phone");
    await requestPhoneOtp(`+91${draft.phone}`);
    update({ phoneCodeSent: true });
    setSending(null);
  }

  async function sendEmailCode() {
    if (!isEmail(draft.contactEmail)) {
      setErrors((current) => ({ ...current, email: "Enter a valid email address." }));
      return;
    }
    setSending("email");
    await requestEmailVerification(draft.contactEmail.trim());
    update({ emailVerified: true });
    setSending(null);
  }

  function onContinue() {
    const next: typeof errors = {};
    if (!isIndianMobile(draft.phone)) next.phone = "Enter a 10-digit mobile number.";
    if (!isEmail(draft.contactEmail)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length === 0) router.push(nextStep(4));
  }

  const codeMatches = draft.otp.length === 4;

  return (
    <OnboardingFrame
      onContinue={onContinue}
      step={4}
      subtitle="These secure the account. They stay hidden until you accept a conversation."
      title="How we reach you"
    >
      <Field
        error={errors.phone}
        keyboardType="number-pad"
        label="Phone number"
        maxLength={10}
        onChangeText={(value) => update({ phone: value.replace(/\D/g, "").slice(0, 10), phoneCodeSent: false, otp: "" })}
        placeholder="98765 43210"
        prefix="+91"
        value={draft.phone}
      />
      <TextButton label={sending === "phone" ? "Sending code…" : "Send code"} onPress={sendPhoneCode} />
      {draft.phoneCodeSent ? (
        <View style={styles.otpBlock}>
          <Field
            hint={codeMatches ? undefined : "Enter the 4-digit code from the message."}
            keyboardType="number-pad"
            label="Verification code"
            maxLength={4}
            onChangeText={(otp) => update({ otp: otp.replace(/\D/g, "").slice(0, 4) })}
            placeholder="4821"
            value={draft.otp}
          />
          {codeMatches ? <Text style={styles.match}>Code matches</Text> : null}
        </View>
      ) : null}
      <Field
        autoCapitalize="none"
        error={errors.email}
        keyboardType="email-address"
        label="Email"
        onChangeText={(contactEmail) => update({ contactEmail, emailVerified: false })}
        placeholder="you@email.com"
        value={draft.contactEmail}
      />
      <TextButton
        label={draft.emailVerified ? "Email verified" : sending === "email" ? "Sending…" : "Verify email"}
        onPress={sendEmailCode}
      />
      <Note>A code confirms the number is yours. You can finish verification later if you are helping someone else.</Note>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  otpBlock: {
    gap: 8,
  },
  match: {
    color: Colors.teal,
    fontSize: 13,
    fontWeight: "600",
    backgroundColor: Colors.blush,
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
