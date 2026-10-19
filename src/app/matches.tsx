import { router } from "expo-router";
import { Bell, SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AccountDrawer } from "@/components/account-drawer";
import { EmptyState, TabBar } from "@/components/app-screen";
import { PersonCard } from "@/components/person-card";
import { Portrait } from "@/components/portrait";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { people } from "@/main/data";
import { useMain, type Mark } from "@/main/state";

const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  web: "Georgia, 'Times New Roman', serif",
  default: "serif",
});

const quickFilters = ["Age", "Height", "Region", "Religion", "Community", "Education", "Marital"];

export default function MatchesScreen() {
  const { keep } = useMain();
  const [passed, setPassed] = useState<string[]>([]);
  const [quick, setQuick] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const person = people.find((item) => !passed.includes(item.id));
  const seen = passed.length;

  function decide(mark: Mark) {
    if (!person) return;
    keep(person.id, mark);
    setPassed((current) => [...current, person.id]);
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <View style={styles.column}>
        <View style={styles.banner}>
          <Pressable accessibilityRole="button" accessibilityLabel="Your account" onPress={() => setMenu(true)} style={styles.profileButton}>
            <Portrait size={40} variant="dark" />
          </Pressable>
          <View style={styles.bannerCopy}>
            <Text style={styles.title}>My matches</Text>
            <Text style={styles.subtitle}>
              {person ? `${seen + 1} of ${people.length}` : "As per your preferences"}
            </Text>
          </View>
          <Pressable accessibilityLabel="Alerts" accessibilityRole="button" onPress={() => router.push("/notifications")} style={styles.iconButton}>
            <Bell color={Colors.burgundy} size={22} strokeWidth={2} />
          </Pressable>
        </View>
        <View style={styles.rule} />

        <View style={styles.filterRow}>
          <Pressable accessibilityRole="button" onPress={() => router.push("/filters")} style={styles.filtersButton}>
            <SlidersHorizontal color={Colors.ivory} size={16} strokeWidth={2.25} />
            <Text style={styles.filtersLabel}>Filters</Text>
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {quickFilters.map((item) => {
              const selected = item === quick;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  key={item}
                  onPress={() => setQuick(selected ? null : item)}
                  style={[styles.chip, selected ? styles.chipOn : null]}
                >
                  <Text style={[styles.chipLabel, selected ? styles.chipLabelOn : null]}>{item}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.stage}>
          {person ? (
            <PersonCard
              key={person.id}
              onChat={() => router.push({ pathname: "/chat/[id]", params: { id: person.id } })}
              onDecide={decide}
              person={person}
            />
          ) : (
            <View style={styles.emptyWrap}>
              <EmptyState body="You have seen everyone in this preview. Start again, or open filters." title="No one left" />
              <Pressable accessibilityRole="button" onPress={() => setPassed([])} style={styles.again}>
                <Text style={styles.againLabel}>Review again</Text>
              </Pressable>
            </View>
          )}
        </View>
        <TabBar />
        <AccountDrawer onClose={() => setMenu(false)} open={menu} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.ivory },
  column: { flex: 1, width: "100%", maxWidth: 440, alignSelf: "center" },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 8,
    paddingRight: Spacing.three,
    paddingTop: Spacing.two,
  },
  profileButton: { borderRadius: 20 },
  bannerCopy: { flex: 1, gap: 2 },
  title: { fontFamily: serif, fontSize: 28, lineHeight: 32, color: Colors.burgundy },
  subtitle: { color: Colors.teal, fontSize: 13, fontWeight: "600" },
  rule: { height: 1, backgroundColor: Colors.champagne, marginTop: 5 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.blush,
    alignItems: "center",
    justifyContent: "center",
  },
  filterRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingLeft: Spacing.three, paddingTop: 5, paddingBottom: 12 },
  filtersButton: {
    backgroundColor: Colors.burgundy,
    borderRadius: Radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  filtersLabel: { color: Colors.ivory, fontSize: 13, fontWeight: "700" },
  chips: { gap: 8, paddingRight: Spacing.three, alignItems: "center" },
  chip: {
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.champagne,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipOn: { backgroundColor: Colors.tealSoft, borderColor: Colors.teal },
  chipLabel: { color: Colors.ink, fontSize: 13, fontWeight: "600" },
  chipLabelOn: { color: Colors.teal, fontWeight: "700" },
  stage: { flex: 1, paddingHorizontal: Spacing.three, paddingBottom: 12 },
  emptyWrap: { gap: 12 },
  again: {
    minHeight: 48,
    borderRadius: Radius.field,
    backgroundColor: Colors.burgundy,
    alignItems: "center",
    justifyContent: "center",
  },
  againLabel: { color: Colors.ivory, fontSize: 16, fontWeight: "700" },
});
