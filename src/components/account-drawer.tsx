import { router } from "expo-router";
import {
  ChevronRight,
  Headphones,
  LayoutGrid,
  Orbit,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SquarePen,
  UserCheck,
  type LucideIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Portrait } from "@/components/portrait";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { me } from "@/main/data";

type DrawerLink = {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
};

export function AccountDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const [slide] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(slide, {
      toValue: open ? 1 : 0,
      duration: 220,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [open, slide]);

  function navigate(path: string) {
    onClose();
    router.push(path as never);
  }

  const items: DrawerLink[] = [
    { label: "Edit Profile", icon: SquarePen, onPress: () => navigate("/edit-profile") },
    { label: "Partner Preferences", icon: UserCheck, onPress: () => navigate("/edit-preferences") },
    { label: "Search by Profile ID", icon: Search, onPress: () => navigate("/search") },
    { label: "Spotlight", icon: Sparkles, onPress: () => navigate("/upgrade") },
    { label: "Kundli Matches", icon: LayoutGrid, onPress: () => navigate("/activity") },
    { label: "Astrology Services", icon: Orbit, onPress: () => navigate("/help") },
    { label: "Account & Settings", icon: Settings, onPress: () => navigate("/settings") },
    { label: "Safety Center", icon: ShieldCheck, onPress: () => navigate("/privacy") },
    { label: "Help & Support", icon: Headphones, onPress: () => navigate("/help") },
  ];

  return (
    <Modal animationType="none" onRequestClose={onClose} transparent visible={open}>
      <View style={styles.layer}>
        <Pressable accessibilityLabel="Close menu" accessibilityRole="button" onPress={onClose} style={styles.dim} />
        <Animated.View
          style={[
            styles.panel,
            {
              paddingTop: Math.max(insets.top, 24) + 12,
              paddingBottom: Math.max(insets.bottom, 16),
              transform: [
                {
                  translateX: slide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-340, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            {/* Header with profile */}
            <Pressable
              accessibilityRole="button"
              onPress={() => navigate("/profile")}
              style={styles.profileHeader}
            >
              <Portrait size={64} variant="dark" />
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{me.name}</Text>
                <Text style={styles.id}>ID - {me.profileId}</Text>
              </View>
            </Pressable>

            {/* Upgrade Button */}
            <Pressable
              accessibilityRole="button"
              onPress={() => navigate("/upgrade")}
              style={({ pressed }) => [styles.upgradeBtn, pressed && styles.upgradeBtnPressed]}
            >
              <Text style={styles.upgradeBtnText}>Upgrade Membership</Text>
            </Pressable>

            {/* Discount note */}
            <Text style={styles.discountText}>UPTO 50% OFF ALL MEMBERSHIP PLANS</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Menu items */}
            <View style={styles.menuList}>
              {items.map(({ label, icon: Icon, onPress }) => (
                <Pressable
                  accessibilityRole="button"
                  key={label}
                  onPress={onPress}
                  style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed]}
                >
                  <View style={styles.iconWrap}>
                    <Icon color="#4B5563" size={21} strokeWidth={1.8} />
                  </View>
                  <Text style={styles.menuLabel}>{label}</Text>
                  <ChevronRight color="#9CA3AF" size={18} strokeWidth={2} />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  layer: { flex: 1, flexDirection: "row" },
  dim: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.42)" },
  panel: {
    width: "82%",
    maxWidth: 330,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.four,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  scroll: {
    paddingBottom: Spacing.four,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
    marginTop: 4,
  },
  profileInfo: { flex: 1, gap: 4 },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    letterSpacing: -0.2,
  },
  id: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  upgradeBtn: {
    backgroundColor: Colors.coral,
    borderRadius: Radius.field,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.coral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  upgradeBtnPressed: {
    backgroundColor: Colors.coralPressed,
  },
  upgradeBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  discountText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.6,
    marginTop: 10,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F3",
    marginBottom: 8,
  },
  menuList: {
    gap: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },
  menuRowPressed: {
    backgroundColor: "#F9FAFB",
  },
  iconWrap: {
    width: 32,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  menuLabel: {
    flex: 1,
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "500",
  },
});
