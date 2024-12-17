import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SignupStep1 from "../../components/authComponents/SignupStep1";
import SignupStep2 from "../../components/authComponents/SignupStep2";
import SignupStep3 from "../../components/authComponents/SignupStep3";
import SignupStep4 from "../../components/authComponents/SignupStep4";
import SignupStep5 from "../../components/authComponents/SignupStep5";

const Signup = ({ navigation }) => {
  // Receive navigation as prop
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SignupStep1 onNext={nextStep} />;
      case 2:
        return <SignupStep2 onNext={nextStep} />;
      case 3:
        return <SignupStep3 onNext={nextStep} />;
      case 4:
        return <SignupStep4 onNext={nextStep} />;
      case 5:
        return <SignupStep5 onGetStarted={() => navigation.navigate("Home")} />;
      default:
        return <SignupStep1 onNext={nextStep} />;
    }
  };

  return <View style={styles.container}>{renderStep()}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

export default Signup;
