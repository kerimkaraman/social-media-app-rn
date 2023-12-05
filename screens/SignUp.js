import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { AUTH, DATABASE, STORAGE } from "../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import {
  ref as ref_storage,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import "react-native-get-random-values";
import {
  updateEmail,
  updateNameSurname,
  updatePassword,
} from "../store/slices/userSlice";
import { v4 as uuidv4 } from "uuid";
import { set, ref as ref_database } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const handleSwitch = () => {
    navigation.navigate("Signin", { email });
  };
  const { namesurname, email, password } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
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

  const createUser = async () => {
    const userId = uuidv4();
    const db = DATABASE;
    set(ref_database(db, "users/" + userId), {
      id: userId,
      namesurname: namesurname,
      email: email,
      password: password,
    });

    const auth = AUTH;
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

    const fileRef = ref_storage(STORAGE, "pfps/" + userId);
    const result = await uploadBytes(fileRef, blob);
    console.log("Successfully loaded!");
    blob.close();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    navigation.navigate("BottomTabs", { email: email });
    return await getDownloadURL(fileRef);
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
        <View className="bg-custom-lightgrey p-4 rounded-xl flex-row justify-between items-center">
          <Text className="text-[#C6C6CD]" onPress={pickImage}>
            Profil resmi seçiniz...
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
        <Pressable className="bg-custom-green py-2" onPress={createUser}>
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
