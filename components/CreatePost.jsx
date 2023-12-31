import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AddImage from "../assets/svg/AddImage";
import * as ImagePicker from "expo-image-picker";
import Animated from "react-native-reanimated";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { FIRESTORE, STORAGE } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import {
  ref as ref_storage,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

export default function CreatePost({ userId }) {
  const [image, setImage] = React.useState(null);
  const height = useSharedValue(0);
  const overflow = useSharedValue("hidden");
  const [text, setText] = React.useState("");
  const [postId, setPostId] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleOnFocus = () => {
    setPostId(uuidv4());
    height.value = withTiming(height.value + 50, {
      duration: 500,
    });
  };

  const handleOnBlur = () => {
    height.value = withTiming(height.value - 50, {
      duration: 500,
    });
  };

  const handleSharePost = async () => {
    const db = FIRESTORE;

    await setDoc(doc(db, "posts", postId), {
      postId: postId,
      userId: userId,
      text: text,
      likes: [],
      comments: [],
    });
    if (image) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const fileRef = ref_storage(STORAGE, "posts/" + postId);
      const result = await uploadBytes(fileRef, blob);
      console.log("Successfully loaded !");
      blob.close();

      return await getDownloadURL(fileRef);
    }
    setText("");
    setImage(null);
  };

  return (
    <View className="bg-white px-4 py-6 mb-[16px] border-b-4 border-custom-lightgrey">
      <View className="flex-col gap-y-5">
        <View>
          <TextInput
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            className="w-[100%] max-h-[100px] border-b px-1 py-2 border-custom-darkgreen"
            multiline={true}
            placeholder="Bana nasıl hissettiğini söyle..."
            onChangeText={(val) => {
              setText(val);
            }}
            value={text}
          />
        </View>
        <Animated.View
          style={{ height, overflow }}
          className="flex-row justify-between items-center"
        >
          <View className="flex-row items-center gap-x-2">
            <TouchableOpacity onPress={pickImage}>
              <AddImage />
            </TouchableOpacity>
            <Text
              className={`${
                image != null ? "text-custom-green" : "text-custom-red"
              }`}
            >
              {image != null ? "Image selected" : "No image selected"}
            </Text>
          </View>
          <Pressable
            onPress={handleSharePost}
            className="bg-custom-green py-1.5 px-3 rounded-md"
          >
            <Text className="text-white text-xs font-semibold">Paylaş</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
