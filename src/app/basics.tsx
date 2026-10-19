import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

import { ChipGroup } from "@/components/chip";
import { Field } from "@/components/field";
import { FormError, Note, OnboardingFrame } from "@/components/onboarding-frame";
import { Colors } from "@/constants/theme";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";
import { dobError } from "@/onboarding/validate";

const GENDERS = ["Woman", "Man", "Non-binary"] as const;

export default function BasicsScreen() {
  const { draft, update } = useDraft();
  const [errors, setErrors] = useState<{ name?: string; dob?: string; gender?: string }>({});

  function onContinue() {
    const next: typeof errors = {};
    if (draft.fullName.trim().length < 2) next.name = "Enter the full name.";
    const dateError = dobError(draft.dob);
    if (dateError) next.dob = dateError;
    if (!draft.gender) next.gender = "Choose a gender.";
    setErrors(next);
    if (Object.keys(next).length === 0) router.push(nextStep(3));
  }

  return (
    <OnboardingFrame
      onContinue={onContinue}
      step={3}
      subtitle="Age is shown on the profile. The full date stays private."
      title="The person seeking a partner"
    >
      <Field
        autoCapitalize="words"
        error={errors.name}
        label="Full name"
        onChangeText={(fullName) => update({ fullName })}
        placeholder="Ananya Sharma"
        value={draft.fullName}
      />
      <Field
        error={errors.dob}
        keyboardType="number-pad"
        label="Date of birth"
        maxLength={10}
        onChangeText={(value) => update({ dob: formatDob(value) })}
        placeholder="DD/MM/YYYY"
        value={draft.dob}
      />
      <Text style={{ color: Colors.ink, fontSize: 13, fontWeight: "600" }}>Gender</Text>
      <ChipGroup
        onChange={(gender) => update({ gender })}
        options={GENDERS}
        value={draft.gender}
      />
      {errors.gender ? <FormError>{errors.gender}</FormError> : null}
      <Note>This is only used to introduce the right person. You can edit it later.</Note>
    </OnboardingFrame>
  );
}

function formatDob(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
  return parts.join("/");
}
