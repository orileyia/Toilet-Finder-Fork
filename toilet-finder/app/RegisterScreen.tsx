import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost/Toilet%20Finder%20Server/api/register.php", {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uname: username,
          password: password,
        }),
      });

      const result = await response.json();

      if (result === true) {
        Alert.alert("Success", "User registered successfully!");
      } else {
        Alert.alert("Error", "Registration failed!");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
