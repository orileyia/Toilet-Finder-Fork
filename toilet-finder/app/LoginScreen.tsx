import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import $ from "jquery";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleLogin: (event: GestureResponderEvent) => void = (e) => {
    $.ajax({
      url: "http://localhost/Toilet%20Finder%20Server/api/login.php",
      type: "POST",
      data: {
        email: email,
        password: password,
      },
      success: (d) => {
        console.log(d);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setPass}
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
