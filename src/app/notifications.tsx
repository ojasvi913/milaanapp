import { Eye, Heart, MessageCircle, type LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/app-screen";
import { Colors, Radius } from "@/constants/theme";
import { notices } from "@/main/data";

const icons: Record<string, LucideIcon> = {
  "New interest": Heart,
  "Profile visit": Eye,
  Message: MessageCircle,
};

export default function NotificationsScreen() {
  return (
    <AppScreen back title="Notifications">
      {notices.map((notice) => {
        const Icon = icons[notice.title] ?? Heart;
        return (
          <View key={notice.id} style={styles.card}>
            <View style={styles.top}>
              <View style={styles.titleRow}>
                <View style={styles.mark}>
                  <Icon color={Colors.teal} size={15} strokeWidth={2} />
                </View>
                <Text style={styles.title}>{notice.title}</Text>
              </View>
              <Text style={styles.when}>{notice.when}</Text>
            </View>
            <Text style={styles.body}>{notice.body}</Text>
          </View>
        );
      })}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.white, borderRadius: Radius.card, padding: 14, gap: 6 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  mark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.tealSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: Colors.ink, fontSize: 15, fontWeight: "700" },
  when: { color: Colors.champagne, fontSize: 12, fontWeight: "700" },
  body: { color: Colors.muted, fontSize: 14, lineHeight: 20 },
});
