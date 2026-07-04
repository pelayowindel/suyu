import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { cart, clearCart } from "./ProductsScreen";
import type { CustomerStoresStackScreenProps } from "../../types/navigation";

const CUSTOMER_ID = "86e91eeb-a28c-497e-8e20-4448e253247a";

export default function CartScreen({
  navigation,
  route,
}: CustomerStoresStackScreenProps<"Cart">) {
  const { storeId } = route.params;
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const deliveryFee = 49;
  const total = subtotal + deliveryFee;

  async function placeOrder() {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Add some items first.");
      return;
    }

    setSubmitting(true);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: CUSTOMER_ID,
        store_id: storeId,
        type: "food_delivery",
        status: "pending",
        delivery_address: address || "123 Main St, Manila",
        delivery_fee: deliveryFee,
        subtotal,
        total,
        notes: notes || null,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      Alert.alert("Error", orderError?.message || "Failed to place order");
      setSubmitting(false);
      return;
    }

    const orderItems = cart.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    setSubmitting(false);

    if (itemsError) {
      Alert.alert("Error", itemsError.message);
      return;
    }

    clearCart();
    Alert.alert("Order Placed!", "Your order has been submitted.", [
      { text: "OK", onPress: () => navigation.popToTop() },
    ]);
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id}
        contentContainerClassName="p-4"
        ListHeaderComponent={
          <Text className="mb-4 text-xl font-bold text-gray-900">
            Your Cart
          </Text>
        }
        renderItem={({ item }) => (
          <View className="mb-2 flex-row items-center justify-between rounded-lg bg-white p-3">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                {item.product.name}
              </Text>
              <Text className="text-sm text-gray-500">
                ₱{item.product.price.toFixed(2)} × {item.quantity}
              </Text>
            </View>
            <Text className="font-semibold text-gray-900">
              ₱{(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <View className="mt-4">
            <TextInput
              className="mb-3 rounded-lg border border-gray-200 bg-white p-3 text-base"
              placeholder="Delivery address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              className="mb-4 rounded-lg border border-gray-200 bg-white p-3 text-base"
              placeholder="Notes (optional)"
              value={notes}
              onChangeText={setNotes}
            />

            <View className="mb-2 flex-row justify-between">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="font-medium">₱{subtotal.toFixed(2)}</Text>
            </View>
            <View className="mb-2 flex-row justify-between">
              <Text className="text-gray-500">Delivery Fee</Text>
              <Text className="font-medium">₱{deliveryFee.toFixed(2)}</Text>
            </View>
            <View className="mb-6 flex-row justify-between border-t border-gray-200 pt-2">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-lg font-bold text-blue-600">
                ₱{total.toFixed(2)}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text className="text-center text-gray-400">Cart is empty</Text>
        }
      />

      <View className="border-t border-gray-200 bg-white px-4 py-3">
        <TouchableOpacity
          className={`rounded-xl py-4 ${submitting ? "bg-gray-300" : "bg-blue-500"}`}
          onPress={placeOrder}
          disabled={submitting}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {submitting ? "Placing Order..." : "Place Order"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
