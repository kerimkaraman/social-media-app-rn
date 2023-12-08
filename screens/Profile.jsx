import { View, Text, SafeAreaView, ScrollView, Platform } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image } from "expo-image";
import { FIRESTORE, STORAGE } from "../firebaseConfig";
import Post from "../components/Post";
import { getDownloadURL, ref as ref_storage } from "firebase/storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function Profile() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { email } = useSelector((state) => state.user);

  const [userPfp, setUserPfp] = useState();
  let userId;
  const fetchData = async (email) => {
    const db = FIRESTORE;
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const userD = await getDocs(q);
    userD.forEach((doc) => {
      setUser(doc.data());
      userId = doc.data().id;
    });
    return userId;
  };

  const getPosts = async (userId) => {
    const db = FIRESTORE;
    const postsRef = collection(db, "posts");
    const b = query(postsRef, where("userId", "==", userId));
    const postD = await getDocs(b);
    const newPosts = postD.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setPosts(newPosts);
    return userId;
  };

  const fetchImage = async (userId) => {
    const storage = STORAGE;
    const url = await getDownloadURL(ref_storage(storage, `pfps/${userId}`));
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
    fetchData(email)
      .then((res) => getPosts(res))
      .then((response) => fetchImage(response))
      .then(setIsLoading(false));
  }, []);
  return isLoading ? (
    <Text>deneme</Text>
  ) : (
    <SafeAreaView
      className="bg-white"
      style={{ flex: 1, paddingTop: Platform.OS == "android" ? 50 : 0 }}
    >
      <ScrollView className="flex-col gap-y-2">
        <View className="items-center justify-center gap-y-5 mt-2 border-b border-custom-lightgrey pb-4">
          <Image
            placeholder="LCF?6Zn$1+R+%|V|RpR+~ab0D*nm"
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: userPfp }}
          />
          <View className="justify-center items-center gap-y-1">
            <Text className="font-semibold">{user.namesurname}</Text>
            <Text className="text-xs text-custom-lightgrey">{user.email}</Text>
          </View>
        </View>
        {posts != undefined ? (
          posts.map((post) => {
            return (
              <Post
                key={post.postId}
                id={post.postId}
                userId={post.userId}
                text={post.text}
                likeCount={post.likes.length}
                commentCount={post.comments.length}
              />
            );
          })
        ) : (
          <View>
            <Text>Hiç gönderi yok !</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
