import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const SignupStep5 = ({ onGetStarted }) => {
  return (
    <View style={styles.container}>
      {/* Fun Celebration Image */}
      <Image
        source={{
          uri: "https://img.icons8.com/clouds/100/000000/confetti.png", // Fun confetti image
        }}
        style={styles.headerImage}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: "100%" }]} />
      </View>

      {/* Congratulations Message */}
      <Text style={styles.congratsText}>🎉 Hooray, [Name]! 🎉</Text>
      <Text style={styles.description}>
        Welcome to <Text style={styles.appName}>PennyWise</Text>! 🌟 Your
        adventure to becoming a money master starts now!
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <Text style={styles.buttonText}>Let’s Go 🚀</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFDE7", // Soft cream for celebration
  },
  headerImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#FFECB3", // Light yellow
    borderRadius: 10,
    marginBottom: 30,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF7043", // Bright orange
    borderRadius: 10,
  },
  congratsText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF7043", // Playful orange
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  appName: {
    fontWeight: "bold",
    color: "#00C897", // Highlight the app name
  },
  button: {
    backgroundColor: "#FF7043", // Bright playful button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
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

export default SignupStep5;
