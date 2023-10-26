import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

export default function SignIn({ navigation }) {
  const handleSwitch = () => {
    navigation.navigate("Signup");
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
            placeholder="Email"
            className="bg-custom-lightgrey p-4 rounded-xl"
          />
          <TextInput
            placeholder="Password"
            className="bg-custom-lightgrey p-4 rounded-xl"
          />
          <Pressable className="bg-custom-green py-2">
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
