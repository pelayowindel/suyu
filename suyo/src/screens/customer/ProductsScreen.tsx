import { useEffect, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../lib/supabase";
import type { CustomerStoresStackScreenProps } from "../../types/navigation";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  is_available: boolean;
  category_id: string | null;
};

type Category = {
  id: string;
  name: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

// Simple in-memory cart (shared via module scope for MVP)
export let cart: CartItem[] = [];
export function clearCart() {
  cart = [];
}

export default function ProductsScreen({
  navigation,
  route,
}: CustomerStoresStackScreenProps<"Products">) {
  const { storeId, storeName } = route.params;
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [catRes, prodRes] = await Promise.all([
      supabase
        .from("categories")
        .select("id, name")
        .eq("store_id", storeId)
        .order("sort_order"),
      supabase
        .from("products")
        .select("id, name, description, price, is_available, category_id")
        .eq("store_id", storeId)
        .eq("is_available", true)
        .order("name"),
    ]);

    if (catRes.data) setCategories(catRes.data);
    if (prodRes.data) setProducts(prodRes.data);
    setLoading(false);
  }

  function addToCart(product: Product) {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
  }

  const sections = categories.map((cat) => ({
    title: cat.name,
    data: products.filter((p) => p.category_id === cat.id),
  }));

  // Include uncategorized
  const uncategorized = products.filter((p) => !p.category_id);
  if (uncategorized.length > 0) {
    sections.push({ title: "Other", data: uncategorized });
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
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        renderSectionHeader={({ section: { title } }) => (
          <Text className="mb-2 mt-4 text-sm font-bold uppercase text-gray-400">
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <View className="mb-2 flex-row items-center justify-between rounded-lg bg-white p-3 shadow-sm">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                {item.name}
              </Text>
              {item.description && (
                <Text className="text-xs text-gray-500" numberOfLines={1}>
                  {item.description}
                </Text>
              )}
              <Text className="mt-1 text-sm font-semibold text-blue-600">
                ₱{item.price.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              className="ml-3 rounded-lg bg-blue-500 px-4 py-2"
              onPress={() => addToCart(item)}
            >
              <Text className="text-sm font-semibold text-white">Add</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400">No products yet</Text>
        }
      />

      {/* View Cart Button */}
      <View className="border-t border-gray-200 bg-white px-4 py-3">
        <TouchableOpacity
          className="rounded-xl bg-blue-500 py-4"
          onPress={() => navigation.navigate("Cart", { storeId, storeName })}
        >
          <Text className="text-center text-lg font-semibold text-white">
            View Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
