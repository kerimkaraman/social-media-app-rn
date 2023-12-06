import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PageHeader from "../components/PageHeader";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useSelector((state) => state.user);

  const getData = async () => {
    const db = FIRESTORE;
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      setPosts((previous) => [...previous, doc.data()]);
    });

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const user = await getDocs(q);
    user.forEach((doc) => {
      setUserId(doc.data().id);
    });
  };
  useEffect(() => {
    getData().then(setIsLoading(false));
  }, []);

  return isLoading ? (
    <Text>Hello</Text>
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView className="bg-custom-lightgrey">
        <PageHeader />
        <CreatePost userId={userId} />
        {posts.map((post) => {
          return (
            <Post id={post.postId} userId={post.userId} text={post.text} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
