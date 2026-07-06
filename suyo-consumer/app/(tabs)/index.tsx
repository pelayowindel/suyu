import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { View, Text, ScrollView, TextInput, Pressable, Image } from "react-native";
import { RiderFeaturedCard } from "../../components/BrutalCard";
import { TopEatsCard } from "../../components/TopEatsCard";
import { BrutalButton } from "../../components/BrutalButton";

const riderDeals = [
  {
    id: "1",
    name: "SMASH BURGER CO.",
    meta: "MIN. ORDER $15 • 15-20 MIN",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900",
  },
  {
    id: "2",
    name: "NEON SUSHI",
    meta: "MIN. ORDER $20 • 20-30 MIN",
    rating: "4.7",
    img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=900",
  },
];

const topEats = [
  {
    id: "1",
    name: "PIZZA PLANET",
    sub: "ITALIAN • PIZZA • $$",
    time: "20-30 MIN",
    price: "$2.99",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
  },
  {
    id: "2",
    name: "VIBE BOWLS",
    sub: "HEALTHY • BOWL • $$$",
    time: "15-25 MIN",
    price: "$1.49",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
  },
  {
    id: "3",
    name: "HOT WING HUB",
    sub: "CHICKEN • FAST FOOD • $",
    time: "10-20 MIN",
    price: "$0.99",
    img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500",
  },
];


export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#E9E9E9]">
      {/* Fixed top area */}
      <View className="px-4 pb-3 bg-[#E9E9E9]">
        {/* Search (fixed, below header) */}
        <View className="border-2 border-black bg-white mt-4 px-3 h-14 flex-row items-center">
          <TextInput
            placeholder="WHAT ARE YOU LOOKING FOR?"
            placeholderTextColor="#333"
            className="flex-1 text-[13px] font-lexend-black text-[#222]"
          />
          <Feather name="search" size={20} color="#222" />
        </View>
      </View>

      {/* Scrollable vertical content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories (horizontal) */}
        <Text className="text-[18px] font-lexend-black tracking-widest text-[#222] mb-3">CATEGORIES</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-8"
          contentContainerStyle={{ paddingBottom: 10, paddingRight: 8 }}
        >
          {/* FOOD */}
          <View className="mr-4">
            <BrutalButton className="w-44 h-28 bg-[#C7DFE8] p-3 justify-between" shadowClassName="w-44 h-28">
              <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#222" />
              <Text className="text-[18px] font-lexend-black text-[#222]">FOOD</Text>
            </BrutalButton>
          </View>

          {/* LOGISTICS */}
          <View className="mr-4">
            <BrutalButton className="w-44 h-28 bg-[#F2055C] p-3 justify-between" shadowClassName="w-44 h-28">
              <MaterialCommunityIcons name="truck-fast-outline" size={24} color="#fff" />
              <Text className="text-[18px] font-lexend-black text-white">LOGISTICS</Text>
            </BrutalButton>
          </View>
        </ScrollView>

        {/* Rider deals header */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-[28px] font-lexend-black text-[#222]">RIDER DEALS</Text>
          <Pressable>
            <Text className="text-xs font-lexend-extrabold underline text-[#222]">VIEW ALL</Text>
          </Pressable>
        </View>

        {/* Rider deals horizontal */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-8"
          contentContainerStyle={{ paddingBottom: 10, paddingRight: 12 }}
        >
          {riderDeals.map((d) => (
            <RiderFeaturedCard key={d.id} d={d} />
          ))}
        </ScrollView>

        {/* Top eats list */}
        <Text className="text-[28px] font-lexend-black text-[#222] mb-3">TOP EATS NEAR YOU</Text>
        {topEats.map((item) => (
          <TopEatsCard key={item.id} item={item} />
        ))}
      </ScrollView>

      {/* Floating yellow cart button (FAB) */}
      <Pressable
        onPress={() => { }}
        className="absolute right-5 bottom-24 w-14 h-14 border-2 border-black bg-[#F2EF45] items-center justify-center"
      >
        <Feather name="shopping-cart" size={22} color="#222" />
      </Pressable>
    </View>
  );
}