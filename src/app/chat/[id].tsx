import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Send } from "lucide-react-native";
import { useRef, useState, type ComponentRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { EmptyState } from "@/components/app-screen";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { personById } from "@/main/data";
import { useMain } from "@/main/state";

const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  web: "Georgia, 'Times New Roman', serif",
  default: "serif",
});

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const person = personById(id ?? "");
  const { messages, send } = useMain();
  const [draft, setDraft] = useState("");
  const insets = useSafeAreaInsets();
  const thread = useRef<ComponentRef<typeof ScrollView>>(null);

  if (!person) {
    return (
      <SafeAreaView edges={["top", "bottom"]} style={styles.screen}>
        <View style={styles.column}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <BackButton />
              <Text style={styles.title}>Chat</Text>
            </View>
          </View>
          <View style={styles.missing}>
            <EmptyState body="This conversation is not in the preview." title="Not found" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const lines = messages[person.id] ?? [];

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.column}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <BackButton />
            <View style={styles.heading}>
              <Text numberOfLines={1} style={styles.title}>
                {person.name}
              </Text>
              <Text style={styles.subtitle}>{person.status}</Text>
            </View>
          </View>
        </View>
        <ScrollView
          ref={thread}
          contentContainerStyle={[styles.thread, lines.length === 0 ? styles.threadEmpty : null]}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => thread.current?.scrollToEnd({ animated: false })}
          showsVerticalScrollIndicator={false}
          style={styles.threadView}
        >
          {lines.length === 0 ? (
            <EmptyState body="Send a note. It stays on this screen." title="No messages yet" />
          ) : (
            lines.map((line, index) => (
              <View key={`${index}-${line.text}`} style={[styles.row, line.mine ? styles.mineRow : null]}>
                <View style={[styles.bubble, line.mine ? styles.mine : styles.theirs]}>
                  <Text style={[styles.text, line.mine ? styles.mineText : null]}>{line.text}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
        <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, Spacing.three) }]}>
          <TextInput
            multiline
            onChangeText={setDraft}
            placeholder="Write a message"
            placeholderTextColor={Colors.muted}
            style={styles.input}
            value={draft}
          />
          <Pressable
            accessibilityLabel="Send"
            accessibilityRole="button"
            onPress={() => {
              const text = draft.trim();
              if (!text) return;
              send(person.id, text);
              setDraft("");
            }}
            style={styles.send}
          >
            <Send color={Colors.ivory} size={18} strokeWidth={2} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function BackButton() {
  return (
    <Pressable
      accessibilityLabel="Back"
      accessibilityRole="button"
      onPress={() => (router.canGoBack() ? router.back() : router.replace("/messages"))}
      style={styles.back}
    >
      <ChevronLeft color={Colors.burgundy} size={22} strokeWidth={2.25} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.ivory },
  column: { flex: 1, width: "100%", maxWidth: 440, alignSelf: "center" },
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: Colors.blush,
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  heading: { flex: 1, gap: 2 },
  title: { fontFamily: serif, fontSize: 22, lineHeight: 28, color: Colors.burgundy },
  subtitle: { color: Colors.muted, fontSize: 13, lineHeight: 18 },
  back: { minWidth: 36, minHeight: 36, alignItems: "center", justifyContent: "center" },
  threadView: { flex: 1 },
  thread: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    gap: 8,
  },
  threadEmpty: { justifyContent: "center" },
  missing: { flex: 1, justifyContent: "center", paddingHorizontal: Spacing.three },
  row: { flexDirection: "row" },
  mineRow: { justifyContent: "flex-end" },
  bubble: { maxWidth: "80%", borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  theirs: { backgroundColor: Colors.white, borderBottomLeftRadius: 6 },
  mine: { backgroundColor: Colors.burgundy, borderBottomRightRadius: 6 },
  text: { color: Colors.ink, fontSize: 15, lineHeight: 21 },
  mineText: { color: Colors.ivory },
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: Colors.blush,
    backgroundColor: Colors.ivory,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: Colors.white,
    borderRadius: Radius.field,
    borderWidth: 1,
    borderColor: Colors.champagne,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    color: Colors.ink,
    fontSize: 15,
  },
  send: {
    width: 48,
    height: 48,
    borderRadius: Radius.field,
    backgroundColor: Colors.burgundy,
    alignItems: "center",
    justifyContent: "center",
  },
});
