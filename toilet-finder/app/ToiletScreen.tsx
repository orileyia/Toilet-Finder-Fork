import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import Swiper from 'react-native-swiper';

export default function ToiletScreen() {
  const [rating, setRating] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  // Примерни изображения и описания
  const images = [
    {
      uri: "https://cdn.pixabay.com/photo/2020/01/04/18/40/trees-4741364_1280.png",
      caption: "The Woods",
    },
    {
      uri: "https://cdn.pixabay.com/photo/2022/08/22/19/02/landscape-7404347_1280.jpg",
      caption: "Beautiful Landscape",
    },
    {
      uri: "https://cdn.pixabay.com/photo/2021/11/23/16/59/forest-6819226_1280.jpg",
      caption: "Forest View",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          onIndexChanged={(index) => setSlideIndex(index)} // Актуализирайте slideIndex
          loop={false} // Не позволявайте циклично плъзгане
        >
          {images.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <Text style={styles.caption}>{image.caption}</Text>
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.name}>Grand Mall Varna</Text>
        <Text style={styles.address}>
          Address: 256 Andrey Saharov St, Varna, 9000, Bulgaria
        </Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
              <AntDesign
                name="star"
                size={24}
                color={index < rating ? "#FFD700" : "#CCCCCC"}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.price}>Free</Text>
        <Text style={styles.slideNumber}>
          Slide {slideIndex + 1} of {images.length}
        </Text>
      </View>
      <Link href="/EditToilet" style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Toilet</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: 500,
  },
  wrapper: {
    height: "100%",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  caption: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
    backgroundColor : "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    height: 15,
    width: 15,
    margin: 5,
    backgroundColor: "#bbb",
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: "#717171",
  },
  detailContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    marginLeft: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#00A2FF",
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  slideNumber: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
});