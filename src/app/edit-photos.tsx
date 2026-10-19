import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/app-screen";
import { PortraitBlock } from "@/components/portrait";
import { Colors, Radius } from "@/constants/theme";

const options = ["Accepted interests only", "All matches", "Hidden until I choose"] as const;

export default function EditPhotosScreen() {
  const [visibility, setVisibility] = useState<(typeof options)[number]>("Accepted interests only");

  return (
    <AppScreen back subtitle="A simple portrait stands in until a photograph is added." title="Photos">
      <View style={styles.row}>
        <View style={styles.tile}>
          <PortraitBlock gender="f" height={140} />
          <Text style={styles.caption}>Main</Text>
        </View>
        <View style={[styles.tile, styles.add]}>
          <Plus color={Colors.burgundy} size={28} strokeWidth={2} />
          <Text style={styles.addLabel}>Add</Text>
        </View>
      </View>
      {options.map((option) => {
        const selected = option === visibility;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={option}
            onPress={() => setVisibility(option)}
            style={[styles.choice, selected ? styles.choiceOn : null]}
          >
            <Text style={[styles.choiceLabel, selected ? styles.choiceLabelOn : null]}>{option}</Text>
          </Pressable>
        );
      })}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  tile: { flex: 1, gap: 8 },
  caption: { color: Colors.burgundy, fontWeight: "700", textAlign: "center" },
  add: {
    minHeight: 140,
    borderRadius: Radius.card,
    backgroundColor: Colors.blush,
    alignItems: "center",
    justifyContent: "center",
  },
  addLabel: { color: Colors.burgundy, fontSize: 16, fontWeight: "700" },
  choice: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  choiceOn: { backgroundColor: Colors.burgundy },
  choiceLabel: { color: Colors.ink, fontWeight: "700" },
  choiceLabelOn: { color: Colors.ivory },
});
