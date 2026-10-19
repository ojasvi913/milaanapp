import { router } from "expo-router";
import { useState } from "react";

import { ChoiceCard } from "@/components/choice-card";
import { FormError, OnboardingFrame } from "@/components/onboarding-frame";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";

const OPTIONS = [
  ["Myself", "I am looking for a partner."],
  ["My son or daughter", "I am creating this with them."],
  ["My brother or sister", "I am helping a sibling."],
  ["A relative", "For someone else in the family."],
  ["A friend", "With their knowledge."],
] as const;

export default function OwnershipScreen() {
  const { draft, update } = useDraft();
  const [error, setError] = useState<string | null>(null);

  return (
    <OnboardingFrame
      onContinue={() => {
        if (!draft.ownership) {
          setError("Choose who this profile is for.");
          return;
        }
        router.push(nextStep(2));
      }}
      step={2}
      subtitle="This keeps the search respectful, and lets family take part without confusion."
      title="Who is this profile for?"
    >
      {OPTIONS.map(([title, hint]) => (
        <ChoiceCard
          hint={hint}
          key={title}
          onPress={() => {
            update({ ownership: title });
            setError(null);
          }}
          selected={draft.ownership === title}
          title={title}
        />
      ))}
      {error ? <FormError>{error}</FormError> : null}
    </OnboardingFrame>
  );
}
