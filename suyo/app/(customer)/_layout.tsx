import { Tabs } from "expo-router";

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(stores)"
        options={{ tabBarLabel: "Browse", title: "Browse" }}
      />
      <Tabs.Screen
        name="orders"
        options={{ tabBarLabel: "My Orders", title: "My Orders", headerShown: true }}
      />
    </Tabs>
  );
}
