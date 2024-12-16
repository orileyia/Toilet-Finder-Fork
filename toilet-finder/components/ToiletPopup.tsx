// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import React from "react";
// import Swiper from 'react-native-swiper';

// const ToiletPopup = ({ selectedToilet, onClose }) => {
//   // Примерни изображения и описания
//   const images = [
//     {
//       uri: "https://cdn.pixabay.com/photo/2020/01/04/18/40/trees-4741364_1280.png",
//       caption: "Toilet Image 1",
//     },
//     {
//       uri: "https://cdn.pixabay.com/photo/2022/08/22/19/02/landscape-7404347_1280.jpg",
//       caption: "Toilet Image 2",
//     },
//     {
//       uri: "https://cdn.pixabay.com/photo/2021/11/23/16/59/forest-6819226_1280.jpg",
//       caption: "Toilet Image 3",
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <Swiper
//           style={styles.wrapper}
//           showsButtons={true}
//           loop={false}
//         >
//           {images.map((image, index) => (
//             <View style={styles.slide} key={index}>
//               <Image source={{ uri: image.uri }} style={styles.image} />
//               <Text style={styles.caption}>{image.caption}</Text>
//             </View>
//           ))}
//         </Swiper>
//       </View>
//       <View style={styles.detailContainer}>
//         <Text style={styles.name}>{selectedToilet.name || "Toilet Name"}</Text>
//         <Text style={styles.address}>
//           Address: {selectedToilet.address || "Toilet Address"}
//         </Text>
//         <View style={styles.ratingContainer}>
//           {[...Array(5)].map((_, index) => (
//             <TouchableOpacity key={index}>
//               <AntDesign
//                 name="star"
//                 size={24}
//                 color={index < selectedToilet.rating ? "#FFD700" : "#CCCCCC"}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>
//         <Text style={styles.price}>{selectedToilet.price || "Free"}</Text>
//         <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//           <Text style={styles.closeButtonText}>Close</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: 300,
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 10,
//   },
//   imageContainer: {
//     width: "100%",
//     height: 150,
//   },
//   wrapper: {
//     height: "100%",
//   },
//   slide: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   caption: {
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//     color: "white",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 5,
//     borderRadius: 5,
//   },
//   detailContainer: {
//     padding: 10,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 5,
//   },
//   address: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 10,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   price: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   closeButton: {
//     backgroundColor: "#00A2FF",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default ToiletPopup;