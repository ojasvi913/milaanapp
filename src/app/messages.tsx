import { router } from "expo-router";
import { Bell, Search } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AccountDrawer } from "@/components/account-drawer";
import { TabBar } from "@/components/app-screen";
import { Portrait } from "@/components/portrait";
import { Colors, Spacing } from "@/constants/theme";
import { people, received, threads } from "@/main/data";

const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  web: "Georgia, 'Times New Roman', serif",
  default: "serif",
});

const sections = ["Accepted", "Interests"] as const;

export default function MessagesScreen() {
  const [menu, setMenu] = useState(false);
  const [section, setSection] = useState<(typeof sections)[number]>("Accepted");
  // Default to showing the empty state as in the reference screenshot Image 5,
  // with a toggle if user wants to see mock threads
  const [showMockThreads, setShowMockThreads] = useState(false);

  const onlineMatches = people.filter((p) => p.status === "Active today");
  const rows =
    section === "Accepted"
      ? threads
      : received.map((item) => ({ id: item.id, preview: item.line, when: item.when, unread: true }));

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <View style={styles.column}>
        {/* Top Header */}
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Your account"
            accessibilityRole="button"
            onPress={() => setMenu(true)}
            style={styles.profileBtn}
          >
            <Portrait badge="chat" size={44} variant="dark" />
          </Pressable>

          <Text style={styles.headerTitle}>Messenger</Text>

          <View style={styles.headerActions}>
            <Pressable
              accessibilityLabel="Notifications"
              accessibilityRole="button"
              onPress={() => router.push("/notifications")}
              style={styles.iconBtn}
            >
              <Bell color={Colors.burgundy} size={22} strokeWidth={2} />
            </Pressable>

            <Pressable
              accessibilityLabel="Search"
              accessibilityRole="button"
              onPress={() => router.push("/search")}
              style={styles.iconBtn}
            >
              <Search color={Colors.burgundy} size={22} strokeWidth={2} />
            </Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {/* Section 1: Online Matches */}
          <View style={styles.onlineSection}>
            <View style={styles.onlineHeaderRow}>
              <View style={styles.onlineTitleRow}>
                <Text style={styles.onlineTitle}>Online Matches</Text>
                <Text style={styles.onlineCount}>35</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push("/matches")}
                style={styles.viewAllBtn}
              >
                <Text style={styles.viewAllText}>View All</Text>
              </Pressable>
            </View>

            <Text style={styles.onlineSubtitle}>
              Initiate a chat with your matches to get faster response
            </Text>

            {/* Horizontal Online Avatars */}
            <ScrollView
              contentContainerStyle={styles.onlineList}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {onlineMatches.map((person) => (
                <Pressable
                  accessibilityRole="button"
                  key={person.id}
                  onPress={() => router.push({ pathname: "/chat/[id]", params: { id: person.id } })}
                  style={styles.onlineAvatarCol}
                >
                  <Portrait
                    gender={person.gender}
                    online
                    photoUrl={person.photoUrl}
                    size={64}
                    variant={person.id === "lovely" ? "dark" : "default"}
                  />
                  <Text numberOfLines={1} style={styles.onlineName}>
                    {person.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Section 2: My Conversations */}
          <View style={styles.conversationsSection}>
            <Text style={styles.conversationsTitle}>My Conversations</Text>

            {/* Tabs */}
            <View style={styles.tabsRow}>
              {sections.map((item) => {
                const active = item === section;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    key={item}
                    onPress={() => setSection(item)}
                    style={styles.tabItem}
                  >
                    <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{item}</Text>
                    {active ? <View style={styles.activeTabIndicator} /> : null}
                  </Pressable>
                );
              })}
            </View>

            {/* Empty State matching Image 5 or Threads if toggled */}
            {!showMockThreads ? (
              <View style={styles.emptyContainer}>
                {/* Illustration with two speech bubbles */}
                <View style={styles.bubblesIllustration}>
                  {/* Back green/teal bubble */}
                  <View style={styles.backBubble} />
                  {/* Front pink/coral bubble with 3 white dots */}
                  <View style={styles.frontBubble}>
                    <View style={styles.dotRow}>
                      <View style={styles.whiteDot} />
                      <View style={styles.whiteDot} />
                      <View style={styles.whiteDot} />
                    </View>
                  </View>
                </View>

                {/* Empty State Text */}
                <Text style={styles.emptyHeading}>Build genuine bonds with those who matter</Text>
                <Text style={styles.emptySubtext}>
                  Connect with compatible users and spark a conversation with them
                </Text>

                {/* Browse Profiles link */}
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push("/matches")}
                  style={styles.browseLink}
                >
                  <Text style={styles.browseLinkText}>Browse Profiles  →</Text>
                </Pressable>

                {/* Toggle to view threads if desired */}
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setShowMockThreads(true)}
                  style={styles.viewSampleBtn}
                >
                  <Text style={styles.viewSampleText}>View active chats demo</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.threadsList}>
                <View style={styles.threadsHeader}>
                  <Text style={styles.threadsSubheading}>Recent conversations</Text>
                  <Pressable onPress={() => setShowMockThreads(false)}>
                    <Text style={styles.hideSampleText}>Show empty state</Text>
                  </Pressable>
                </View>
                {rows.map((row) => {
                  const person = people.find((p) => p.id === row.id);
                  if (!person) return null;
                  return (
                    <Pressable
                      accessibilityRole="button"
                      key={`${section}-${row.id}`}
                      onPress={() =>
                        section === "Accepted"
                          ? router.push({ pathname: "/chat/[id]", params: { id: row.id } })
                          : router.push({ pathname: "/person/[id]", params: { id: row.id } })
                      }
                      style={styles.threadItem}
                    >
                      <Portrait gender={person.gender} photoUrl={person.photoUrl} size={50} />
                      <View style={styles.threadCopy}>
                        <Text style={styles.threadName}>{person.name}</Text>
                        <Text numberOfLines={1} style={[styles.threadPreview, row.unread && styles.threadUnread]}>
                          {row.preview}
                        </Text>
                      </View>
                      <View style={styles.threadMeta}>
                        <Text style={styles.threadTime}>{row.when}</Text>
                        {row.unread && <View style={styles.unreadDot} />}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Tab Bar */}
        <TabBar />

        {/* Drawer Component */}
        <AccountDrawer onClose={() => setMenu(false)} open={menu} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.ivory },
  column: { flex: 1, width: "100%", maxWidth: 440, alignSelf: "center" },
  header: { backgroundColor: Colors.ivory,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: Colors.ivory,
    gap: 12,
  },
  profileBtn: {
    position: "relative",
  },
  headerTitle: {
    flex: 1,
    fontFamily: serif,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    color: Colors.burgundy,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    paddingBottom: Spacing.four,
  },
  onlineSection: {
    paddingTop: 16,
    paddingHorizontal: Spacing.four,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 16,
  },
  onlineHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  onlineTitleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  onlineTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  onlineCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  viewAllBtn: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  viewAllText: {
    color: Colors.green,
    fontSize: 14,
    fontWeight: "700",
  },
  onlineSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 14,
  },
  onlineList: {
    gap: 14,
    paddingVertical: 4,
  },
  onlineAvatarCol: {
    width: 76,
    alignItems: "center",
    gap: 6,
  },
  onlineName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    width: "100%",
  },
  conversationsSection: {
    paddingTop: 20,
    paddingHorizontal: Spacing.four,
  },
  conversationsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 16,
  },
  tabsRow: {
    flexDirection: "row",
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  tabItem: {
    paddingBottom: 10,
    position: "relative",
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  tabLabelActive: {
    color: "#111827",
    fontWeight: "700",
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.green,
    borderRadius: 2,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 56,
    paddingHorizontal: 20,
    gap: 12,
  },
  bubblesIllustration: {
    width: 72,
    height: 64,
    position: "relative",
    marginBottom: 12,
  },
  backBubble: {
    position: "absolute",
    bottom: 0,
    right: 2,
    width: 44,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.greenSoft,
  },
  frontBubble: {
    position: "absolute",
    top: 0,
    left: 2,
    width: 52,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F05A7E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  dotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  whiteDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FFFFFF",
  },
  emptyHeading: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 22,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    maxWidth: 300,
    lineHeight: 18,
  },
  browseLink: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  browseLinkText: {
    color: Colors.coral,
    fontSize: 15,
    fontWeight: "700",
  },
  viewSampleBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewSampleText: {
    color: "#9CA3AF",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  threadsList: {
    paddingTop: 12,
  },
  threadsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  threadsSubheading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
  },
  hideSampleText: {
    fontSize: 12,
    color: Colors.coral,
    fontWeight: "600",
  },
  threadItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  threadCopy: {
    flex: 1,
    gap: 3,
  },
  threadName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  threadPreview: {
    fontSize: 13,
    color: "#6B7280",
  },
  threadUnread: {
    color: Colors.green,
    fontWeight: "600",
  },
  threadMeta: {
    alignItems: "flex-end",
    gap: 6,
  },
  threadTime: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.green,
  },
});
