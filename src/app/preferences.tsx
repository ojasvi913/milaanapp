import { router } from "expo-router";
import { Text } from "react-native";

import { TextButton } from "@/components/buttons";
import { ChipGroup } from "@/components/chip";
import { Field } from "@/components/field";
import { Note, OnboardingFrame } from "@/components/onboarding-frame";
import { Colors } from "@/constants/theme";
import { useDraft } from "@/onboarding/draft";

const OCCUPATION = ["No preference", "Working", "Not a requirement"] as const;
const COMMUNITY = ["Open beyond my community", "Prefer my community"] as const;
const TIMELINE = ["Within a year", "1–2 years", "Flexible"] as const;

export default function PreferencesScreen() {
  const { draft, update } = useDraft();

  function save(patch: Partial<typeof draft> = {}) {
    update({
      preferredOccupation: draft.preferredOccupation ?? "No preference",
      preferredCommunity: draft.preferredCommunity ?? "Open beyond my community",
      marriageTimeline: draft.marriageTimeline ?? "Flexible",
      preferencesSaved: true,
      ...patch,
    });
  }

  return (
    <OnboardingFrame
      continueLabel={draft.preferencesSaved ? "Go to matches" : "Save preferences"}
      onContinue={() => {
        save();
        router.replace("/matches");
      }}
      step={12}
      subtitle="Leave anything open. A flexible preference is a complete answer."
      title="Partner preferences"
    >
      <Field
        keyboardType="number-pad"
        label="Preferred age from"
        maxLength={2}
        onChangeText={(ageMin) => update({ ageMin: ageMin.replace(/\D/g, ""), preferencesSaved: false })}
        optional
        placeholder="26"
        value={draft.ageMin}
      />
      <Field
        keyboardType="number-pad"
        label="Preferred age to"
        maxLength={2}
        onChangeText={(ageMax) => update({ ageMax: ageMax.replace(/\D/g, ""), preferencesSaved: false })}
        optional
        placeholder="32"
        value={draft.ageMax}
      />
      <Field
        autoCapitalize="words"
        label="Preferred location"
        onChangeText={(preferredLocation) => update({ preferredLocation, preferencesSaved: false })}
        optional
        placeholder="Maharashtra, open to other cities"
        value={draft.preferredLocation}
      />
      <Field
        autoCapitalize="sentences"
        label="Preferred education"
        onChangeText={(preferredEducation) => update({ preferredEducation, preferencesSaved: false })}
        optional
        placeholder="Bachelor's or above"
        value={draft.preferredEducation}
      />
      <Text style={label}>Occupation</Text>
      <ChipGroup
        onChange={(preferredOccupation) => update({ preferredOccupation, preferencesSaved: false })}
        options={OCCUPATION}
        value={draft.preferredOccupation}
      />
      <Text style={label}>Community</Text>
      <ChipGroup
        onChange={(preferredCommunity) => update({ preferredCommunity, preferencesSaved: false })}
        options={COMMUNITY}
        value={draft.preferredCommunity}
      />
      <Text style={label}>Marriage timeline</Text>
      <ChipGroup
        onChange={(marriageTimeline) => update({ marriageTimeline, preferencesSaved: false })}
        options={TIMELINE}
        value={draft.marriageTimeline}
      />
      <TextButton label="Skip remaining preferences" onPress={() => save()} />
      {draft.preferencesSaved ? (
        <Note>Saved on this device. Discovery, chat, and a homepage come only when you ask for them.</Note>
      ) : null}
    </OnboardingFrame>
  );
}

const label = { color: Colors.ink, fontSize: 13, fontWeight: "600" as const };
