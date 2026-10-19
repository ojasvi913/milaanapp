import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Radius } from "@/constants/theme";

type ChoiceCardProps = {
  title: string;
  hint: string;
  selected: boolean;
  onPress: () => void;
};

export function ChoiceCard({ title, hint, selected, onPress }: ChoiceCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.card, selected ? styles.selected : null]}
    >
      <View style={[styles.mark, selected ? styles.markSelected : null]} />
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.champagne,
    backgroundColor: Colors.white,
  },
  selected: {
    borderColor: Colors.burgundy,
    backgroundColor: Colors.blush,
  },
  mark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.champagne,
    backgroundColor: Colors.white,
  },
  markSelected: {
    borderColor: Colors.burgundy,
    backgroundColor: Colors.burgundy,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: Colors.ink,
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
});
