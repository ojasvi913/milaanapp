import { router } from "expo-router";
import { useState } from "react";

import { Note, OnboardingFrame } from "@/components/onboarding-frame";
import { SelectField } from "@/components/select-field";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";

const RELIGIONS: readonly string[] = [];
const MOTHER_TONGUES: readonly string[] = [];
const LANGUAGES: readonly string[] = [];
const CASTES: readonly string[] = [];
const SUBCASTES: readonly string[] = [];

export default function ReligionScreen() {
  const { draft, update } = useDraft();
  const [errors, setErrors] = useState<{ religion?: string; tongue?: string; caste?: string }>({});

  return (
    <OnboardingFrame
      onContinue={() => {
        const next: typeof errors = {};
        if (RELIGIONS.length > 0 && !draft.religion) next.religion = "Choose a religion.";
        if (MOTHER_TONGUES.length > 0 && !draft.motherTongue) next.tongue = "Choose a mother tongue.";
        if (CASTES.length > 0 && !draft.caste) next.caste = "Choose a caste.";
        setErrors(next);
        if (Object.keys(next).length === 0) router.push(nextStep(5));
      }}
      step={5}
      subtitle="Used for compatibility. You can keep both private on the profile."
      title="Faith and language"
    >
      <SelectField
        error={errors.religion}
        label="Religion"
        onChange={(religion) => update({ religion })}
        options={RELIGIONS}
        value={draft.religion}
      />
      <SelectField
        error={errors.tongue}
        label="Mother tongue"
        onChange={(motherTongue) => update({ motherTongue })}
        options={MOTHER_TONGUES}
        value={draft.motherTongue}
      />
      <SelectField
        label="Languages spoken"
        onChange={(language) => update({ languages: language })}
        optional
        options={LANGUAGES}
        value={draft.languages}
      />
      <SelectField
        error={errors.caste}
        label="Caste"
        onChange={(caste) => update({ caste })}
        options={CASTES}
        value={draft.caste}
      />
      <SelectField
        label="Sub-caste"
        onChange={(subCaste) => update({ subCaste })}
        optional
        options={SUBCASTES}
        value={draft.subCaste}
      />
      <Note>Language helps families start a conversation. It is not a filter unless you later choose that.</Note>
    </OnboardingFrame>
  );
}
