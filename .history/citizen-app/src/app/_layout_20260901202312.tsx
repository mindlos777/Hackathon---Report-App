import { Stack } from "expo-router";
import { ReportsProvider } from "../context/ReportsContext";

export default function RootLayout() {
  return (
    <ReportsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ReportsProvider>
  );
}