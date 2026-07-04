import { View, Text } from "react-native";

export default function OrdersScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">Orders</Text>
      <Text className="mt-2 text-base text-gray-500">
        Your order history
      </Text>
    </View>
  );
}
