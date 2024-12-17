import React from "react";
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

const SignupStep3 = ({ onNext }) => {
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
            uri: "https://img.icons8.com/clouds/100/000000/child-safe-zone.png",
          }}
          style={styles.headerImage}
        />

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: "75%" }]} />
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>How old is your child? 🎂</Text>
        <Text style={styles.description}>
          We'll tailor the experience to make learning fun and age-appropriate!
          🚀
        </Text>

        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter child's age"
          keyboardType="numeric"
          placeholderTextColor="#555"
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next ➡️</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#FFF9C4", // Soft yellow for a playful vibe
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#FFD180", // Light orange
    borderRadius: 10,
    marginBottom: 20,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF7043", // Bright orange
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF7043", // Playful orange text
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFECB3", // Light yellow input field
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#FFB74D", // Orange border
    marginBottom: 30,
  },
  button: {
    width: "100%",
    backgroundColor: "#FF7043", // Bright orange button
    paddingVertical: 15,
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

export default SignupStep3;
