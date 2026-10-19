import { router } from "expo-router";
import { useState } from "react";

import { TextButton } from "@/components/buttons";
import { ChoiceCard } from "@/components/choice-card";
import { FormError, OnboardingFrame } from "@/components/onboarding-frame";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";

export default function CommunityScreen() {
  const { draft, update } = useDraft();
  const [error, setError] = useState<string | null>(null);

  function goNext() {
    update({ skipCommunity: false });
    router.push(nextStep(6));
  }

  return (
    <OnboardingFrame
      onContinue={() => {
        if (!draft.communityPreference) {
          setError("Choose how community should be used, or skip this step.");
          return;
        }
        goNext();
      }}
      step={6}
      subtitle="Share only what feels right. This can be kept off the public profile."
      title="Community"
    >
      <ChoiceCard
        hint="Show matches without this limit."
        onPress={() => update({ communityPreference: "open" })}
        selected={draft.communityPreference === "open"}
        title="Open beyond my community"
      />
      <ChoiceCard
        hint="You can still review others later."
        onPress={() => update({ communityPreference: "within" })}
        selected={draft.communityPreference === "within"}
        title="Prefer my community"
      />
      {error ? <FormError>{error}</FormError> : null}
      <TextButton
        label="Skip community details"
        onPress={() => {
          update({ skipCommunity: true, communityPreference: "open" });
          router.push(nextStep(6));
        }}
      />
    </OnboardingFrame>
  );
}
