import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export function Logo({ large = false }: { large?: boolean }) {
  return (
    <Image
      accessibilityLabel="MilaanSutra"
      contentFit="contain"
      source={require("@/assets/images/milaansutralogo.png")}
      style={large ? styles.large : styles.small}
    />
  );
}

const styles = StyleSheet.create({
  large: {
    width: 220,
    height: 74,
    alignSelf: "flex-start",
  },
  small: {
    width: 156,
    height: 52,
    alignSelf: "flex-start",
  },
});
