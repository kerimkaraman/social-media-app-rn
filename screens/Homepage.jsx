import { SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PageHeader from "../components/PageHeader";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import axios from "axios";
import { ref, onValue } from "firebase/database";
import { DATABASE } from "../firebaseConfig";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useSelector((state) => state.user);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://social-media-rn-19287-default-rtdb.firebaseio.com/users.json?email=${email}`
      );

      const userData = response.data;

      if (userData) {
        Object.values(userData).forEach((ud) => {
          const { id } = ud;
          setUserId(id);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = () => {
    const db = DATABASE;
    const postRef = ref(db, "posts/");
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      setPosts(data);
    });
  };

  useEffect(() => {
    fetchPosts();
    fetchData();
  }, []);

  return isLoading ? null : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {console.log(userId)}
      <ScrollView className="bg-custom-lightgrey">
        <PageHeader />
        <CreatePost userId={userId} />
        <Post />
        {Object.values(posts).map((post) => {
          const { id, text, userId } = post;
          return <Post id={id} text={text} userId={userId} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
