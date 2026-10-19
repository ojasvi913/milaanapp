import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { AppScreen, Banner } from "@/components/app-screen";
import { Field } from "@/components/field";
import { Colors, Radius } from "@/constants/theme";

export default function AccountScreen() {
  const [confirming, setConfirming] = useState(false);

  return (
    <AppScreen back title="Account">
      <Field label="Email" onChangeText={() => undefined} value="aanya@email.com" />
      <Field label="Phone" onChangeText={() => undefined} value="+91 98450 11220" />
      {confirming ? <Banner tone="error">Deleting an account is not connected yet.</Banner> : null}
      <Pressable accessibilityRole="button" onPress={() => router.replace("/login")} style={styles.signOut}>
        <LogOut color={Colors.burgundy} size={18} strokeWidth={2} />
        <Text style={styles.signOutLabel}>Sign out</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => setConfirming(true)}>
        <Text style={styles.delete}>Delete account</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  signOut: {
    minHeight: 52,
    borderRadius: Radius.field,
    backgroundColor: Colors.blush,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  signOutLabel: { color: Colors.burgundy, fontSize: 16, fontWeight: "700" },
  delete: { color: Colors.burgundy, fontSize: 14, fontWeight: "700", textAlign: "center", paddingVertical: 8 },
});
