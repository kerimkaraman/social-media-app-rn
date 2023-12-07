import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { STORAGE } from "../firebaseConfig";
import { getDownloadURL, ref as ref_storage } from "firebase/storage";

export default function PeopleSearchItem({ namesurname, id, email }) {
  const [userPfp, setUserPfp] = useState();
  const fetchImage = async () => {
    const storage = STORAGE;
    const url = await getDownloadURL(ref_storage(storage, `pfps/${id}`));
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
    setUserPfp(url);
  };
  useEffect(() => {
    fetchImage();
  }, [id]);
  return userPfp != null ? (
    <View className="bg-white flex-row items-center p-4 gap-x-10">
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: userPfp }}
      />
      <View>
        <Text className="text-lg font-semibold">{namesurname}</Text>
        <Text className="text-xs text-custom-lightgrey">{email}</Text>
      </View>
    </View>
  ) : null;
}
