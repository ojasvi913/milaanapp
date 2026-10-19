import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

import { ChipGroup } from "@/components/chip";
import { Field } from "@/components/field";
import { FormError, OnboardingFrame } from "@/components/onboarding-frame";
import { Colors } from "@/constants/theme";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";

const RESIDENCY = ["Citizen of India", "OCI", "Living abroad"] as const;

export default function LocationScreen() {
  const { draft, update } = useDraft();
  const [errors, setErrors] = useState<{ city?: string; state?: string; country?: string; residency?: string }>({});

  return (
    <OnboardingFrame
      onContinue={() => {
        const next: typeof errors = {};
        if (draft.city.trim().length < 2) next.city = "Enter the current city.";
        if (draft.state.trim().length < 2) next.state = "Enter the state.";
        if (draft.country.trim().length < 2) next.country = "Enter the country.";
        if (!draft.residency) next.residency = "Choose a residency status.";
        setErrors(next);
        if (Object.keys(next).length === 0) router.push(nextStep(7));
      }}
      step={7}
      subtitle="Current city helps nearby matches. Hometown can stay blank."
      title="Where life is based"
    >
      <Field autoCapitalize="words" error={errors.city} label="Current city" onChangeText={(city) => update({ city })} placeholder="Pune" value={draft.city} />
      <Field autoCapitalize="words" error={errors.state} label="State" onChangeText={(state) => update({ state })} placeholder="Maharashtra" value={draft.state} />
      <Field autoCapitalize="words" error={errors.country} label="Country" onChangeText={(country) => update({ country })} placeholder="India" value={draft.country} />
      <Field autoCapitalize="words" label="Hometown" onChangeText={(hometown) => update({ hometown })} optional placeholder="Indore" value={draft.hometown} />
      <Text style={{ color: Colors.ink, fontSize: 13, fontWeight: "600" }}>Residency</Text>
      <ChipGroup onChange={(residency) => update({ residency })} options={RESIDENCY} value={draft.residency} />
      {errors.residency ? <FormError>{errors.residency}</FormError> : null}
    </OnboardingFrame>
  );
}
