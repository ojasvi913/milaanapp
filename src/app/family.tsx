import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

import { ChipGroup } from "@/components/chip";
import { Field } from "@/components/field";
import { FormError, Note, OnboardingFrame } from "@/components/onboarding-frame";
import { Colors } from "@/constants/theme";
import { asksForChildren, useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";

const MARITAL = ["Never married", "Divorced", "Widowed", "Awaiting divorce"] as const;
const CHILDREN = ["No children", "One child", "More than one"] as const;

export default function FamilyScreen() {
  const { draft, update } = useDraft();
  const [errors, setErrors] = useState<{ height?: string; marital?: string; children?: string }>({});
  const showChildren = asksForChildren(draft.maritalStatus);

  return (
    <OnboardingFrame
      onContinue={() => {
        const next: typeof errors = {};
        if (draft.height.trim().length < 2) next.height = "Enter a height.";
        if (!draft.maritalStatus) next.marital = "Choose a marital status.";
        if (showChildren && !draft.children) next.children = "Add whether there are children.";
        setErrors(next);
        if (Object.keys(next).length === 0) router.push(nextStep(9));
      }}
      step={9}
      subtitle="Families read this closely. Share the outline, and leave the rest for later."
      title="Personal and family"
    >
      <Field label="Height" onChangeText={(height) => update({ height })} placeholder="5 ft 4 in" value={draft.height} error={errors.height} />
      <Text style={label}>Marital status</Text>
      <ChipGroup
        onChange={(maritalStatus) => update({ maritalStatus, children: maritalStatus === "Never married" ? null : draft.children })}
        options={MARITAL}
        value={draft.maritalStatus}
      />
      {errors.marital ? <FormError>{errors.marital}</FormError> : null}
      {showChildren ? (
        <>
          <Note>This appears because the marital status is not “never married”.</Note>
          <Text style={label}>Children</Text>
          <ChipGroup onChange={(children) => update({ children })} options={CHILDREN} value={draft.children} />
          {errors.children ? <FormError>{errors.children}</FormError> : null}
        </>
      ) : null}
      <Field
        label="Family background"
        multiline
        onChangeText={(familyBackground) => update({ familyBackground })}
        optional
        placeholder="A short note about the family."
        value={draft.familyBackground}
      />
    </OnboardingFrame>
  );
}

const label = { color: Colors.ink, fontSize: 13, fontWeight: "600" as const };
