import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ref as ref_storage, getDownloadURL } from "firebase/storage";
import { STORAGE } from "../firebaseConfig";

export default function Post({ id, userId, text }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    const storage = STORAGE;
    getDownloadURL(ref_storage(storage, `posts/${id}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element
        setImgUrl(url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }, []);

  return (
    <View className="bg-white flex-col gap-y-6 mt-2 py-4">
      <View className="flex-row items-center justify-between px-4">
        <View className="flex-row items-center gap-x-4">
          <Image
            style={{ objectFit: "contain" }}
            className="w-[50px] h-[50px] rounded-full border border-custom-green"
            source={{ uri: imgUrl }}
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
          source={{ uri: imgUrl }}
          style={{ width: "100%", height: 100, objectFit: "contain" }}
        />
        <Text className="px-2">{text}</Text>
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
