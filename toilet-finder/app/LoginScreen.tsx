import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { login } from "../api.js"; // Import the login function from api.ts
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined; // Add other screens as needed
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const result = await login(email, password); // Call the API function
      if (result) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Home"); // Navigate to the "Home" screen
      } else {
        Alert.alert("Error", "Invalid credentials or login failed!");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      Alert.alert("Error", error.message || "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default LoginScreen;
