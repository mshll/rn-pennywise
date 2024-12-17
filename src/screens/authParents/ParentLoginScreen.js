import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../api/auth"; // Import the login API

const ParentLoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const { token, role } = await login(form.usernameOrEmail, form.password);

      // Save token to AsyncStorage
      await AsyncStorage.setItem("authToken", token);

      // Navigate based on role
      if (role === "PARENT") {
        navigation.replace("ParentHome");
      } else if (role === "CHILD") {
        navigation.replace("ChildHome");
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      setError("Invalid username or password. Please try again.");
      console.error("Login Error:", err.response?.data || err.message);
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
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3588/3588658.png",
            }}
            style={styles.logo}
          />

          {/* Title */}
          <Text style={styles.title}>Welcome to Pennywise!</Text>
          <Text style={styles.subtitle}>
            Helping kids gain money by doing chores and solving quizzes 🎉
          </Text>

          {/* Username or Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor="#28282B"
            value={form.usernameOrEmail}
            onChangeText={(text) =>
              setForm({ ...form, usernameOrEmail: text })
            }
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

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging In..." : "Log In"}
            </Text>
          </TouchableOpacity>

          {/* Signup Link */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ParentSignup")}
            style={styles.link}
          >
            <Text style={styles.linkText}>
              New to Pennywise?{" "}
              <Text style={styles.linkHighlight}>Sign Up 🎈</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#FFECB3",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043",
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
    marginTop: 20,
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

export default ParentLoginScreen;
