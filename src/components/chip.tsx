import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";

type ChipGroupProps = {
  options: readonly string[];
  value: string | string[] | null;
  onChange: (value: string) => void;
};

export function ChipGroup({ options, value, onChange }: ChipGroupProps) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            key={option}
            onPress={() => onChange(option)}
            style={[styles.chip, active ? styles.chipActive : null]}
          >
            <Text style={[styles.label, active ? styles.labelActive : null]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: Colors.blush,
  },
  chipActive: {
    backgroundColor: Colors.burgundy,
  },
  label: {
    color: Colors.burgundy,
    fontSize: 14,
    fontWeight: "600",
  },
  labelActive: {
    color: Colors.ivory,
  },
});
