import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function RoleSelectScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="mb-2 text-3xl font-bold text-gray-900">Suyo</Text>
      <Text className="mb-10 text-base text-gray-500">
        Select your role to continue
      </Text>

      <TouchableOpacity
        className="mb-4 w-full rounded-xl bg-blue-500 py-4"
        onPress={() => router.push("/(customer)/(stores)")}
      >
        <Text className="text-center text-lg font-semibold text-white">
          I'm a Customer
        </Text>
        <Text className="text-center text-sm text-blue-100">
          Order food or request pabili
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full rounded-xl bg-green-500 py-4"
        onPress={() => router.push("/(rider)")}
      >
        <Text className="text-center text-lg font-semibold text-white">
          I'm a Rider
        </Text>
        <Text className="text-center text-sm text-green-100">
          View and deliver orders
        </Text>
      </TouchableOpacity>
    </View>
  );
}
