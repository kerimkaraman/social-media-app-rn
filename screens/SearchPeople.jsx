import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import PeopleSearchItem from "../components/PeopleSearchItem";

export default function SearchPeople() {
  const { searchText } = useSelector((state) => state.search);
  const [users, setUsers] = useState([]);
  const [searchReady, isSearchReady] = useState(false);
  const [filteredUsers, setFilteredUser] = useState([]);

  const handleSearch = async () => {
    const db = FIRESTORE;
    const userRef = await getDocs(collection(db, "users"));
    const newPeople = userRef.docs.map((user) => {
      return {
        id: user.id,
        ...user.data(),
      };
    });

    setUsers(newPeople);
  };

  const filterUsers = async () => {
    const filtered = users.filter((user) =>
      user.namesurname.includes(searchText)
    );
    setFilteredUser(filtered);
  };

  useEffect(() => {
    handleSearch().then(isSearchReady(true));
  }, []);
  useEffect(() => {
    if (searchReady) {
      filterUsers().then(console.log(users));
    }
  }, [searchText]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {searchText == "" ? (
        <View
          className="bg-white flex-col mt-52 items-center justify-center"
          style={{ flex: 1 }}
        >
          <Text>Henüz bir arama yapmadınız. Yukarıya metin giriniz.</Text>
        </View>
      ) : (
        filteredUsers.map((user) => {
          return (
            <PeopleSearchItem
              id={user.id}
              namesurname={user.namesurname}
              email={user.email}
            />
          );
        })
      )}
    </ScrollView>
  );
}
