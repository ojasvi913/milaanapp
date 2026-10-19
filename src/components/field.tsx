import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors, Radius } from "@/constants/theme";

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  optional?: boolean;
  hint?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "number-pad" | "phone-pad";
  autoCapitalize?: "none" | "words" | "sentences";
  maxLength?: number;
  multiline?: boolean;
  prefix?: string;
};

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  optional,
  hint,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "sentences",
  maxLength,
  multiline,
  prefix,
}: FieldProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {optional ? <Text style={styles.optional}>Optional</Text> : null}
      </View>
      <View style={[styles.inputRow, error ? styles.inputError : null, multiline ? styles.multiline : null]}>
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.muted}
          secureTextEntry={secureTextEntry}
          style={[styles.input, multiline ? styles.inputMultiline : null]}
          textAlignVertical={multiline ? "top" : "center"}
          value={value}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!error && hint ? <Text style={styles.hint}>{hint}</Text> : null}
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
  inputRow: {
    minHeight: 52,
    borderRadius: Radius.field,
    borderWidth: 1,
    borderColor: Colors.champagne,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  multiline: {
    alignItems: "stretch",
    paddingVertical: 12,
  },
  inputError: {
    borderColor: Colors.burgundy,
  },
  prefix: {
    color: Colors.ink,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.ink,
    fontSize: 16,
    paddingVertical: 0,
    ...(Platform.OS === "web" ? { outlineWidth: 0 } : null),
  },
  inputMultiline: {
    minHeight: 88,
  },
  error: {
    color: Colors.burgundy,
    fontSize: 13,
  },
  hint: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
});
