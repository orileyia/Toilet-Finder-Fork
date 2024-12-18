import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import Swiper from 'react-native-swiper';

const EditToiletScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [rating, setRating] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log({ name, address, price, images, longitude, latitude, rating });
  };

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Toilet</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter toilet name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Coordinates</Text>
        <View style={styles.coordinatesContainer}>
          <TextInput
            style={styles.coordinateInput}
            placeholder="Longitude"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.coordinateInput}
            placeholder="Latitude"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price or 'Free'"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Rating</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
              <AntDesign
                name="star"
                size={24}
                color={index < rating ? "#FFD700" : "#CCCCCC"}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Images</Text>
        {images.length > 0 ? (
          <View style={styles.imageSlideshow}>
            <Swiper
              style={styles.wrapper}
              showsButtons={true}
              loop={false}
              onIndexChanged={(index) => setCurrentIndex(index)}
              nextButton={currentIndex < images.length - 1 ? <Text style={styles.buttonText}>›</Text> : null}
              prevButton={currentIndex > 0 ? <Text style={styles.buttonText}>‹</Text> : null}
            >
              {images.map((image, index) => (
                <View style={styles.slide} key={index}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <Text style={styles.caption}>Image {index + 1}</Text>
                </View>
              ))}
            </Swiper>
            <TouchableOpacity onPress={() => removeImage(0)} style={styles.removeImageButton}>
              <Text style={styles.removeImageText}>Remove Current Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>No images selected</Text>
        )}

        <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
          <Text style={styles.imagePickerButtonText}>Add Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  wrapper: {
    height: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    color: "#555",
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    padding: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  coordinatesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  coordinateInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  imageSlideshow: {
    height: 300,
    marginTop: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  caption: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  removeImageButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  removeImageText: {
    color: "white",
  },
  imagePickerButton: {
    marginTop: 10,
    backgroundColor: "#00A2FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#00A2FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditToiletScreen;