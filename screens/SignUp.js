import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { ref, set } from "firebase/database";
import { DATABASE, STORAGE } from "../firebaseConfig";
import "react-native-get-random-values";
import {
  updateEmail,
  updateNameSurname,
  updatePassword,
  updateUserID,
} from "../store/slices/userSlice";
import { v4 as uuidv4 } from "uuid";

export default function SignUp({ navigation }) {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSwitch = () => {
    navigation.navigate("Signin");
  };

  const { userID, namesurname, img, email, password } = useSelector(
    (state) => state.user
  );

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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <LinearGradient style={styles.linear} colors={["#85FFBD", "#FFFB7D"]}>
          <Image
            style={styles.image}
            className="w-[60%] h-[300px] mx-auto"
            source={require("../assets/images/logo.png")}
          />
        </LinearGradient>
      </KeyboardAvoidingView>
      <Text className="text-4xl font-bold text-center text-custom-darkblue">
        Kaydol
      </Text>
      <View className="w-[90%] mx-auto mt-10 gap-y-5">
        <TextInput
          onChangeText={(val) => {
            dispatch(updateNameSurname(val));
          }}
          className="bg-custom-lightgrey p-4 rounded-xl"
          placeholder="İsim Soyisim"
        />
        <View className="flex-row justify-between items-center">
          <Text
            className="bg-custom-lightgrey p-4 rounded-xl  text-[#C6C6CD]"
            onPress={pickImage}
          >
            Profil resmi seçiniz...
          </Text>
          <Text
            onPress={uploadImg}
            className="bg-custom-lightgrey p-4 rounded-xl "
          >
            Yükle
          </Text>
        </View>
        <TextInput
          onChangeText={(val) => {
            dispatch(updateEmail(val));
          }}
          className="bg-custom-lightgrey p-4 rounded-xl"
          autoCapitalize="none"
          placeholder="E-Mail"
        />
        <TextInput
          onChangeText={(val) => {
            dispatch(updatePassword(val));
          }}
          className="bg-custom-lightgrey p-4 rounded-xl"
          secureTextEntry={true}
          placeholder="Şifre"
        />
        <Pressable className="bg-custom-green py-2">
          <Text className="text-center text-xl text-white">Kaydol</Text>
        </Pressable>
        <View>
          <Text className="text-center">
            Hesabınız var mı?{" "}
            <Text onPress={handleSwitch} className="text-blue-500">
              Giriş Yapın
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  linear: {
    width: "100%",
    height: 300,
  },
  image: {
    objectFit: "contain",
  },
});
