import { useState, useEffect, createContext, useContext } from 'react';
import { YStack, Text, XStack } from 'tamagui';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setToast(null));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            right: 20,
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          }}
        >
          <XStack backgroundColor={toast.type === 'error' ? '$red10' : '$green10'} p="$3" br="$4" ai="flex-start" jc="space-between" elevation={2}>
            <XStack f={1} ai="flex-start" gap="$2">
              <Icon name={toast.type === 'error' ? 'circle-exclamation' : 'circle-check'} size={18} color="white" style={{ marginTop: 3 }} />
              <Text color="white" fontSize="$4" flexWrap="wrap" flex={1}>
                {toast.message}
              </Text>
            </XStack>
          </XStack>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
