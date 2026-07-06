import { View, Image, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export function TopEatsCard({ item }: any) {
  return (
    <View key={item.id} className="mb-5">
      {/* shadow block */}
      <View className="absolute left-[8px] top-[8px] w-full h-full bg-black" />

      {/* main card */}
      <Pressable className="border-2 border-black bg-white p-2 flex-row items-center">
        <Image source={{ uri: item.img }} className="w-20 h-16 border border-zinc-400" />
        <View className="flex-1 ml-3">
          <Text className="text-[26px] font-lexend-black text-[#222]">{item.name}</Text>
          <Text className="text-[11px] font-archivonarrow-regular text-[#555]">{item.sub}</Text>
          <View className="flex-row items-center mt-1">
            <Feather name="clock" size={12} color="#222" />
            <Text className="ml-1 text-[11px] font-lexend-extrabold text-[#222]">{item.time}</Text>
            <Text className="ml-3 text-[11px] font-lexend-extrabold text-[#D2195B]">↯ {item.price}</Text>
          </View>
        </View>
        <Feather name="heart" size={18} color="#726F4E" />
      </Pressable>
    </View>
  );
}
