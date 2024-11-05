import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListRenderItem,
} from "react-native";

type Post = {
  id: number;
  title: string;
};

export default function MyToiletsScreen() {
  const [posts, setPosts] = useState<Post[] | never[]>([]);

  const addPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: `Photo ${posts.length + 1}`,
    };
    setPosts([...posts, newPost]);
  };

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <View style={styles.post}>
      <Image
        source={{ uri: "https://placehold.co/300" }}
        style={styles.image}
      />
      <Text style={styles.postTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Toilets</Text>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.postsContainer}
        showsHorizontalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.addButton} onPress={addPost}>
        <Text style={styles.addButtonText}>+ Add Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  postsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  post: {
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 18,
    marginTop: 8,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
