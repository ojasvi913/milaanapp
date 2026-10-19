import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextButton } from "@/components/buttons";
import { ChoiceCard } from "@/components/choice-card";
import { Note, OnboardingFrame } from "@/components/onboarding-frame";
import { Colors, Radius } from "@/constants/theme";
import { useDraft } from "@/onboarding/draft";
import { nextStep } from "@/onboarding/steps";

const VISIBILITY = [
  ["Accepted interests only", "People see photos after you accept them."],
  ["All matches", "Visible to people who can view the profile."],
  ["Hidden until I choose", "The profile stays without photos for now."],
] as const;

export default function PhotosScreen() {
  const { draft, update } = useDraft();

  async function pick(slot: "profile" | number) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });
    if (result.canceled) return;
    const uri = result.assets[0]?.uri;
    if (!uri) return;
    if (slot === "profile") {
      update({ profilePhoto: uri });
      return;
    }
    const extraPhotos = [...draft.extraPhotos];
    extraPhotos[slot] = uri;
    update({ extraPhotos });
  }

  return (
    <OnboardingFrame
      onContinue={() => router.push(nextStep(11))}
      step={11}
      subtitle="A clear face photo helps families trust the profile. You choose who can see it."
      title="Photos"
    >
      <Pressable accessibilityRole="button" onPress={() => pick("profile")} style={styles.hero}>
        {draft.profilePhoto ? (
          <Image contentFit="cover" source={{ uri: draft.profilePhoto }} style={styles.heroImage} />
        ) : (
          <Text style={styles.heroText}>Add a profile picture</Text>
        )}
      </Pressable>
      <View style={styles.row}>
        {[0, 1, 2].map((slot) => {
          const uri = draft.extraPhotos[slot];
          return (
            <Pressable accessibilityRole="button" key={slot} onPress={() => pick(slot)} style={styles.slot}>
              {uri ? (
                <Image contentFit="cover" source={{ uri }} style={styles.slotImage} />
              ) : (
                <Text style={styles.slotText}>Add</Text>
              )}
            </Pressable>
          );
        })}
      </View>
      {VISIBILITY.map(([title, hint]) => (
        <ChoiceCard
          hint={hint}
          key={title}
          onPress={() => update({ photoVisibility: title })}
          selected={draft.photoVisibility === title}
          title={title}
        />
      ))}
      <Note>You can change photo privacy whenever you like. Nothing is uploaded to a server in this preview.</Note>
      <TextButton label="Skip photos for now" onPress={() => router.push(nextStep(11))} />
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 180,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.champagne,
    backgroundColor: Colors.blush,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroText: {
    color: Colors.burgundy,
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  slot: {
    flex: 1,
    height: 84,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.champagne,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  slotImage: {
    width: "100%",
    height: "100%",
  },
  slotText: {
    color: Colors.teal,
    fontWeight: "600",
  },
});
