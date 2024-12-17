import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { signup } from "../../api/auth"; // Import the signup API
import AsyncStorage from "@react-native-async-storage/async-storage";

const ParentSignupScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await signup({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // Save token
      await AsyncStorage.setItem("authToken", response.token);

      // Navigate to HomeScreen
      navigation.replace("Home"); // Make sure "Home" matches the route name in your navigator
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error("Signup Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Logo */}
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2885/2885483.png", // Family icon
              }}
              style={styles.logo}
            />

            {/* Title */}
            <Text style={styles.title}>Join Pennywise!</Text>
            <Text style={styles.subtitle}>
              Create your account and get your kids started 🎉
            </Text>

            {/* Username Input */}
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#28282B"
              value={form.username}
              onChangeText={(text) => setForm({ ...form, username: text })}
            />

            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#28282B"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#28282B"
              secureTextEntry
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />

            {/* Error Message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Signup Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Already have an account? */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ParentLogin")}
              style={styles.link}
            >
              <Text style={styles.linkText}>
                Already have an account?{" "}
                <Text style={styles.linkHighlight}>Log In 🎈</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#FFECB3", // Fun and warm background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043", // Fun orange
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6D4C41",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#FFE0B2",
    borderRadius: 20,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    borderColor: "#FFB74D",
    borderWidth: 1.5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF7043",
    paddingVertical: 12,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#6D4C41",
  },
  linkHighlight: {
    color: "#FF7043",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default ParentSignupScreen;
