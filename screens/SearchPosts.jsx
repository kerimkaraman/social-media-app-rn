import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { FIRESTORE } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import Post from "../components/Post";

export default function SearchPosts() {
  const { searchText } = useSelector((state) => state.search);
  const [posts, setPosts] = useState([]);
  const [searchReady, isSearchReady] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearch = async () => {
    const db = FIRESTORE;
    const postRef = await getDocs(collection(db, "posts"));
    const newPost = postRef.docs.map((post) => {
      return {
        id: post.id,
        ...post.data(),
      };
    });
    setPosts(newPost);
  };

  const filterPosts = async () => {
    const filtered = posts.filter((post) => post.text.includes(searchText));
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    handleSearch().then(isSearchReady(true));
  }, []);

  useEffect(() => {
    if (searchReady) {
      filterPosts().then(console.log(filteredPosts));
    }
  }, [searchText]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {searchText != "" ? (
        filteredPosts.map((pp) => {
          return (
            <Post
              key={pp.postId}
              id={pp.postId}
              userId={pp.userId}
              likeCount={pp.likes.length}
              commentCount={pp.comments.length}
              text={pp.text}
            />
          );
        })
      ) : (
        <View
          className="bg-white flex-col mt-52 items-center justify-center"
          style={{ flex: 1 }}
        >
          <Text>Henüz bir arama yapmadınız. Yukarıya metin giriniz.</Text>
        </View>
      )}
    </ScrollView>
  );
}
