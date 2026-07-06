import { Tabs } from "expo-router";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";

const TAB_YELLOW = "#F2EF45";
const TEXT = "#222222";

function Icon({ name, lib }: { name: string; lib: "feather" | "ion" | "mci" }) {
  if (lib === "feather") return <Feather name={name as any} size={20} color={TEXT} />;
  if (lib === "ion") return <Ionicons name={name as any} size={20} color={TEXT} />;
  return <MaterialCommunityIcons name={name as any} size={20} color={TEXT} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
        header: () => (
          <SafeAreaView edges={["top"]} className="bg-[#F4F4F4]">
            <View className="border-2 border-black bg-[#F4F4F4] px-4 h-14 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Feather name="menu" size={18} color="#222" />
                <Text className="font-lexend-black text-[28px] text-[#222]">FAST-TRACK</Text>
              </View>
              <Ionicons name="person-circle-outline" size={22} color="#7A7A2A" />
            </View>
          </SafeAreaView>
        ),
      }}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View className="bg-white border-t-4 border-black px-2 py-2">
            <View className="flex-row">
              {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];

                const label =
                  options.tabBarLabel !== undefined
                    ? String(options.tabBarLabel)
                    : options.title !== undefined
                      ? options.title
                      : route.name;

                let icon = <Feather name="circle" size={20} color={TEXT} />;
                if (route.name === "explore") icon = <Icon lib="feather" name="search" />;
                if (route.name === "orders") icon = <Icon lib="mci" name="clipboard-text-outline" />;
                if (route.name === "stores") icon = <Icon lib="ion" name="storefront-outline" />;
                if (route.name === "profile") icon = <Icon lib="ion" name="person-outline" />;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                return (
                  <Pressable
                    key={route.key}
                    onPress={onPress}
                    className={`flex-1 mx-1 items-center justify-center py-2 ${isFocused ? "border-2 border-black" : ""
                      }`}
                    style={{ backgroundColor: isFocused ? TAB_YELLOW : "white" }}
                  >
                    {icon}
                    <Text className="mt-1 text-[11px] font-lexend-extrabold tracking-wide text-[#222]">
                      {String(label).toUpperCase()}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
