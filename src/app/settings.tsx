import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/app-screen";
import { Colors, Radius } from "@/constants/theme";

const links = [
  ["/edit-profile", "Edit profile", "Name, work, family, about"],
  ["/edit-preferences", "Partner preferences", "Age, location, community"],
  ["/edit-photos", "Photos", "Portraits and who can see them"],
  ["/notifications", "Notifications", "Interests, visits, messages"],
  ["/privacy", "Privacy", "What matches can see"],
  ["/account", "Account", "Email, phone, sign out"],
  ["/help", "Help", "Write to us"],
] as const;

export default function SettingsScreen() {
  return (
    <AppScreen back title="Settings">
      {links.map(([href, title, hint]) => (
        <Pressable accessibilityRole="button" key={href} onPress={() => router.push(href)} style={styles.row}>
          <View style={styles.copy}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.hint}>{hint}</Text>
          </View>
          <ChevronRight color={Colors.champagne} size={20} strokeWidth={2} />
        </Pressable>
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
    minHeight: 64,
  },
  copy: { flex: 1, gap: 2 },
  title: { color: Colors.ink, fontSize: 16, fontWeight: "700" },
  hint: { color: Colors.muted, fontSize: 13 },
});
