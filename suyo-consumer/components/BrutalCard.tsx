import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export function RiderFeaturedCard({ d }: any) {
  return (
    <Pressable 
      className="mr-4"
      onPress={() => router.push("/food/mega-triple-smash")}
    >
      {/* shadow block */}
      <View className="absolute left-[8px] top-[8px] w-[305px] h-full bg-black" />

      {/* main card */}
      <View className="w-[305px] border-2 border-black bg-white">
        <Image source={{ uri: d.img }} className="w-full h-44" resizeMode="cover" />
        <View className="p-3">
          <View className="flex-row-reverse justify-between items-center mb-2">
            {/* <Text className="bg-yellow-300 px-2 py-1 text-[10px] font-lexend-black">50% OFF</Text> */}
            <Text className="text-xs font-lexend-extrabold">★ {d.rating}</Text>
          </View>
          <Text className="text-[20px] font-lexend-black text-[#222]">{d.name}</Text>
          <Text className="text-[16px] font-archivonarrow-regular text-[#333]">{d.meta}</Text>
        </View>
      </View>
    </Pressable>
  );
}

