import { router } from "expo-router";
import {
  Check,
  ChevronLeft,
  Info,
  MessageSquareText,
  ShieldCheck,
  X,
} from "lucide-react-native";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors, Radius, Spacing } from "@/constants/theme";

type Duration = "1 month" | "3 months" | "Till Marriage";
type ServiceType = "self" | "assisted";

type Plan = {
  id: string;
  name: string;
  color: string;
  price: string;
  originalPrice: string;
  term: string;
  features: string[];
};

const plansByDuration: Record<Duration, Plan[]> = {
  "1 month": [
    {
      id: "pro_plus_1m",
      name: "Pro+",
      color: "#B8860B",
      price: "₹664",
      originalPrice: "₹1,327",
      term: "For 1 month",
      features: [
        "Chat with matches",
        "Access Just Joined profiles",
        "Get Contact Details",
        "View all photos",
      ],
    },
    {
      id: "pro_max_1m",
      name: "Pro Max",
      color: "#9B1B30",
      price: "₹763",
      originalPrice: "₹1,525",
      term: "For 1 month",
      features: [
        "Chat with matches",
        "Boost your profile",
        "Access Just Joined profiles",
        "Get Contact Details",
        "View all photos",
        "Send Super Interests",
      ],
    },
  ],
  "3 months": [
    {
      id: "pro_plus_3m",
      name: "Pro+",
      color: "#B8860B",
      price: "₹1,499",
      originalPrice: "₹2,998",
      term: "For 3 months",
      features: [
        "Chat with matches",
        "Access Just Joined profiles",
        "Get Contact Details",
        "View all photos",
      ],
    },
    {
      id: "pro_max_3m",
      name: "Pro Max",
      color: "#9B1B30",
      price: "₹1,899",
      originalPrice: "₹3,798",
      term: "For 3 months",
      features: [
        "Chat with matches",
        "Boost your profile",
        "Access Just Joined profiles",
        "Get Contact Details",
        "View all photos",
        "Send Super Interests",
      ],
    },
  ],
  "Till Marriage": [
    {
      id: "pro_supreme_tm",
      name: "Pro Supreme",
      color: "#15549A",
      price: "₹6,695",
      originalPrice: "₹13,390",
      term: "Till Marriage",
      features: [
        "Chat with matches",
        "Send Super Interests",
        "Boost your profile",
        "Access Just Joined profiles",
        "Get Contact Details",
        "View all photos",
      ],
    },
  ],
};

export default function UpgradeScreen() {
  const insets = useSafeAreaInsets();
  const [service, setService] = useState<ServiceType>("self");
  const [duration, setDuration] = useState<Duration>("1 month");
  const currentPlans = plansByDuration[duration];
  const [selectedPlanId, setSelectedPlanId] = useState<string>(currentPlans[0]?.id ?? "");
  const [showHelp, setShowHelp] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  // Keep plan selection synced when duration tab switches
  const selectedPlan =
    currentPlans.find((p) => p.id === selectedPlanId) ?? currentPlans[0];

  function handleSelectDuration(d: Duration) {
    setDuration(d);
    setSelectedPlanId(plansByDuration[d][0].id);
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <View style={styles.column}>
        {/* Top Header */}
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Back"
            accessibilityRole="button"
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/matches"))}
            style={styles.backBtn}
          >
            <ChevronLeft color="#1F2937" size={24} strokeWidth={2.5} />
          </Pressable>
          <Text style={styles.headerTitle}>Upgrade Membership</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowHelp(true)}
            style={styles.helpBtn}
          >
            <Text style={styles.helpBtnText}>Need help?</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 110 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Segmented Toggle: Self-Service vs Assisted */}
          <View style={styles.serviceToggleContainer}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setService("self")}
              style={[
                styles.serviceTab,
                service === "self" ? styles.serviceTabActive : styles.serviceTabInactive,
              ]}
            >
              <Text
                style={[
                  styles.serviceTabText,
                  service === "self" ? styles.serviceTabTextActive : styles.serviceTabTextInactive,
                ]}
              >
                Self-Service
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => setService("assisted")}
              style={[
                styles.serviceTab,
                service === "assisted" ? styles.serviceTabActive : styles.serviceTabInactive,
              ]}
            >
              <Text
                style={[
                  styles.serviceTabText,
                  service === "assisted" ? styles.serviceTabTextActive : styles.serviceTabTextInactive,
                ]}
              >
                Assisted
              </Text>
            </Pressable>
          </View>

          {/* Guarantee Banner */}
          <View style={styles.guaranteeCard}>
            <View style={styles.scallopedBadge}>
              <Text style={styles.badgeTextSmall}>30-DAY</Text>
              <Text style={styles.badgeTextBold}>MONEY</Text>
              <Text style={styles.badgeTextSmall}>BACK</Text>
            </View>
            <View style={styles.guaranteeCopy}>
              <Text style={styles.guaranteeTitle}>30-day full refund guarantee*</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowHelp(true)}
                style={styles.conditionsRow}
              >
                <Text style={styles.guaranteeSubtitle}>*Conditions apply</Text>
                <Info color={Colors.teal} size={14} strokeWidth={2} />
              </Pressable>
            </View>
          </View>

          {/* Duration Pills */}
          <View style={styles.durationRow}>
            {(["1 month", "3 months", "Till Marriage"] as Duration[]).map((d) => {
              const active = d === duration;
              return (
                <Pressable
                  accessibilityRole="button"
                  key={d}
                  onPress={() => handleSelectDuration(d)}
                  style={[styles.durationPill, active && styles.durationPillActive]}
                >
                  <Text style={[styles.durationText, active && styles.durationTextActive]}>{d}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Centered duration divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>{duration.toUpperCase()}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Plan Cards */}
          <View style={styles.plansList}>
            {currentPlans.map((plan) => {
              const selected = plan.id === selectedPlan.id;
              return (
                <Pressable
                  accessibilityRole="button"
                  key={plan.id}
                  onPress={() => setSelectedPlanId(plan.id)}
                  style={[styles.planCard, selected && styles.planCardSelected]}
                >
                  {/* Plan Card Header */}
                  <View style={styles.planHeader}>
                    <View style={styles.planTitleCol}>
                      <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.price}>{plan.price}</Text>
                        <Text style={styles.originalPrice}>{plan.originalPrice}</Text>
                        <Text style={styles.term}> · {plan.term}</Text>
                      </View>
                    </View>

                    {/* Radio button */}
                    <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
                      {selected && <View style={styles.radioInnerDot} />}
                    </View>
                  </View>

                  {/* Bullet features */}
                  <View style={styles.featuresList}>
                    <Text style={styles.featuresText}>
                      {plan.features.map((f, i) => (
                        <Text key={f}>
                          {i > 0 ? "  •  " : ""}
                          {f}
                        </Text>
                      ))}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Floating Chat / Help Button */}
        <Pressable
          accessibilityLabel="Chat support"
          accessibilityRole="button"
          onPress={() => setShowHelp(true)}
          style={[styles.floatingHelpBtn, { bottom: insets.bottom + 95 }]}
        >
          <MessageSquareText color={Colors.green} size={22} strokeWidth={2.2} />
        </Pressable>

        {/* Fixed Bottom Bar */}
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowCheckoutSuccess(true)}
            style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
          >
            <Text style={styles.ctaBtnText}>
              Get {selectedPlan?.name ?? "Plan"} at 50% Off
            </Text>
          </Pressable>
          <Text style={styles.ctaSubtext}>Recurring payment • Cancel anytime</Text>
        </View>

        {/* Help / Conditions Modal */}
        <Modal animationType="fade" onRequestClose={() => setShowHelp(false)} transparent visible={showHelp}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Membership Assistance</Text>
                <Pressable onPress={() => setShowHelp(false)} style={styles.modalCloseBtn}>
                  <X color="#4B5563" size={20} />
                </Pressable>
              </View>
              <Text style={styles.modalBody}>
                Our relationship advisors are ready to help you choose the best plan for your matrimonial search.
              </Text>
              <View style={styles.modalBulletRow}>
                <ShieldCheck color={Colors.teal} size={20} />
                <Text style={styles.modalBulletText}>30-Day 100% Refund Guarantee on eligible plans</Text>
              </View>
              <View style={styles.modalBulletRow}>
                <Check color={Colors.green} size={20} />
                <Text style={styles.modalBulletText}>Verified contact numbers and direct family chats</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowHelp(false)}
                style={styles.modalPrimaryBtn}
              >
                <Text style={styles.modalPrimaryBtnText}>Got it</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Checkout Modal */}
        <Modal
          animationType="fade"
          onRequestClose={() => setShowCheckoutSuccess(false)}
          transparent
          visible={showCheckoutSuccess}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selected Plan</Text>
                <Pressable onPress={() => setShowCheckoutSuccess(false)} style={styles.modalCloseBtn}>
                  <X color="#4B5563" size={20} />
                </Pressable>
              </View>
              <Text style={styles.modalBody}>
                You selected <Text style={{ fontWeight: "700" }}>{selectedPlan.name}</Text> for{" "}
                <Text style={{ fontWeight: "700", color: Colors.green }}>{selectedPlan.price}</Text> ({selectedPlan.term}).
              </Text>
              <Text style={[styles.modalBody, { fontSize: 13, color: "#6B7280" }]}>
                (Preview Mode: In production, this connects to Razorpay / Stripe gateway.)
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowCheckoutSuccess(false)}
                style={styles.modalPrimaryBtn}
              >
                <Text style={styles.modalPrimaryBtnText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.ivory },
  column: { flex: 1, width: "100%", maxWidth: 440, alignSelf: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    flex: 1,
    marginLeft: 8,
  },
  helpBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  helpBtnText: {
    color: Colors.green,
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: 16,
    gap: 16,
  },
  serviceToggleContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0E4E6",
    padding: 3,
    gap: 4,
  },
  serviceTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTabActive: {
    backgroundColor: Colors.greenSoft,
    borderWidth: 1.5,
    borderColor: Colors.green,
  },
  serviceTabInactive: {
    backgroundColor: "transparent",
  },
  serviceTabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  serviceTabTextActive: {
    color: "#1F2937",
    fontWeight: "700",
  },
  serviceTabTextInactive: {
    color: "#6B7280",
  },
  guaranteeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#EBF8F2",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D1F0E0",
  },
  scallopedBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    borderWidth: 1.5,
    borderColor: "#059669",
    borderStyle: "dashed",
  },
  badgeTextSmall: {
    color: "#FFFFFF",
    fontSize: 7.5,
    fontWeight: "700",
    lineHeight: 9,
    textAlign: "center",
  },
  badgeTextBold: {
    color: "#FFFFFF",
    fontSize: 8.5,
    fontWeight: "900",
    lineHeight: 11,
    textAlign: "center",
  },
  guaranteeCopy: { flex: 1, gap: 2 },
  guaranteeTitle: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "700",
  },
  conditionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  guaranteeSubtitle: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "500",
  },
  durationRow: {
    flexDirection: "row",
    gap: 10,
  },
  durationPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  durationPillActive: {
    borderColor: Colors.green,
    backgroundColor: Colors.greenSoft,
    borderWidth: 1.5,
  },
  durationText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "600",
  },
  durationTextActive: {
    color: "#1F2937",
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerLabel: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  plansList: {
    gap: 14,
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  planCardSelected: {
    borderColor: "#D1D5DB",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  planTitleCol: {
    flex: 1,
    gap: 4,
  },
  planName: {
    fontSize: 20,
    fontWeight: "800",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    marginTop: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  originalPrice: {
    fontSize: 14,
    color: "#6B7280",
    textDecorationLine: "line-through",
    marginLeft: 6,
    fontWeight: "500",
  },
  term: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.8,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: Colors.green,
  },
  radioInnerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.green,
  },
  featuresList: {
    marginTop: 2,
  },
  featuresText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
    fontWeight: "400",
  },
  floatingHelpBtn: {
    position: "absolute",
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: Colors.coralBorder,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 10,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: 8,
  },
  ctaBtn: {
    backgroundColor: Colors.green,
    borderRadius: Radius.pill,
    minHeight: 50,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  ctaBtnPressed: {
    backgroundColor: Colors.greenSoft,
  },
  ctaBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  ctaSubtext: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    gap: 14,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalBody: {
    color: "#4B5563",
    fontSize: 14,
    lineHeight: 20,
  },
  modalBulletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalBulletText: {
    flex: 1,
    color: "#1F2937",
    fontSize: 13,
    fontWeight: "500",
  },
  modalPrimaryBtn: {
    backgroundColor: Colors.green,
    borderRadius: 12,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  modalPrimaryBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
