import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ref as ref_storage, getDownloadURL } from "firebase/storage";
import { STORAGE } from "../firebaseConfig";
import axios from "axios";

export default function Post({ id, userId, text }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [postImg, setPostImg] = useState();
  const [userImg, setUserImg] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    const storage = STORAGE;
    getDownloadURL(ref_storage(storage, `posts/${id}`))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        setPostImg(url);
      })
      .catch((error) => {
        console.log(error);
      });
    getDownloadURL(ref_storage(storage, `pfps/${userId}`))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        setUserImg(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserData = async () => {
    const response = await axios.get(
      `https://social-media-rn-19287-default-rtdb.firebaseio.com/users.json?id=${userId}`
    );
    setUserDetails(response.data);
  };

  useEffect(() => {
    getImages()
      .then(getUserData())
      .then(setIsLoading(false))
      .then(console.log(userDetails));
  }, []);

  return isLoading ? null : (
    <View key={id} className="bg-white flex-col gap-y-6 mt-2 py-4">
      <View className="flex-row items-center justify-between px-4">
        <View className="flex-row items-center gap-x-4">
          <Image
            style={{ objectFit: "cover" }}
            className="w-[50px] h-[50px] rounded-full border border-custom-green"
            source={{ uri: userImg }}
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
      <View className="flex-col gap-y-5">
        <Image
          source={{ uri: postImg }}
          style={{ width: "100%", height: 200, objectFit: "cover" }}
        />
        <Text className="px-4">{text}</Text>
      </View>
      <View className="px-4 flex-row gap-x-6">
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
