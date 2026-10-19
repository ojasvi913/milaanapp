import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { Colors } from "@/constants/theme";
import { MainProvider } from "@/main/state";
import { DraftProvider } from "@/onboarding/draft";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <DraftProvider>
      <MainProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.ivory },
            animation: "slide_from_right",
          }}
        />
      </MainProvider>
    </DraftProvider>
  );
}
