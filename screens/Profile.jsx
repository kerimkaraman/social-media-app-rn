import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { onValue, ref } from "firebase/database";
import { DATABASE, STORAGE } from "../firebaseConfig";
import Post from "../components/Post";
import { getDownloadURL, ref as ref_storage } from "firebase/storage";

export default function Profile({ isUser, email }) {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const [userPfp, setUserPfp] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://social-media-rn-19287-default-rtdb.firebaseio.com/users.json?email=${email}`
      );
      const userData = response.data;

      if (userData) {
        setUser(userData);
        Object.values(userData).map((ud) => {
          setUserId(ud.id);
        });
      }
      const storage = STORAGE;
      getDownloadURL(ref_storage(storage, `pfps/${userId}`))
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          setUserPfp(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    const db = DATABASE;
    const postRef = ref(db, "posts/");
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      setPosts(data);
    });
    return console.log(posts);
  };

  useEffect(() => {
    fetchData().then(fetchPosts()).then(setIsLoading(false));
  }, []);
  return isLoading ? null : (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View>
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{ uri: userPfp }}
        />
        {Object.values(user).map((ud) => {
          const { id, email, namesurname } = ud;
          return (
            <View key={id} className="flex-col gap-y-2">
              <Text className="font-medium">{namesurname}</Text>
              <Text className="text-xs text-custom-lightgrey">{email}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

/* {Object.values(posts).map((post, index) => {
        return post.userId === userId ? (
          <Post id={post.id} userId={post.userId} text={post.text} />
        ) : null;
      })} */
