import { Check } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/app-screen";
import { PrimaryButton } from "@/components/buttons";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";

const groups = {
  Age: ["24–28", "29–33", "34–38", "39–44"],
  Location: ["Same city", "Metro cities", "Anywhere in India"],
  Religion: ["Hindu", "Muslim", "Sikh", "Christian", "Jain"],
  Community: ["Open", "Same community"],
  Education: ["Bachelor's", "Master's", "Professional"],
  Work: ["Working", "Not a requirement"],
  Marital: ["Never married", "Divorced", "Widowed"],
  Activity: ["Active today", "With photos", "Just joined"],
  Photos: ["With photos", "Any"],
} as const;

type Group = keyof typeof groups;

export default function FiltersScreen() {
  const [group, setGroup] = useState<Group>("Age");
  const [picked, setPicked] = useState<Record<string, boolean>>({ "29–33": true });
  const options = groups[group];

  return (
    <AppScreen back subtitle="These choices are for show in this preview." title="Refine">
      <View style={styles.columns}>
        <View style={styles.rail}>
          {(Object.keys(groups) as Group[]).map((item) => (
            <Pressable accessibilityRole="button" key={item} onPress={() => setGroup(item)} style={[styles.cat, item === group ? styles.catOn : null]}>
              <Text style={[styles.catLabel, item === group ? styles.catLabelOn : null]}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.options}>
          {options.map((option) => {
            const on = Boolean(picked[option]);
            return (
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
                key={option}
                onPress={() => setPicked((current) => ({ ...current, [option]: !current[option] }))}
                style={styles.option}
              >
                <View style={[styles.box, on ? styles.boxOn : null]}>{on ? <Check color={Colors.ivory} size={14} strokeWidth={2.5} /> : null}</View>
                <Text style={styles.optionLabel}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <PrimaryButton label="Apply" onPress={() => router.back()} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  columns: { flexDirection: "row", backgroundColor: Colors.white, borderRadius: 16, overflow: "hidden", minHeight: 360 },
  rail: { width: 124, backgroundColor: Colors.blush },
  cat: { paddingHorizontal: 12, paddingVertical: 14 },
  catOn: { backgroundColor: Colors.ivory },
  catLabel: { color: Colors.ink, fontSize: 13, fontWeight: "600" },
  catLabelOn: { color: Colors.burgundy, fontWeight: "700" },
  options: { flex: 1, padding: 8 },
  option: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 44, paddingHorizontal: 8 },
  box: { width: 20, height: 20, borderRadius: 5, borderWidth: 1.5, borderColor: Colors.burgundy, backgroundColor: Colors.white, alignItems: "center", justifyContent: "center" },
  boxOn: { backgroundColor: Colors.burgundy },
  optionLabel: { color: Colors.ink, fontSize: 15, fontWeight: "600" },
});
