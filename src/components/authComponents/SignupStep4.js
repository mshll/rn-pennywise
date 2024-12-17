import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";

const SignupStep4 = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Fun Header Image */}
        <Image
          source={{
            uri: "https://img.icons8.com/clouds/100/000000/email-open.png", // Fun email icon
          }}
          style={styles.headerImage}
        />

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: "100%" }]} />
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>Almost Done! 🎉</Text>
        <Text style={styles.description}>
          Enter your email and create a password to complete your account setup.
        </Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your Email 📧"
          placeholderTextColor="#555"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Set a Password 🔒"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Finish Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onNext(email, password)}
        >
          <Text style={styles.buttonText}>Finish 🚀</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#FFFDE7", // Soft cream background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#FFE082", // Light orange
    borderRadius: 10,
    marginBottom: 30,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF7043", // Bright orange
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF7043",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFECB3", // Light yellow background
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#FFB74D", // Orange border
    marginBottom: 20,
    shadowColor: "#FFB74D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    width: "100%",
    backgroundColor: "#FF7043", // Bright orange
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#FF8A65",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignupStep4;
