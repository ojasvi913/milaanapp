import { router, usePathname } from "expo-router";
import {
  ChevronLeft,
  Clock,
  Heart,
  MessageCircle,
  TicketPercent,
  type LucideIcon,
} from "lucide-react-native";
import type { ReactNode } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors, Radius, Spacing } from "@/constants/theme";

const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  web: "Georgia, 'Times New Roman', serif",
  default: "serif",
});

const tabs: {
  href: "/matches" | "/activity" | "/messages" | "/upgrade";
  label: string;
  icon: LucideIcon;
  badge?: string;
}[] = [
  { href: "/matches", label: "Matches", icon: Heart },
  { href: "/activity", label: "Activity", icon: Clock },
  { href: "/messages", label: "Messenger", icon: MessageCircle },
  { href: "/upgrade", label: "Upgrade", icon: TicketPercent, badge: "50% OFF" },
];

export function AppScreen({
  title,
  subtitle,
  children,
  tabs: showTabs,
  back,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  tabs?: boolean;
  back?: boolean;
  action?: { label: string; onPress: () => void };
}) {
  return (
    <SafeAreaView edges={showTabs ? ["top"] : ["top", "bottom"]} style={styles.screen}>
      <View style={styles.column}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            {back ? (
              <Pressable
                accessibilityLabel="Back"
                accessibilityRole="button"
                onPress={() => (router.canGoBack() ? router.back() : router.replace("/matches"))}
                style={styles.back}
              >
                <ChevronLeft color={Colors.burgundy} size={22} strokeWidth={2.25} />
              </Pressable>
            ) : null}
            <Text style={styles.title}>{title}</Text>
            {action ? (
              <Pressable accessibilityRole="button" onPress={action.onPress} style={styles.action}>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </Pressable>
            ) : null}
          </View>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
        {showTabs ? <TabBar /> : null}
      </View>
    </SafeAreaView>
  );
}

export function TabBar() {
  const path = usePathname();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {tabs.map(({ href, label, icon: Icon, badge }) => {
        const active = path === href;
        const color = active ? Colors.coral : "#6B7280";
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            key={href}
            onPress={() => router.replace(href)}
            style={styles.tab}
          >
            <View style={styles.tabIconWrap}>
              <Icon color={color} size={22} strokeWidth={active ? 2.4 : 1.8} />
              {badge ? (
                <View style={styles.badgePill}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.tabLabel, active ? styles.tabLabelOn : null]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Banner({ tone, children }: { tone: "ok" | "error"; children: string }) {
  return (
    <View style={[styles.banner, tone === "ok" ? styles.bannerOk : styles.bannerError]}>
      <Text style={[styles.bannerText, tone === "ok" ? styles.bannerTextOk : null]}>{children}</Text>
    </View>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.ivory },
  column: { flex: 1, width: "100%", maxWidth: 440, alignSelf: "center" },
  header: { paddingHorizontal: Spacing.four, paddingTop: Spacing.two, paddingBottom: Spacing.two, gap: 4 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  title: { flex: 1, fontFamily: serif, fontSize: 30, lineHeight: 36, color: Colors.burgundy },
  subtitle: { color: Colors.muted, fontSize: 14, lineHeight: 20 },
  back: { minWidth: 36, minHeight: 36, alignItems: "center", justifyContent: "center" },
  action: { backgroundColor: Colors.burgundy, borderRadius: Radius.pill, paddingHorizontal: 14, paddingVertical: 8 },
  actionLabel: { color: Colors.ivory, fontSize: 13, fontWeight: "700" },
  scroll: { paddingHorizontal: Spacing.three, paddingBottom: Spacing.four, gap: 12 },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tab: { flex: 1, minHeight: 48, alignItems: "center", justifyContent: "center", gap: 3 },
  tabIconWrap: { position: "relative", alignItems: "center", justifyContent: "center" },
  badgePill: {
    position: "absolute",
    top: -6,
    right: -24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  badgeText: {
    color: "#6B7280",
    fontSize: 8,
    fontWeight: "700",
  },
  tabLabel: { color: "#6B7280", fontSize: 11, fontWeight: "500" },
  tabLabelOn: { color: Colors.coral, fontWeight: "700" },
  banner: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 },
  bannerOk: { backgroundColor: Colors.tealSoft },
  bannerError: { backgroundColor: Colors.blush, borderWidth: 1, borderColor: Colors.burgundy },
  bannerText: { color: Colors.burgundy, fontSize: 14, lineHeight: 20 },
  bannerTextOk: { color: Colors.teal },
  empty: {
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    padding: 24,
    gap: 8,
    alignItems: "center",
  },
  emptyTitle: { fontFamily: serif, fontSize: 24, color: Colors.ink },
  emptyBody: { color: Colors.muted, fontSize: 14, lineHeight: 20, textAlign: "center" },
});
