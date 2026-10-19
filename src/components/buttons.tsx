import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { Colors, Radius } from "@/constants/theme";

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  busy?: boolean;
};

export function PrimaryButton({ label, onPress, disabled, busy }: ButtonProps) {
  const inactive = disabled || busy;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles.primary,
        pressed && !inactive && styles.primaryPressed,
        inactive && styles.inactive,
      ]}
    >
      {busy ? <ActivityIndicator color={Colors.ivory} /> : <Text style={styles.primaryLabel}>{label}</Text>}
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress, disabled, busy }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || busy}
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles.secondary, pressed && styles.secondaryPressed]}
    >
      <Text style={styles.secondaryLabel}>{label}</Text>
    </Pressable>
  );
}

export function TextButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.textButton}>
      <Text style={styles.textLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: Radius.field,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  primary: {
    backgroundColor: Colors.burgundy,
    flexGrow: 1,
  },
  primaryPressed: {
    backgroundColor: Colors.burgundyPressed,
  },
  inactive: {
    opacity: 0.45,
  },
  primaryLabel: {
    color: Colors.ivory,
    fontSize: 16,
    fontWeight: "600",
  },
  secondary: {
    backgroundColor: Colors.blush,
    borderWidth: 1,
    borderColor: Colors.champagne,
  },
  secondaryPressed: {
    opacity: 0.8,
  },
  secondaryLabel: {
    color: Colors.burgundy,
    fontSize: 16,
    fontWeight: "600",
  },
  textButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  textLabel: {
    color: Colors.teal,
    fontSize: 15,
    fontWeight: "600",
  },
});
