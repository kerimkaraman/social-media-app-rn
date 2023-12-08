import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { updateCommentModalState } from "../store/slices/commentModalSlice";

export default function CommentModal() {
  const { isOpened } = useSelector((state) => state.commentModal);
  const dispatch = useDispatch();
  return (
    <Modal
      style={{ marginTop: 300 }}
      animationType="slide"
      transparent={true}
      visible={isOpened}
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
            <AntDesign name="down" size={48} color="black" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
