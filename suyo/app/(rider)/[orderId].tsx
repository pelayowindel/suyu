import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { supabase } from "../../lib/supabase";
import type { OrderDetail } from "../../types";

const RIDER_ID = "67b6cba4-138d-48eb-84e5-421c079231c2";

export default function OrderDetailScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    const { data } = await supabase
      .from("orders")
      .select(
        "id, type, status, total, subtotal, delivery_fee, delivery_address, notes, created_at, users!orders_customer_id_fkey(full_name, phone), stores(name), order_items(id, name, quantity, unit_price, subtotal)",
      )
      .eq("id", orderId)
      .single();

    if (data) setOrder(data as unknown as OrderDetail);
    setLoading(false);
  }

  async function acceptOrder() {
    const { error } = await supabase
      .from("orders")
      .update({ rider_id: RIDER_ID, status: "picked_up" })
      .eq("id", orderId);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    router.replace(`/(rider)/delivery/${orderId}`);
  }

  if (loading || !order) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={order.order_items}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-xl font-bold text-gray-900">
              {order.stores?.name || "Pabili Order"}
            </Text>
            <Text className="mt-1 text-sm text-gray-500">
              Customer: {order.users?.full_name || "Unknown"}
              {order.users?.phone ? ` • ${order.users.phone}` : ""}
            </Text>
            {order.delivery_address && (
              <Text className="mt-1 text-sm text-gray-500">
                📍 {order.delivery_address}
              </Text>
            )}
            {order.notes && (
              <Text className="mt-2 rounded-lg bg-yellow-50 p-2 text-sm text-yellow-800">
                Note: {order.notes}
              </Text>
            )}
            <Text className="mb-2 mt-4 text-sm font-bold uppercase text-gray-400">
              Items
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-2 flex-row items-center justify-between rounded-lg bg-white p-3">
            <View className="flex-1">
              <Text className="text-base text-gray-900">
                {item.quantity}× {item.name}
              </Text>
            </View>
            <Text className="font-medium text-gray-700">
              ₱{Number(item.subtotal).toFixed(2)}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <View className="mt-4 rounded-lg bg-white p-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Subtotal</Text>
              <Text>₱{Number(order.subtotal).toFixed(2)}</Text>
            </View>
            <View className="mt-1 flex-row justify-between">
              <Text className="text-gray-500">Delivery Fee</Text>
              <Text>₱{Number(order.delivery_fee).toFixed(2)}</Text>
            </View>
            <View className="mt-2 flex-row justify-between border-t border-gray-100 pt-2">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-lg font-bold text-green-600">
                ₱{Number(order.total).toFixed(2)}
              </Text>
            </View>
          </View>
        }
      />

      <View className="border-t border-gray-200 bg-white px-4 py-3">
        <TouchableOpacity
          className="rounded-xl bg-green-500 py-4"
          onPress={acceptOrder}
        >
          <Text className="text-center text-lg font-semibold text-white">
            Accept & Pick Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
