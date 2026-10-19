import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import { AppScreen } from "@/components/app-screen";
import { Colors, Radius } from "@/constants/theme";

const initial = [
  ["Photos", "Accepted interests only"],
  ["Phone number", "Hidden"],
  ["Income", "Hidden"],
  ["Last seen", "Visible to matches"],
  ["Discoverable", "On"],
] as const;

export default function PrivacyScreen() {
  const [on, setOn] = useState<Record<string, boolean>>({
    Photos: true,
    "Phone number": true,
    Income: true,
    "Last seen": true,
    Discoverable: true,
  });

  return (
    <AppScreen back subtitle="Each switch is only a preference on this screen." title="Privacy">
      {initial.map(([title, hint]) => (
        <View key={title} style={styles.row}>
          <View style={styles.copy}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.hint}>{on[title] ? hint : "Off"}</Text>
          </View>
          <Switch
            onValueChange={(value) => setOn((current) => ({ ...current, [title]: value }))}
            thumbColor={Colors.ivory}
            trackColor={{ false: Colors.rose, true: Colors.teal }}
            value={on[title]}
          />
        </View>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    padding: 16,
  },
  copy: { flex: 1, gap: 2 },
  title: { color: Colors.ink, fontSize: 16, fontWeight: "700" },
  hint: { color: Colors.muted, fontSize: 13 },
});
