import { router, useLocalSearchParams } from "expo-router";
import { Heart, MessageCircle, Star, type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, EmptyState } from "@/components/app-screen";
import { PortraitBlock } from "@/components/portrait";
import { Colors, Radius } from "@/constants/theme";
import { personById } from "@/main/data";
import { useMain } from "@/main/state";

export default function PersonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const person = personById(id ?? "");
  const { marks, setMark } = useMain();
  if (!person) {
    return (
      <AppScreen back title="Profile">
        <EmptyState body="That profile is not in this preview." title="Not found" />
      </AppScreen>
    );
  }
  const mark = marks[person.id];
  const blocks = [
    ["About", person.about],
    ["Education and career", `${person.education}. ${person.occupation}. ${person.income}.`],
    ["Family", person.family],
    ["Lifestyle", person.lifestyle],
    ["Looking for", person.lookingFor],
  ];

  return (
    <AppScreen back title={person.name}>
      <PortraitBlock gender={person.gender} height={260} />
      <View style={styles.facts}>
        <Text style={styles.lead}>
          {person.age} · {person.city} · {person.height}
        </Text>
        <Text style={styles.meta}>
          {person.community} · {person.religion} · {person.tongue}
        </Text>
        <Text style={styles.meta}>
          {person.marital} · Managed by {person.managedBy.toLowerCase()}
        </Text>
      </View>
      {blocks.map(([title, body]) => (
        <View key={title} style={styles.card}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>
      ))}
      {mark?.interest ? <Text style={styles.sent}>Interest sent. Their reply will show in Activity.</Text> : null}
      <View style={styles.actions}>
        <Action icon={Heart} label={mark?.interest ? "Sent" : "Interest"} onPress={() => setMark(person.id, "interest")} selected={mark?.interest} />
        <Action icon={Star} label="Shortlist" onPress={() => setMark(person.id, "shortlist")} selected={mark?.shortlist} />
        <Action icon={MessageCircle} label="Chat" onPress={() => router.push({ pathname: "/chat/[id]", params: { id: person.id } })} />
      </View>
    </AppScreen>
  );
}

function Action({ icon: Icon, label, onPress, selected }: { icon: LucideIcon; label: string; onPress: () => void; selected?: boolean }) {
  const color = selected ? Colors.ivory : Colors.burgundy;
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.button, selected ? styles.buttonOn : null]}>
      <Icon color={color} size={16} strokeWidth={2} />
      <Text style={[styles.buttonLabel, selected ? styles.buttonLabelOn : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  facts: { backgroundColor: Colors.white, borderRadius: Radius.card, padding: 16, gap: 4 },
  lead: { color: Colors.ink, fontSize: 16, fontWeight: "700" },
  meta: { color: Colors.muted, fontSize: 14, lineHeight: 20 },
  card: { backgroundColor: Colors.white, borderRadius: Radius.card, padding: 16, gap: 6 },
  cardTitle: { color: Colors.burgundy, fontSize: 13, fontWeight: "700" },
  body: { color: Colors.ink, fontSize: 15, lineHeight: 21 },
  sent: { color: Colors.teal, fontSize: 14, fontWeight: "600" },
  actions: { flexDirection: "row", gap: 8 },
  button: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: Colors.blush,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  buttonOn: { backgroundColor: Colors.burgundy },
  buttonLabel: { color: Colors.burgundy, fontWeight: "700" },
  buttonLabelOn: { color: Colors.ivory },
});
