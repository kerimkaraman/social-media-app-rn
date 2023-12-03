import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AddImage from "../assets/svg/AddImage";
import * as ImagePicker from "expo-image-picker";
import Animated from "react-native-reanimated";
import { useSharedValue, withTiming } from "react-native-reanimated";

export default function CreatePost() {
  const [image, setImage] = React.useState(null);
  const height = useSharedValue(0);
  const overflow = useSharedValue("hidden");

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
    height.value = withTiming(height.value + 50, {
      duration: 500,
    });
  };

  const handleOnBlur = () => {
    height.value = withTiming(height.value - 50, {
      duration: 500,
    });
  };

  return (
    <View className="bg-white px-4 py-6 my-4">
      <View className="flex-col gap-y-10">
        <View>
          <TextInput
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            className="w-[100%] max-h-[100px] border-b px-1 py-2 border-custom-darkgreen"
            multiline={true}
            placeholder="Bana nasıl hissettiğini söyle..."
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
          <Pressable className="bg-custom-green py-1.5 px-6 rounded-md">
            <Text className="text-white font-medium">Paylaş</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
