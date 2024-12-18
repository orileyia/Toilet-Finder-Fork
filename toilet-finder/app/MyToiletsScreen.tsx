import React, { useState } from "react";
import {
  View,
  Text,
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
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: `Photo ${posts.length + 1}`,
    };
    setPosts([newPost, ...posts]);
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
        numColumns={3}
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
    margin: '2%', // Adjust margin for spacing (percentage)
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    flex: 1,
    height: 350,
    width: 350,
    overflow: 'hidden', // Prevent overflow
  },
  postTitle: {
    fontSize: 18,
    marginTop: 8,
  },
  image: {
    width: "100%", // Set width of the image to fill the container
    height: 300, // Set a fixed height for the image
    borderRadius: 8,
    resizeMode: 'cover', // Ensure the image covers the area without distortion
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