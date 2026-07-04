import { Stack } from "expo-router";

export default function RiderLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Available Orders" }} />
      <Stack.Screen name="[orderId]" options={{ title: "Order Details" }} />
      <Stack.Screen
        name="delivery/[orderId]"
        options={{ title: "Active Delivery", headerBackVisible: false }}
      />
    </Stack>
  );
}
