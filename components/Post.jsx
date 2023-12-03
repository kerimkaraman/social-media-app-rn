import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function Post() {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <View className="bg-white flex-col gap-y-6 mt-2 py-4">
      <View className="flex-row items-center justify-between px-4">
        <View className="flex-row items-center gap-x-4">
          <Image
            style={{ objectFit: "contain" }}
            className="w-[50px] h-[50px] rounded-full border border-custom-green"
            source={require("../assets/images/logo.png")}
          />
          <View className="flex-col">
            <Text className="font-semibold">Kerim Karaman</Text>
            <Text className="text-xs">14 mins ago</Text>
          </View>
        </View>
        <View>
          <Text className="font-bold">...</Text>
        </View>
      </View>
      <View>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: "100%", objectFit: "contain" }}
        />
        <Text className="px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nam id
          tempora obcaecati, soluta cumque. Iure illo a non nobis molestias,
          incidunt officia cum et omnis vel. Accusamus, rerum qui!
        </Text>
      </View>
      <View className="px-2 flex-row gap-x-6">
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <AntDesign
            name="like1"
            size={24}
            color={isLiked ? "blue" : "black"}
          />
        </TouchableOpacity>
        <Pressable>
          <FontAwesome name="comment" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
