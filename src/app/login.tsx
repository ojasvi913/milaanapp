import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SecondaryButton, TextButton } from "@/components/buttons";
import { Field } from "@/components/field";
import { OnboardingFrame } from "@/components/onboarding-frame";
import { Colors } from "@/constants/theme";
import { startSession } from "@/lib/api/auth";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";
import { isEmail } from "@/onboarding/validate";

export default function LoginScreen() {
  const { draft, update } = useDraft();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function validate() {
    const next: { email?: string; password?: string } = {};
    if (!isEmail(draft.email)) next.email = "Enter a valid email address.";
    if (draft.password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function continueWith(provider: "password" | "google" | "phone") {
    if (provider === "password" && !validate()) return;
    setBusy(true);
    setNotice(null);
    try {
      await startSession(provider);
      if (!draft.contactEmail && isEmail(draft.email)) {
        update({ contactEmail: draft.email.trim() });
      }
      router.push(nextStep(1));
    } finally {
      setBusy(false);
    }
  }

  return (
    <OnboardingFrame
      busy={busy}
      continueLabel="Sign in"
      largeLogo
      onContinue={() => continueWith("password")}
      step={1}
      subtitle="Sign in to continue a considered search, for yourself or for family."
      title="Welcome back"
    >
      <Field
        autoCapitalize="none"
        error={errors.email}
        keyboardType="email-address"
        label="Email"
        onChangeText={(email) => {
          update({ email });
          setErrors((current) => ({ ...current, email: undefined }));
        }}
        placeholder="you@email.com"
        value={draft.email}
      />
      <Field
        autoCapitalize="none"
        error={errors.password}
        label="Password"
        onChangeText={(password) => {
          update({ password });
          setErrors((current) => ({ ...current, password: undefined }));
        }}
        placeholder="At least 8 characters"
        secureTextEntry
        value={draft.password}
      />
      <TextButton
        label="Forgot password"
        onPress={() => setNotice("A reset link will be sent once accounts are connected.")}
      />
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>or</Text>
        <View style={styles.line} />
      </View>
      <SecondaryButton label="Continue with Google" onPress={() => continueWith("google")} />
      <SecondaryButton label="Continue with phone number" onPress={() => continueWith("phone")} />
      <TextButton label="Create account" onPress={() => continueWith("password")} />
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  notice: {
    color: Colors.teal,
    fontSize: 13,
    lineHeight: 18,
    marginTop: -6,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.champagne,
  },
  or: {
    color: Colors.muted,
    fontSize: 13,
  },
});
