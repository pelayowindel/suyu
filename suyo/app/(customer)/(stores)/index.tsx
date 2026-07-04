import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../../../lib/supabase";
import type { Store } from "../../../types";

export default function StoresScreen() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  async function fetchStores() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("stores")
        .select("id, name, description, is_active")
        .eq("is_active", true);

      if (!error && data) setStores(data);
    } catch (e) {
      console.warn("Failed to fetch stores:", e);
    } finally {
      setLoading(false);
    }
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
        data={stores}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 rounded-xl bg-white p-4 shadow-sm"
            onPress={() => router.push(`/(customer)/(stores)/${item.id}`)}
          >
            <Text className="text-lg font-semibold text-gray-900">
              {item.name}
            </Text>
            {item.description && (
              <Text className="mt-1 text-sm text-gray-500">
                {item.description}
              </Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400">No stores available</Text>
        }
      />
    </View>
  );
}
