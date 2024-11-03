import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

const handleRegister: (event: GestureResponderEvent) => void = (e) => {
  console.log("tried to register");
};

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Form</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
