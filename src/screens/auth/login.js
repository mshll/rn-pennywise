import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Oops!", "Please enter both email and password!");
      return;
    }
    // Placeholder for API call
    Alert.alert("Welcome!", "You are logged in 🎉");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {/* Fun Header Image */}
      <Image
        source={{
          uri: "https://img.icons8.com/clouds/100/000000/sun.png",
        }}
        style={styles.headerImage}
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome Back! 👋</Text>
      <Text style={styles.subtitle}>Please login to start your adventure</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Your Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login 🚀</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text style={styles.signupLink}>Sign Up Here!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF9C4", // Soft yellow background
    paddingHorizontal: 20,
  },
  headerImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043", // Orange
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFECB3", // Light yellow input
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FFB74D", // Orange border
  },
  button: {
    backgroundColor: "#FF7043", // Playful orange button
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#FF8A65",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    fontSize: 14,
    color: "#666",
    marginTop: 20,
  },
  signupLink: {
    color: "#FF7043",
    fontWeight: "bold",
  },
});

export default LoginScreen;
