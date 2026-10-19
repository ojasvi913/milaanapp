import { router } from "expo-router";
import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton, TextButton } from "@/components/buttons";
import { Logo } from "@/components/logo";
import { Colors, Spacing } from "@/constants/theme";
import { previousStep, STEP_COUNT } from "@/onboarding/steps";

type OnboardingFrameProps = {
  step: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onContinue: () => void;
  continueLabel?: string;
  busy?: boolean;
  largeLogo?: boolean;
};

export function OnboardingFrame({
  step,
  title,
  subtitle,
  children,
  onContinue,
  continueLabel = "Continue",
  busy,
  largeLogo,
}: OnboardingFrameProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
        <View style={styles.column}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Logo large={largeLogo} />
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            <View style={styles.body}>{children}</View>
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.step}>
              Step {step} of {STEP_COUNT}
            </Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${(step / STEP_COUNT) * 100}%` }]} />
            </View>
            <View style={styles.actions}>
              {step > 1 ? (
                <TextButton label="Back" onPress={() => router.replace(previousStep(step))} />
              ) : (
                <View />
              )}
              <PrimaryButton busy={busy} label={continueLabel} onPress={onContinue} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function FormError({ children }: { children: string }) {
  return <Text style={styles.formError}>{children}</Text>;
}

export function Note({ children }: { children: string }) {
  return (
    <View style={styles.note}>
      <Text style={styles.noteText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.ivory,
  },
  column: {
    flex: 1,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  scroll: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
    gap: 14,
  },
  title: {
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", web: "Georgia, 'Times New Roman', serif", default: "serif" }),
    fontSize: 32,
    lineHeight: 38,
    color: Colors.burgundy,
  },
  subtitle: {
    marginTop: -6,
    color: Colors.muted,
    fontSize: 15,
    lineHeight: 21,
  },
  body: {
    gap: 14,
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
    gap: 10,
    backgroundColor: Colors.ivory,
  },
  step: {
    color: Colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  track: {
    height: 4,
    borderRadius: 99,
    backgroundColor: Colors.blush,
    overflow: "hidden",
  },
  fill: {
    height: 4,
    borderRadius: 99,
    backgroundColor: Colors.burgundy,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  note: {
    backgroundColor: Colors.blush,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.champagne,
  },
  noteText: {
    color: Colors.ink,
    fontSize: 13,
    lineHeight: 18,
  },
  formError: {
    color: Colors.burgundy,
    fontSize: 13,
  },
});
