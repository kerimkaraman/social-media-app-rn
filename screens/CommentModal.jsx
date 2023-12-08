import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { updateCommentModalState } from "../store/slices/commentModalSlice";

export default function CommentModal() {
  const { isOpened } = useSelector((state) => state.commentModal);
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Modal
      style={{ marginTop: 300 }}
      animationType="slide"
      transparent={true}
      visible={isOpened}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flex: 1,
            marginTop: 300,
            backgroundColor: "white",
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            shadowColor: "black",
            shadowOffset: { width: 0, height: -10 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
          }}
        >
          <View className="items-center mt-5">
            <Pressable
              onPress={() => {
                dispatch(updateCommentModalState(false));
              }}
            >
              <AntDesign name="down" size={48} color="grey" />
            </Pressable>
          </View>
          <View className="flex-row items-center justify-center gap-x-2">
            <TextInput
              className="bg-custom-lightgrey px-2 py-2 w-[70%] rounded-md"
              placeholder="Yorum yazın..."
            />
            <Pressable className="w-[20%] bg-custom-green py-2 px-2 rounded-md">
              <Text className="text-center font-semibold text-xs text-white">
                Gönder
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
