import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { supabase } from "../../lib/supabase";
import type { CustomerOrder } from "./../../types";

const CUSTOMER_ID = "86e91eeb-a28c-497e-8e20-4448e253247a";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-orange-100 text-orange-800",
  ready_for_pickup: "bg-purple-100 text-purple-800",
  picked_up: "bg-indigo-100 text-indigo-800",
  delivering: "bg-cyan-100 text-cyan-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrdersScreen() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("orders")
        .select("id, type, status, total, notes, delivery_address, created_at, stores(name)")
        .eq("customer_id", CUSTOMER_ID)
        .order("created_at", { ascending: false });

      if (data) setOrders(data as unknown as CustomerOrder[]);
    } catch (e) {
      console.warn("Failed to fetch orders:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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
        <ActivityIndicator size="large" color="#3b82f6" />
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
          <View className="mb-3 rounded-xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-gray-900">
                {item.stores?.name || "Pabili Order"}
              </Text>
              <View
                className={`rounded-full px-2 py-1 ${statusColors[item.status]?.split(" ")[0] || "bg-gray-100"}`}
              >
                <Text
                  className={`text-xs font-medium ${statusColors[item.status]?.split(" ")[1] || "text-gray-800"}`}
                >
                  {item.status.replace(/_/g, " ")}
                </Text>
              </View>
            </View>
            <Text className="mt-1 text-sm text-gray-500">
              {item.type === "pabili" ? "Pabili" : "Food Delivery"} • ₱
              {Number(item.total).toFixed(2)}
            </Text>
            {item.delivery_address && (
              <Text className="mt-1 text-xs text-gray-400" numberOfLines={1}>
                📍 {item.delivery_address}
              </Text>
            )}
            <Text className="mt-1 text-xs text-gray-300">
              {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400">No orders yet</Text>
        }
      />
    </View>
  );
}
