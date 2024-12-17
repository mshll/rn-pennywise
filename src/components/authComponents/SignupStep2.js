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

const SignupStep2 = ({ onNext }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Fun Header Image */}
        <Image
          source={{
            uri: "https://img.icons8.com/clouds/100/000000/baby.png",
          }}
          style={styles.headerImage}
        />

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: "50%" }]} />
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>What is your child's name? 🌟</Text>
        <Text style={styles.description}>
          Let’s personalize their experience and make it magical! ✨
        </Text>

        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter Child's Name"
          placeholderTextColor="#555"
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next 🎈</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#FFECB3", // Playful soft yellow
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#FFD180", // Light orange
    borderRadius: 10,
    marginBottom: 30,
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
    marginBottom: 10,
    color: "#FF7043", // Playful orange
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFF3E0", // Very light orange
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#FFB74D",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    backgroundColor: "#FF7043",
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

export default SignupStep2;
