import { router } from "expo-router";
import { Text } from "react-native";

import { TextButton } from "@/components/buttons";
import { ChipGroup } from "@/components/chip";
import { Field } from "@/components/field";
import { OnboardingFrame } from "@/components/onboarding-frame";
import { Colors } from "@/constants/theme";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";

const INTERESTS = ["Hindustani music", "Cooking", "Travel", "Reading", "Cricket", "Trekking", "Films"] as const;
const DIET = ["Vegetarian", "Eggetarian", "Non-vegetarian", "Vegan"] as const;
const SMOKING = ["No", "Occasionally", "Yes"] as const;
const DRINKING = ["No", "Occasionally", "Yes"] as const;

export default function AboutScreen() {
  const { draft, update, toggleList } = useDraft();

  return (
    <OnboardingFrame
      onContinue={() => router.push(nextStep(10))}
      step={10}
      subtitle="A few lines in your own words. Every part of this screen can wait."
      title="About me"
    >
      <Field
        label="Bio"
        multiline
        onChangeText={(bio) => update({ bio })}
        optional
        placeholder="What a good evening looks like, and what matters at home."
        value={draft.bio}
      />
      <Text style={label}>Interests · Optional</Text>
      <ChipGroup onChange={(interest) => toggleList("interests", interest)} options={INTERESTS} value={draft.interests} />
      <Text style={label}>Diet · Optional</Text>
      <ChipGroup onChange={(diet) => update({ diet })} options={DIET} value={draft.diet} />
      <Text style={label}>Smoking · Optional</Text>
      <ChipGroup onChange={(smoking) => update({ smoking })} options={SMOKING} value={draft.smoking} />
      <Text style={label}>Drinking · Optional</Text>
      <ChipGroup onChange={(drinking) => update({ drinking })} options={DRINKING} value={draft.drinking} />
      <TextButton label="Skip lifestyle details" onPress={() => router.push(nextStep(10))} />
    </OnboardingFrame>
  );
}

const label = { color: Colors.ink, fontSize: 13, fontWeight: "600" as const };
