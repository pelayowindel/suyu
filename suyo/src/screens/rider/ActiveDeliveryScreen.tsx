import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { supabase } from "../../lib/supabase";
import type { RiderStackScreenProps } from "../../types/navigation";

type ActiveOrder = {
  id: string;
  status: string;
  total: number;
  delivery_address: string | null;
  notes: string | null;
  users: { full_name: string; phone: string | null } | null;
  stores: { name: string } | null;
};

export default function ActiveDeliveryScreen({
  navigation,
  route,
}: RiderStackScreenProps<"ActiveDelivery">) {
  const { orderId } = route.params;
  const [order, setOrder] = useState<ActiveOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    const { data } = await supabase
      .from("orders")
      .select(
        "id, status, total, delivery_address, notes, users!orders_customer_id_fkey(full_name, phone), stores(name)",
      )
      .eq("id", orderId)
      .single();

    if (data) setOrder(data as unknown as ActiveOrder);
    setLoading(false);
  }

  async function updateStatus(newStatus: string) {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    if (newStatus === "delivered") {
      Alert.alert("Delivered!", "Order has been marked as delivered.", [
        { text: "OK", onPress: () => navigation.popToTop() },
      ]);
    } else {
      setOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  }

  if (loading || !order) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  const statusSteps = [
    { key: "picked_up", label: "Picked Up" },
    { key: "delivering", label: "Delivering" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentStepIndex = statusSteps.findIndex(
    (s) => s.key === order.status,
  );
  const nextStep = statusSteps[currentStepIndex + 1];

  return (
    <View className="flex-1 bg-gray-50 p-4">
      {/* Order Info Card */}
      <View className="rounded-xl bg-white p-4 shadow-sm">
        <Text className="text-xl font-bold text-gray-900">
          {order.stores?.name || "Pabili Order"}
        </Text>
        <Text className="mt-1 text-sm text-gray-600">
          Customer: {order.users?.full_name || "Unknown"}
        </Text>
        {order.users?.phone && (
          <Text className="text-sm text-gray-500">{order.users.phone}</Text>
        )}
        {order.delivery_address && (
          <Text className="mt-2 text-sm text-gray-600">
            📍 {order.delivery_address}
          </Text>
        )}
        <Text className="mt-2 text-lg font-bold text-green-600">
          ₱{Number(order.total).toFixed(2)}
        </Text>
      </View>

      {/* Status Progress */}
      <View className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-sm font-bold uppercase text-gray-400">
          Delivery Progress
        </Text>
        {statusSteps.map((step, index) => (
          <View key={step.key} className="mb-2 flex-row items-center">
            <View
              className={`h-6 w-6 items-center justify-center rounded-full ${
                index <= currentStepIndex ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <Text className="text-xs font-bold text-white">
                {index <= currentStepIndex ? "✓" : index + 1}
              </Text>
            </View>
            <Text
              className={`ml-3 text-base ${
                index <= currentStepIndex
                  ? "font-semibold text-gray-900"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Action Button */}
      {nextStep && (
        <View className="mt-auto pt-4">
          <TouchableOpacity
            className="rounded-xl bg-green-500 py-4"
            onPress={() => updateStatus(nextStep.key)}
          >
            <Text className="text-center text-lg font-semibold text-white">
              Mark as {nextStep.label}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
