import { MessageSquareText } from "lucide-react-native";
import { Image, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/theme";
import type { Gender } from "@/main/data";

export function Portrait({
  gender,
  size = 56,
  variant = "default",
  online,
  badge,
  photoUrl,
}: {
  gender?: Gender;
  size?: number;
  variant?: "default" | "dark" | "photo";
  online?: boolean;
  badge?: "chat" | "edit";
  photoUrl?: string;
}) {
  const isDark = variant === "dark";
  const bg = isDark ? Colors.slate : Colors.blush;
  const tone = isDark ? Colors.slateLight : gender === "f" ? Colors.rose : Colors.champagne;

  return (
    <View style={{ width: size, height: size }}>
      <View style={[styles.round, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={{ width: size, height: size, borderRadius: size / 2 }} />
        ) : (
          <>
            <View
              style={{
                width: size * 0.38,
                height: size * 0.38,
                borderRadius: size * 0.2,
                backgroundColor: tone,
                marginTop: size * 0.16,
              }}
            />
            <View
              style={{
                width: size * 0.68,
                height: size * 0.42,
                borderRadius: size * 0.34,
                backgroundColor: tone,
                marginTop: size * 0.05,
              }}
            />
          </>
        )}
      </View>

      {online ? (
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: Math.max(12, size * 0.24),
            height: Math.max(12, size * 0.24),
            borderRadius: Math.max(6, size * 0.12),
            backgroundColor: Colors.green,
            borderWidth: 2,
            borderColor: Colors.white,
          }}
        />
      ) : null}

      {badge === "chat" ? (
        <View
          style={{
            position: "absolute",
            right: -2,
            bottom: -2,
            width: Math.max(18, size * 0.42),
            height: Math.max(18, size * 0.42),
            borderRadius: Math.max(9, size * 0.21),
            backgroundColor: Colors.white,
            borderWidth: 1.5,
            borderColor: Colors.border,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MessageSquareText color={Colors.subtext} size={Math.max(10, size * 0.22)} strokeWidth={2} />
        </View>
      ) : null}
    </View>
  );
}

export function PortraitBlock({ gender, height = 280, fill }: { gender: Gender; height?: number; fill?: boolean }) {
  const tone = gender === "f" ? Colors.rose : Colors.champagne;
  return (
    <View style={[styles.block, fill ? styles.blockFill : { height }]}>
      <View style={[styles.head, { backgroundColor: tone }]} />
      <View style={[styles.shoulders, { backgroundColor: tone }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  round: {
    backgroundColor: Colors.blush,
    alignItems: "center",
    overflow: "hidden",
  },
  block: {
    backgroundColor: Colors.blush,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  blockFill: {
    flex: 1,
    minHeight: 220,
  },
  head: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginTop: 64,
  },
  shoulders: {
    width: 150,
    height: 92,
    borderRadius: 75,
    marginTop: 12,
  },
});
