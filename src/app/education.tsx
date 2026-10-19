import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

import { ChipGroup } from "@/components/chip";
import { Field } from "@/components/field";
import { FormError, Note, OnboardingFrame } from "@/components/onboarding-frame";
import { Colors } from "@/constants/theme";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";

const EMPLOYMENT = ["Private", "Government", "Business", "Not working"] as const;
const INCOME = ["Prefer not to say", "Below 10 L", "10–20 L", "20–35 L", "Above 35 L"] as const;

export default function EducationScreen() {
  const { draft, update } = useDraft();
  const [errors, setErrors] = useState<{ education?: string; field?: string; occupation?: string; employment?: string }>({});

  return (
    <OnboardingFrame
      onContinue={() => {
        const next: typeof errors = {};
        if (draft.education.trim().length < 2) next.education = "Enter the highest education.";
        if (draft.fieldOfStudy.trim().length < 2) next.field = "Enter a field of study.";
        if (draft.occupation.trim().length < 2) next.occupation = "Enter an occupation.";
        if (!draft.employment) next.employment = "Choose an employment type.";
        setErrors(next);
        if (Object.keys(next).length === 0) router.push(nextStep(8));
      }}
      step={8}
      subtitle="A clear picture of study and work. Income can be left unsaid."
      title="Education and work"
    >
      <Field autoCapitalize="words" error={errors.education} label="Highest education" onChangeText={(education) => update({ education })} placeholder="Master's degree" value={draft.education} />
      <Field autoCapitalize="words" error={errors.field} label="Field of study" onChangeText={(fieldOfStudy) => update({ fieldOfStudy })} placeholder="Computer science" value={draft.fieldOfStudy} />
      <Field autoCapitalize="words" error={errors.occupation} label="Occupation" onChangeText={(occupation) => update({ occupation })} placeholder="Product designer" value={draft.occupation} />
      <Text style={label}>Employment</Text>
      <ChipGroup onChange={(employment) => update({ employment })} options={EMPLOYMENT} value={draft.employment} />
      {errors.employment ? <FormError>{errors.employment}</FormError> : null}
      <Text style={label}>Annual income · Optional</Text>
      <ChipGroup onChange={(income) => update({ income })} options={INCOME} value={draft.income} />
      <Note>Income is never shown on the public profile unless you later choose to share it.</Note>
    </OnboardingFrame>
  );
}

const label = { color: Colors.ink, fontSize: 13, fontWeight: "600" as const };
