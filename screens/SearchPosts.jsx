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
    <ScrollView>
      {searchText != "" ? (
        filteredPosts.map((post) => {
          return (
            <Post
              id={post.postId}
              userId={post.userId}
              likeCount={post.likes.length}
              commentCount={post.comments.length}
              text={post.text}
            />
          );
        })
      ) : (
        <Text>Böyle bir gönderi yok !</Text>
      )}
    </ScrollView>
  );
}
