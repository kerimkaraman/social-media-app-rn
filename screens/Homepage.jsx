import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PageHeader from "../components/PageHeader";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import CommentModal from "./CommentModal";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useSelector((state) => state.user);

  const getData = async () => {
    const db = FIRESTORE;
    const postsCollection = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const newPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(newPosts);
    });
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const user = await getDocs(q);
    user.forEach((doc) => {
      setUserId(doc.data().id);
    });

    unsubscribe();
  };
  useEffect(() => {
    getData().then(setIsLoading(false));
  }, [posts]);

  return isLoading ? (
    <Text>Hello</Text>
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView style={{ flex: 1 }} className="bg-custom-lightgrey">
        <CreatePost userId={userId} />
        {posts.map((post) => {
          return (
            <Post
              id={post.postId}
              likeCount={post.likes.length}
              commentCount={post.comments.length}
              userId={post.userId}
              text={post.text}
            />
          );
        })}
        <CommentModal />
      </ScrollView>
    </SafeAreaView>
  );
}
