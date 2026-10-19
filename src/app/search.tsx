import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen, EmptyState } from "@/components/app-screen";
import { Portrait } from "@/components/portrait";
import { Colors, Radius } from "@/constants/theme";
import { people } from "@/main/data";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const results = needle
    ? people.filter((person) => `${person.id} ${person.name} ${person.city} ${person.community}`.toLowerCase().includes(needle))
    : people;

  return (
    <AppScreen back title="Search">
      <View style={styles.field}>
        <Search color={Colors.muted} size={18} strokeWidth={2} />
        <TextInput
          onChangeText={setQuery}
          placeholder="Name, city, community, or ID"
          placeholderTextColor={Colors.muted}
          style={styles.input}
          value={query}
        />
      </View>
      {results.length === 0 ? (
        <EmptyState body="Try a city or a community from the preview profiles." title="No one matches" />
      ) : (
        results.map((person) => (
          <Pressable accessibilityRole="button" key={person.id} onPress={() => router.push({ pathname: "/person/[id]", params: { id: person.id } })} style={styles.row}>
            <Portrait gender={person.gender} />
            <View>
              <Text style={styles.name}>{person.name}</Text>
              <Text style={styles.meta}>
                {person.city} · {person.community}
              </Text>
            </View>
          </Pressable>
        ))
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: 52,
    borderRadius: Radius.field,
    borderWidth: 1,
    borderColor: Colors.champagne,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: { flex: 1, color: Colors.ink, fontSize: 16, paddingVertical: 12 },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    padding: 12,
  },
  name: { color: Colors.ink, fontSize: 16, fontWeight: "700" },
  meta: { color: Colors.muted, fontSize: 13 },
});
