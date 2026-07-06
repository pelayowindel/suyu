import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type OptionKey = "cheese" | "bacon" | "noOnions";

const BASE_PRICE = 14.5;
const ADDONS: Record<OptionKey, number> = {
  cheese: 1.5,
  bacon: 2.0,
  noOnions: 0,
};

export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<OptionKey, boolean>>({
    cheese: false,
    bacon: false,
    noOnions: false,
  });

  const toggle = (key: OptionKey) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const unitPrice = useMemo(() => {
    let total = BASE_PRICE;
    (Object.keys(selected) as OptionKey[]).forEach((k) => {
      if (selected[k]) total += ADDONS[k];
    });
    return total;
  }, [selected]);

  const totalPrice = useMemo(() => unitPrice * qty, [unitPrice, qty]);

  return (
    <View className="flex-1 bg-[#E9E9E9]">
      <SafeAreaView>
        {/* Header */}
        <View className="border-b-2 border-black bg-[#F6F6F6] h-14 px-4 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Feather name="arrow-left" size={22} color="#222" />
          </Pressable>

          <Text
            style={{
              fontFamily: "Lexend-Black",
              fontSize: 36,
              lineHeight: 36,
              letterSpacing: -0.5,
              color: "#1C1B1B",
            }}
          >
            FOOD DETAILS
          </Text>

          <Pressable hitSlop={10}>
            <Ionicons name="heart-outline" size={22} color="#222" />
          </Pressable>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 }}
      >

        {/* Hero card with brutal shadow */}
        <View className="mt-4">
          <View className="absolute left-[6px] top-[6px] right-0 h-[170px] bg-black" />
          <View className="border-2 border-black bg-white">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400",
              }}
              className="w-full h-[170px]"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Tags */}
        <View className="flex-row mt-3 gap-2">
          <Text className="px-3 py-1 bg-[#9FEAF0] border border-black font-lexend-black text-[12px]">BEST SELLER</Text>
          <Text className="px-3 py-1 bg-[#FF2E7E] border border-black text-white font-lexend-black text-[12px]">HOT</Text>
          <Text className="px-3 py-1 bg-[#EDEE50] border border-black font-lexend-black text-[12px]">HALAL</Text>
        </View>

        {/* Title */}
        <Text
          className="mt-3 text-[#1C1B1B]"
          style={{
            fontFamily: "Lexend-Black",
            fontSize: 58,
            lineHeight: 58,
            letterSpacing: -1.2,
          }}
        >
          MEGA-TRIPLE{"\n"}SMASH
        </Text>

        <Text className="mt-1 text-[#333] font-archivonarrow-bold text-[28px]">SMASH BURGER CO.</Text>

        {/* View restaurant button */}
        <View className="mt-4 self-start">
          <View className="absolute left-[4px] top-[4px] right-0 bottom-0 bg-black" />
          <Pressable className="border-2 border-black bg-white px-4 h-12 flex-row items-center">
            <MaterialCommunityIcons name="storefront-outline" size={18} color="#222" />
            <Text className="ml-2 font-lexend-black text-[18px] text-[#1C1B1B]">VIEW RESTAURANT</Text>
          </Pressable>
        </View>

        {/* Price box */}
        <View className="mt-3 self-start">
          <View className="absolute left-[6px] top-[6px] w-full h-full bg-black" />
          <View className="border-2 border-black bg-[#ECEF43] px-4 py-2 min-w-[150px]">
            <Text className="font-lexend-black text-[48px] text-[#1C1B1B]">
              ${unitPrice.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View className="mt-5 border-l-4 border-black pl-3">
          <Text className="font-archivonarrow-italic text-[33px] leading-[42px] text-[#1C1B1B]">
            "Triple-stacked wagyu patties, melted aged cheddar, secret fast-track sauce, and house
            pickles on a toasted brioche bun."
          </Text>
        </View>

        {/* Customize */}
        <Text className="mt-6 font-lexend-black text-[45px] text-[#1C1B1B]">CUSTOMIZE IT</Text>
        <View className="h-[3px] bg-black mt-1 mb-3" />

        {[
          { key: "cheese" as OptionKey, label: "EXTRA CHEESE (+$1.50)" },
          { key: "bacon" as OptionKey, label: "ADD BACON (+$2.00)" },
          { key: "noOnions" as OptionKey, label: "NO ONIONS" },
        ].map((item) => {
          const checked = selected[item.key];
          return (
            <Pressable
              key={item.key}
              onPress={() => toggle(item.key)}
              className="h-14 border-2 border-black bg-[#F2F2F2] px-4 mb-3 flex-row items-center justify-between"
            >
              <Text className="font-lexend-bold text-[19px] text-[#1C1B1B]">{item.label}</Text>
              <View className={`w-6 h-6 border-2 border-black ${checked ? "bg-black" : "bg-white"}`} />
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Bottom action bar */}
      <SafeAreaView>
        <View className="absolute left-0 right-0 bottom-0 px-4 pb-4 pt-2 bg-[#E9E9E9] border-t-2 border-black">
          <View className="flex-row items-end justify-between">
            {/* Qty */}
            <View>
              <View className="absolute left-[4px] top-[4px] w-[168px] h-[64px] bg-black" />
              <View className="w-[168px] h-[64px] border-2 border-black bg-white flex-row items-center justify-evenly">
                <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))}>
                  <Text className="font-lexend-black text-[40px] text-[#1C1B1B]">−</Text>
                </Pressable>
                <View className="w-[2px] h-10 bg-black" />
                <Text className="font-lexend-black text-[40px] text-[#1C1B1B]">{qty}</Text>
                <View className="w-[2px] h-10 bg-black" />
                <Pressable onPress={() => setQty((q) => q + 1)}>
                  <Text className="font-lexend-black text-[40px] text-[#1C1B1B]">+</Text>
                </Pressable>
              </View>
            </View>

            {/* Add to cart */}
            <View>
              <View className="absolute left-[4px] top-[4px] w-[160px] h-[96px] bg-black" />
              <Pressable className="w-[160px] h-[96px] border-2 border-black bg-[#ECEF43] flex-row items-center justify-center">
                <Feather name="shopping-cart" size={20} color="#222" />
                <Text className="ml-2 font-lexend-black text-[43px] leading-[44px] text-[#4E4F1D]">
                  ADD{"\n"}TO{"\n"}CART
                </Text>
              </Pressable>
            </View>
          </View>

          <Text className="mt-2 text-center font-archivonarrow-bold text-[14px] text-[#333]">
            Total: ${totalPrice.toFixed(2)}
          </Text>
        </View>
      </SafeAreaView>
    </View>

  );
}