
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Lexend-Thin": require("../assets/Lexend-Thin.ttf"),
    "Lexend-Regular": require("../assets/Lexend-Regular.ttf"),
    "Lexend-Medium": require("../assets/Lexend-Medium.ttf"),
    "Lexend-SemiBold": require("../assets/Lexend-SemiBold.ttf"),
    "Lexend-Bold": require("../assets/Lexend-Bold.ttf"),
    "Lexend-ExtraBold": require("../assets/Lexend-ExtraBold.ttf"),
    "Lexend-Black": require("../assets/Lexend-Black.ttf"),
    "ArchivoNarrow-Regular": require("../assets/ArchivoNarrow-Regular.ttf"),
    "ArchivoNarrow-Medium": require("../assets/ArchivoNarrow-Medium.ttf"),
    "ArchivoNarrow-SemiBold": require("../assets/ArchivoNarrow-SemiBold.ttf"),
    "ArchivoNarrow-Bold": require("../assets/ArchivoNarrow-Bold.ttf"),
    "ArchivoNarrow-Italic": require("../assets/ArchivoNarrow-Italic.ttf"),
    "ArchivoNarrow-SemiBoldItalic": require("../assets/ArchivoNarrow-SemiBoldItalic.ttf"),
    "ArchivoNarrow-BoldItalic": require("../assets/ArchivoNarrow-BoldItalic.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* modal */}
        <Stack.Screen
          name="food/[id]"
          options={{
            presentation: "modal", // pops up
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
