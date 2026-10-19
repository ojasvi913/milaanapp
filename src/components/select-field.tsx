import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Radius } from "@/constants/theme";

type SelectFieldProps = {
  label: string;
  value: string | null;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder?: string;
  optional?: boolean;
  error?: string | null;
};

export function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = "Select",
  optional,
  error,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {optional ? <Text style={styles.optional}>Optional</Text> : null}
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen(true)}
        style={[styles.field, error ? styles.fieldError : null]}
      >
        <Text style={value ? styles.value : styles.placeholder}>{value ?? placeholder}</Text>
        <ChevronDown color={Colors.burgundy} size={18} strokeWidth={2} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Modal animationType="fade" onRequestClose={() => setOpen(false)} transparent visible={open}>
        <Pressable accessibilityRole="button" onPress={() => setOpen(false)} style={styles.backdrop}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            {options.length === 0 ? (
              <Text style={styles.empty}>No options yet</Text>
            ) : (
              options.map((option) => {
                const selected = option === value;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    key={option}
                    onPress={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    style={[styles.option, selected ? styles.optionSelected : null]}
                  >
                    <Text style={[styles.optionLabel, selected ? styles.optionLabelSelected : null]}>{option}</Text>
                  </Pressable>
                );
              })
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 6,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 12,
  },
  label: {
    color: Colors.ink,
    fontSize: 13,
    fontWeight: "600",
  },
  optional: {
    color: Colors.champagne,
    fontSize: 12,
    fontWeight: "600",
  },
  field: {
    minHeight: 52,
    borderRadius: Radius.field,
    borderWidth: 1,
    borderColor: Colors.champagne,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 12,
  },
  fieldError: {
    borderColor: Colors.burgundy,
  },
  value: {
    flex: 1,
    color: Colors.ink,
    fontSize: 16,
  },
  placeholder: {
    flex: 1,
    color: Colors.muted,
    fontSize: 16,
  },
  error: {
    color: Colors.burgundy,
    fontSize: 13,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(58, 28, 40, 0.35)",
    justifyContent: "flex-end",
    padding: 16,
  },
  sheet: {
    backgroundColor: Colors.ivory,
    borderRadius: Radius.card,
    padding: 16,
    gap: 8,
  },
  sheetTitle: {
    color: Colors.ink,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  empty: {
    color: Colors.muted,
    fontSize: 15,
    paddingVertical: 12,
  },
  option: {
    minHeight: 44,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  optionSelected: {
    backgroundColor: Colors.blush,
  },
  optionLabel: {
    color: Colors.ink,
    fontSize: 16,
  },
  optionLabelSelected: {
    color: Colors.burgundy,
    fontWeight: "600",
  },
});
