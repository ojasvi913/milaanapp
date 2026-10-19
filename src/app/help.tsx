import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, Banner } from "@/components/app-screen";
import { PrimaryButton } from "@/components/buttons";
import { Field } from "@/components/field";
import { Colors, Radius } from "@/constants/theme";

const topics = ["How interests work", "Who can see my photos", "Membership, when it is ready"];

export default function HelpScreen() {
  const [topic, setTopic] = useState("My profile");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AppScreen back subtitle="This note stays on the screen. It is not sent." title="Help">
      {sent ? <Banner tone="ok">Noted. A reply would arrive by email once support is connected.</Banner> : null}
      {error ? <Banner tone="error">{error}</Banner> : null}
      <Field label="Topic" onChangeText={setTopic} value={topic} />
      <Field label="Message" multiline onChangeText={setMessage} value={message} />
      <PrimaryButton
        label="Send note"
        onPress={() => {
          if (message.trim().length < 4) {
            setSent(false);
            setError("Write a short message first.");
            return;
          }
          setError(null);
          setSent(true);
        }}
      />
      <View style={styles.list}>
        {topics.map((item) => (
          <Pressable accessibilityRole="button" key={item} onPress={() => setTopic(item)} style={styles.row}>
            <Text style={styles.rowLabel}>{item}</Text>
            <ChevronRight color={Colors.champagne} size={18} strokeWidth={2} />
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  list: { gap: 8 },
  row: { backgroundColor: Colors.white, borderRadius: Radius.card, padding: 16, minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  rowLabel: { color: Colors.ink, fontWeight: "700" },
});
