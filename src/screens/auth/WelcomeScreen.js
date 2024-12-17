import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pennywise!</Text>
      <Text style={styles.subtitle}>
        Helping kids gain money by doing chores and solving quizzes 🎉
      </Text>

      {/* Parent Login */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ParentLogin")}
      >
        <Text style={styles.buttonText}>Log in as Parent</Text>
      </TouchableOpacity>

      {/* Parent Signup */}
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate("ParentSignup")}
      >
        <Text style={styles.buttonText}>Sign Up as Parent</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD180", // Fun Orange background
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#6D4C41",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    width: "100%",
    backgroundColor: "#FF7043",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#FFA726",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
