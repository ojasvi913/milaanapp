import { router } from "expo-router";
import {
  Briefcase,
  Camera,
  Check,
  ChevronLeft,
  Eye,
  GraduationCap,
  MapPin,
  Plus,
  Ruler,
  type LucideIcon,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabBar } from "@/components/app-screen";
import { Portrait } from "@/components/portrait";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { me } from "@/main/data";

const facts: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Age & Height", value: `${me.age} yrs, ${me.height}`, icon: Ruler },
  { label: "Location", value: me.city, icon: MapPin },
  { label: "Education", value: me.education, icon: GraduationCap },
  { label: "Profession", value: me.work, icon: Briefcase },
];

export default function ProfileScreen() {

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <View style={styles.column}>
        {/* Header matching Image 2 */}
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Back"
            accessibilityRole="button"
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/matches"))}
            style={styles.backBtn}
          >
            <ChevronLeft color="#1F2937" size={24} strokeWidth={2.5} />
          </Pressable>

          <Text style={styles.headerTitle}>{me.profileId}</Text>

          <View style={styles.headerRightActions}>
            <Pressable
              accessibilityLabel="Add photo"
              accessibilityRole="button"
              onPress={() => router.push("/edit-photos")}
              style={styles.iconBtn}
            >
              <View style={styles.cameraIconWrap}>
                <Camera color="#4B5563" size={20} strokeWidth={2} />
                <View style={styles.cameraPlusBadge}>
                  <Plus color="#FFFFFF" size={9} strokeWidth={3} />
                </View>
              </View>
            </Pressable>

            <Pressable
              accessibilityLabel="Privacy view"
              accessibilityRole="button"
              onPress={() => router.push("/privacy")}
              style={styles.iconBtn}
            >
              <Eye color="#4B5563" size={22} strokeWidth={2} />
            </Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Portrait size={134} variant="dark" />
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push("/edit-photos")}
                style={({ pressed }) => [styles.addPhotosBtn, pressed && styles.addPhotosBtnPressed]}
              >
                <Text style={styles.addPhotosText}>Add photos</Text>
              </Pressable>
            </View>

            {/* Photo advice bullet points */}
            <View style={styles.adviceList}>
              <View style={styles.adviceItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.adviceText}>Profile with photo gives 10 times better response</Text>
              </View>
              <View style={styles.adviceItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.adviceText}>Add quality photos, your photos are safe with us</Text>
              </View>
            </View>
          </View>

          {/* Card 1: Verified Gold Badge */}
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/upgrade")}
            style={styles.goldBadgeCard}
          >
            <View style={styles.goldBadgeCopy}>
              <Text style={styles.goldBadgeText}>
                <Text style={styles.goldBadgeHighlight}>Get a verified Gold Badge</Text>, stand out, and
                connect with more genuine profiles.
              </Text>
            </View>
            <View style={styles.goldBadgeIconContainer}>
              <View style={styles.goldBadgeSeal}>
                <Check color="#FFFFFF" size={16} strokeWidth={3} />
              </View>
            </View>
          </Pressable>

          {/* Card 2: Profile Completion Ring (38%) */}
          <View style={styles.completionCard}>
            <View style={styles.progressRing}>
              {/* Colored arc simulation */}
              <View style={styles.ringArcOverlay} />
              <View style={styles.ringInnerCircle}>
                <Text style={styles.progressValue}>38%</Text>
              </View>
            </View>

            <View style={styles.completionCopy}>
              <Text style={styles.completionTitle}>
                Add a few more details to make your profile rich!
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push("/edit-profile")}
                style={styles.completionLinkRow}
              >
                <Text style={styles.completionLinkText}>Complete your profile</Text>
                <Text style={styles.completionLinkArrow}> →</Text>
              </Pressable>
            </View>
          </View>

          {/* Card 3: Prompts! */}
          <View style={styles.promptsCard}>
            <View style={styles.promptsTopRow}>
              <View style={styles.promptsInfo}>
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>New</Text>
                </View>
                <Text style={styles.promptsTitle}>Prompts!</Text>
                <Text style={styles.promptsSubtitle}>
                  Share fun facts, opinions, & so much more...
                </Text>
              </View>

              {/* Graphical illustration for cards */}
              <View style={styles.promptsIllustration}>
                <View style={styles.promptCardBack} />
                <View style={styles.promptCardFront}>
                  <Text style={styles.quoteMark}>“</Text>
                </View>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/edit-profile")}
              style={({ pressed }) => [styles.addNowBtn, pressed && styles.addNowBtnPressed]}
            >
              <Text style={styles.addNowText}>Add now  +</Text>
            </Pressable>
          </View>

          {/* User Details & Vitals */}
          <View style={styles.vitalsCard}>
            <View style={styles.vitalsHeader}>
              <Text style={styles.vitalsHeading}>About {me.name}</Text>
              <Pressable onPress={() => router.push("/edit-profile")}>
                <Text style={styles.vitalsEditLink}>Edit</Text>
              </Pressable>
            </View>

            <Text style={styles.aboutText}>{me.about}</Text>

            <View style={styles.factsGrid}>
              {facts.map(({ label, value, icon: Icon }) => (
                <View key={label} style={styles.factRow}>
                  <View style={styles.factIconWrap}>
                    <Icon color={Colors.coral} size={18} strokeWidth={2} />
                  </View>
                  <View style={styles.factCopy}>
                    <Text style={styles.factLabel}>{label}</Text>
                    <Text style={styles.factValue}>{value}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.divider} />

            <View style={styles.familySection}>
              <Text style={styles.sectionSmallTitle}>Family Background</Text>
              <Text style={styles.familyText}>{me.family}</Text>
            </View>

            <View style={styles.familySection}>
              <Text style={styles.sectionSmallTitle}>Partner Preferences</Text>
              <Text style={styles.familyText}>{me.preferences}</Text>
            </View>
          </View>
        </ScrollView>

        <TabBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  column: { flex: 1, width: "100%", maxWidth: 440, alignSelf: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 0.2,
    flex: 1,
    marginLeft: 8,
  },
  headerRightActions: {
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
  cameraIconWrap: {
    position: "relative",
  },
  cameraPlusBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.coral,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: 20,
    paddingBottom: Spacing.four,
    gap: 16,
  },
  avatarSection: {
    alignItems: "center",
    gap: 16,
    paddingBottom: 4,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
  },
  addPhotosBtn: {
    position: "absolute",
    bottom: -6,
    backgroundColor: Colors.coral,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    shadowColor: Colors.coral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  addPhotosBtnPressed: {
    backgroundColor: Colors.coralPressed,
  },
  addPhotosText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  adviceList: {
    gap: 6,
    marginTop: 8,
  },
  adviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#9CA3AF",
  },
  adviceText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "500",
  },
  goldBadgeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  goldBadgeCopy: {
    flex: 1,
  },
  goldBadgeText: {
    fontSize: 13.5,
    color: "#4B5563",
    lineHeight: 19,
  },
  goldBadgeHighlight: {
    fontWeight: "700",
    color: "#9B1B30",
  },
  goldBadgeIconContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  goldBadgeSeal: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  completionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#FFD2DA",
    padding: 16,
    gap: 14,
  },
  progressRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#F3F4F6",
    borderTopColor: Colors.coral,
    borderRightColor: Colors.coral,
    transform: [{ rotate: "-45deg" }],
  },
  ringArcOverlay: {
    position: "absolute",
  },
  ringInnerCircle: {
    transform: [{ rotate: "45deg" }],
  },
  progressValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1F2937",
  },
  completionCopy: {
    flex: 1,
    gap: 4,
  },
  completionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 19,
  },
  completionLinkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  completionLinkText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: Colors.coral,
  },
  completionLinkArrow: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.coral,
  },
  promptsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  promptsTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  promptsInfo: {
    flex: 1,
    gap: 4,
  },
  newBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FCE4EC",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  newBadgeText: {
    color: Colors.coral,
    fontSize: 11,
    fontWeight: "800",
  },
  promptsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  promptsSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  promptsIllustration: {
    width: 64,
    height: 52,
    position: "relative",
  },
  promptCardBack: {
    position: "absolute",
    top: 2,
    right: 4,
    width: 44,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#FFE4E6",
    transform: [{ rotate: "8deg" }],
  },
  promptCardFront: {
    position: "absolute",
    top: 8,
    left: 4,
    width: 44,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-6deg" }],
  },
  quoteMark: {
    fontSize: 22,
    color: "#8B5CF6",
    fontWeight: "900",
    lineHeight: 22,
  },
  addNowBtn: {
    backgroundColor: Colors.coral,
    borderRadius: 10,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.coral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addNowBtnPressed: {
    backgroundColor: Colors.coralPressed,
  },
  addNowText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  vitalsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    gap: 12,
  },
  vitalsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vitalsHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  vitalsEditLink: {
    color: Colors.coral,
    fontSize: 14,
    fontWeight: "600",
  },
  aboutText: {
    fontSize: 13.5,
    color: "#4B5563",
    lineHeight: 20,
  },
  factsGrid: {
    gap: 10,
    marginTop: 4,
  },
  factRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  factIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.coralSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  factCopy: {
    flex: 1,
  },
  factLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  factValue: {
    fontSize: 13.5,
    color: "#1F2937",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 4,
  },
  familySection: {
    gap: 4,
  },
  sectionSmallTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
  },
  familyText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
});
