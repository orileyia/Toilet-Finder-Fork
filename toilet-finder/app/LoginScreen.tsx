import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

const handleLogin: (event: GestureResponderEvent) => void = (e) => {
  console.log("send log in request");

  // send log in request
  fetch("http://localhost/My%20sites/Toilet%20Finder%20Server/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "john@example.com",
      password: "1234",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // parse JSON response if needed
    })
    .then((data) => {
      console.log("Success:", data); // handle response data
    })
    .catch((error) => {
      console.error("Error:", error); // handle errors
    });
};

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontFamily: "cursive",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    width: 200,
    padding: 5,
    marginVertical: 5,
    fontSize: 14,
    fontFamily: "cursive",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
  },
  button: {
    width: 200,
    padding: 10,
    backgroundColor: "#00A2FF",
    borderRadius: 3,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "cursive",
  },
});
