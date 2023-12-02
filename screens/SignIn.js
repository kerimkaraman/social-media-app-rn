import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "../firebaseConfig";
import { updateEmail, updatePassword } from "../store/slices/userSlice";

export default function SignIn({ navigation }) {
  const { email, password } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSwitch = () => {
    navigation.navigate("Signup");
  };
  const signIn = () => {
    const auth = AUTH;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("BottomTabs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode == "auth/invalid-login-credentials")
          Alert.alert("Uyarı", "Geçersiz hesap bilgisi");
      });
  };

  return (
    <View className="gap-y-5">
      <KeyboardAvoidingView>
        <LinearGradient style={styles.linear} colors={["#85FFBD", "#FFFB7D"]}>
          <Image
            style={styles.image}
            className="w-[60%] h-[300px] mx-auto"
            source={require("../assets/images/logo.png")}
          />
        </LinearGradient>
      </KeyboardAvoidingView>
      <View className="mt-10">
        <Text className="text-4xl font-bold text-center mt-4 text-custom-darkblue">
          Giriş Yap
        </Text>
        <View className="gap-y-7 w-[90%] mx-auto pt-5">
          <TextInput
            onChangeText={(val) => dispatch(updateEmail(val))}
            autoCapitalize="none"
            placeholder="Email"
            className="bg-custom-lightgrey p-4 rounded-xl"
          />
          <TextInput
            placeholder="Password"
            onChangeText={(val) => dispatch(updatePassword(val))}
            className="bg-custom-lightgrey p-4 rounded-xl"
          />
          <Pressable className="bg-custom-green py-2" onPress={signIn}>
            <Text className="text-center text-xl text-white">Giriş Yap</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text className="text-center">
          Hesabınız yok mu?{" "}
          <Text onPress={handleSwitch} className="text-blue-500">
            Kaydol
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linear: {
    width: "100%",
    height: 300,
  },
  image: {
    objectFit: "contain",
  },
});
