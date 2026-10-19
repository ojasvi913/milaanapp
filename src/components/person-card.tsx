import { router } from "expo-router";
import { Heart, MessageCircle, Star, X, type LucideIcon } from "lucide-react-native";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { PortraitBlock } from "@/components/portrait";
import { Colors, Radius } from "@/constants/theme";
import type { Person } from "@/main/data";
import type { Mark } from "@/main/state";

const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  web: "Georgia, 'Times New Roman', serif",
  default: "serif",
});

const actions: { action: Mark | "chat"; label: string; icon: LucideIcon }[] = [
  { action: "interest", label: "Interest", icon: Heart },
  { action: "shortlist", label: "Shortlist", icon: Star },
  { action: "ignore", label: "Ignore", icon: X },
  { action: "chat", label: "Chat", icon: MessageCircle },
];

export function PersonCard({
  person,
  onDecide,
  onChat,
}: {
  person: Person;
  onDecide: (mark: Mark) => void;
  onChat: () => void;
}) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push({ pathname: "/person/[id]", params: { id: person.id } })}
        style={styles.body}
      >
        <PortraitBlock fill gender={person.gender} />
        <View style={styles.status}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{person.status}</Text>
        </View>
        <View style={styles.copy}>
          <Text style={styles.name}>
            {person.name}, {person.age}
          </Text>
          <Text style={styles.meta}>
            {person.height} · {person.city} · {person.community}
          </Text>
          <Text style={styles.work}>
            {person.occupation} · {person.education}
          </Text>
          <Text style={styles.income}>{person.income}</Text>
          <Text style={styles.managed}>Managed by {person.managedBy.toLowerCase()}</Text>
        </View>
      </Pressable>
      <View style={styles.actions}>
        {actions.map(({ action, label, icon: Icon }) => {
          const primary = action === "interest";
          return (
            <Pressable
              accessibilityRole="button"
              key={action}
              onPress={() => (action === "chat" ? onChat() : onDecide(action))}
              style={styles.action}
            >
              <View style={[styles.orb, primary ? styles.orbPrimary : null]}>
                <Icon color={primary ? Colors.ivory : Colors.burgundy} size={20} strokeWidth={2} />
              </View>
              <Text style={[styles.actionLabel, primary ? styles.actionLabelOn : null]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: "hidden",
  },
  body: { flex: 1 },
  status: {
    position: "absolute",
    top: 14,
    left: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.tealSoft,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.teal },
  statusText: { color: Colors.teal, fontSize: 12, fontWeight: "700" },
  copy: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4, gap: 3 },
  name: { fontFamily: serif, fontSize: 26, lineHeight: 32, color: Colors.ink },
  meta: { color: Colors.muted, fontSize: 14, lineHeight: 20 },
  work: { color: Colors.ink, fontSize: 14, fontWeight: "600" },
  income: { color: Colors.muted, fontSize: 13 },
  managed: { color: Colors.burgundy, fontSize: 13, fontWeight: "600", marginTop: 2 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.blush,
  },
  action: { flex: 1, minHeight: 64, alignItems: "center", justifyContent: "center", gap: 6 },
  orb: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.blush, alignItems: "center", justifyContent: "center" },
  orbPrimary: { backgroundColor: Colors.burgundy },
  actionLabel: { color: Colors.muted, fontSize: 11, fontWeight: "700" },
  actionLabelOn: { color: Colors.burgundy },
});
