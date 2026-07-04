import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";
import type { RiderOrder } from "../../types";

export default function AvailableOrdersScreen() {
  const [orders, setOrders] = useState<RiderOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    const { data } = await supabase
      .from("orders")
      .select(
        "id, type, status, total, delivery_address, notes, created_at, users!orders_customer_id_fkey(full_name), stores(name)",
      )
      .in("status", ["pending", "confirmed", "ready_for_pickup"])
      .order("created_at", { ascending: false });

    if (data) setOrders(data as unknown as RiderOrder[]);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  function onRefresh() {
    setRefreshing(true);
    fetchOrders();
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 rounded-xl bg-white p-4 shadow-sm"
            onPress={() => router.push(`/(rider)/${item.id}`)}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-gray-900">
                {item.stores?.name || "Pabili"}
              </Text>
              <Text className="text-sm font-bold text-green-600">
                ₱{Number(item.total).toFixed(2)}
              </Text>
            </View>
            <Text className="mt-1 text-sm text-gray-600">
              Customer: {item.users?.full_name || "Unknown"}
            </Text>
            {item.delivery_address && (
              <Text className="mt-1 text-xs text-gray-400" numberOfLines={1}>
                📍 {item.delivery_address}
              </Text>
            )}
            <View className="mt-2 flex-row items-center justify-between">
              <Text className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                {item.status.replace(/_/g, " ")}
              </Text>
              <Text className="text-xs text-gray-300">
                {new Date(item.created_at).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400">
            No available orders right now
          </Text>
        }
      />
    </View>
  );
}
