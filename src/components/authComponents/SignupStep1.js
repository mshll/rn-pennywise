import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const SignupStep1 = ({ onNext }) => {
  return (
    <View style={styles.container}>
      {/* Fun Header Image */}
      <Image
        source={{
          uri: "https://img.icons8.com/clouds/100/000000/children.png", // Fun image URL
        }}
        style={styles.headerImage}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>

      {/* Title and Description */}
      <Text style={styles.title}>Who's learning to read? 📚</Text>
      <Text style={styles.description}>
        This helps us create the right account for you and your readers.
      </Text>

      {/* Option Box */}
      <TouchableOpacity style={styles.optionBox}>
        <Text style={styles.optionTitle}>👦 My child</Text>
        <Text style={styles.optionDescription}>
          I'm a parent or caregiver and will use this app with kids at home.
        </Text>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Select 🚀</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFECB3", // Soft yellow background
  },
  headerImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#FFD180", // Light orange
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBarFill: {
    width: "25%", // 25% progress for step 1
    height: "100%",
    backgroundColor: "#FF7043", // Bright orange
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7043", // Orange text
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  optionBox: {
    backgroundColor: "#FFCCBC", // Light orange option box
    borderRadius: 15,
    padding: 20,
    width: "100%",
    shadowColor: "#FF7043",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: "#FF7043", // Orange button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#FF8A65",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignupStep1;
