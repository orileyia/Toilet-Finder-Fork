import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { padding } from "../scripts/utils";
//import { useRouter } from "expo-router";

type ToiletSearchItemProps = {
  imgSrc: string;
};

function ToiletSearchItem() {
  //const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        //router.push("/screens/ToiletScreen");
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.Image}
          source={require("../assets/toilet1.jpg")}
          resizeMode="contain"
        />
        <Text style={styles.address}>Adress: Vladislav Varnenchik 52</Text>
        <Text style={styles.distance}>2km</Text>
      </View>
    </Pressable>
  );
}

export default ToiletSearchItem;

const styles = StyleSheet.create({
  Image: {
    width: 100,
    height: 100,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B2E3FF",
    ...padding(15),
    borderRadius: 15,
    marginBottom: 15,
  },
  address: {
    marginLeft: 20,
    fontSize: 15,
  },
  distance: {
    ...padding(0, 20),
    fontSize: 25,
  },
});
