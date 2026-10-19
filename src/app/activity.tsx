import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, EmptyState } from "@/components/app-screen";
import { Portrait } from "@/components/portrait";
import { Colors, Radius } from "@/constants/theme";
import { people, received, visits } from "@/main/data";
import { useMain } from "@/main/state";

const tabs = ["Received", "Sent", "Visits", "Saved"] as const;

export default function ActivityScreen() {
  const { marks } = useMain();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Received");

  const sent = people
    .filter((person) => marks[person.id]?.interest)
    .map((person) => ({ id: person.id, line: "Interest sent", when: "Now" }));
  const saved = people
    .filter((person) => marks[person.id]?.shortlist)
    .map((person) => ({ id: person.id, line: `${person.city} · ${person.occupation}`, when: "Saved" }));
  const rows = tab === "Received" ? received : tab === "Sent" ? sent : tab === "Visits" ? visits : saved;

  return (
    <AppScreen subtitle="Interests, visits, and the people you saved." tabs title="Activity">
      <View style={styles.tabs}>
        {tabs.map((item) => {
          const selected = item === tab;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={item}
              onPress={() => setTab(item)}
              style={[styles.chip, selected ? styles.chipOn : null]}
            >
              <Text style={[styles.chipLabel, selected ? styles.chipLabelOn : null]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
      {rows.length === 0 ? (
        <EmptyState body="When someone writes, visits, or you save a profile, it gathers here." title="Nothing new" />
      ) : (
        rows.map((row) => {
          const person = people.find((item) => item.id === row.id);
          if (!person) return null;
          return (
            <Pressable accessibilityRole="button" key={`${tab}-${row.id}`} onPress={() => router.push({ pathname: "/person/[id]", params: { id: person.id } })} style={styles.row}>
              <Portrait gender={person.gender} />
              <View style={styles.copy}>
                <Text style={styles.name}>{person.name}</Text>
                <Text style={styles.line}>{row.line}</Text>
              </View>
              <Text style={styles.when}>{row.when}</Text>
            </Pressable>
          );
        })
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { backgroundColor: Colors.blush, borderRadius: Radius.pill, paddingHorizontal: 14, paddingVertical: 8 },
  chipOn: { backgroundColor: Colors.burgundy },
  chipLabel: { color: Colors.burgundy, fontSize: 13, fontWeight: "700" },
  chipLabelOn: { color: Colors.ivory },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    padding: 12,
  },
  copy: { flex: 1, gap: 2 },
  name: { color: Colors.ink, fontSize: 16, fontWeight: "700" },
  line: { color: Colors.muted, fontSize: 13 },
  when: { color: Colors.champagne, fontSize: 12, fontWeight: "700" },
});
