import { Text, YStack, XStack, Input, Button, Theme, Circle, useTheme } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { getRole } from '../api/storage';
import { useToast } from '../components/Toast';

const Login = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { setUser, setRole } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const {
    mutate: loginUser,
    isLoading,
    reset: resetMutation,
  } = useMutation({
    mutationFn: () => login(formData.username, formData.password),
    onSuccess: async (response) => {
      try {
        setUser(response.token);
        const userRole = await getRole();
        setRole(userRole);
        showToast('Successfully logged in!');
      } catch (err) {
        console.error('Login processing error:', err);
        showToast('Failed to process login. Please try again.', 'error');
        resetMutation();
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to login. Please check your credentials.';
      showToast(message, 'error');
    },
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      showToast('Please fill in all fields', 'error');
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!validateForm()) return;
    loginUser();
  };

  return (
    <Theme name="blue">
      <YStack f={1} backgroundColor="$color2" pt={insets.top} px="$4">
        <XStack w="100%" jc="flex-start" ai="center" py="$2">
          <Button
            size="$4"
            circular
            bg="$color4"
            pressStyle={{ scale: 0.9 }}
            onPress={() => navigation.goBack()}
            animation="bouncy"
            disabled={isLoading}
          >
            <Icon name="chevron-left" size={16} color={theme.color.val} />
          </Button>
        </XStack>

        <YStack f={1} gap="$4">
          <XStack w="100%" jc="center" ai="center" mb="$4">
            <Circle size="$12" bg="$color4">
              <Icon name="user" size={42} color={theme.color.val} />
            </Circle>
          </XStack>

          <YStack gap="$2" mb="$6">
            <Text fontSize="$7" fontWeight="600" fontFamily="$heading" ta="center">
              Welcome Back!
            </Text>
            <Text fontSize="$4" color="$color11" ta="center">
              Sign in to continue your journey
            </Text>
          </YStack>

          <YStack gap="$4">
            <YStack gap="$4">
              <Input
                size="$4"
                placeholder="Username"
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                backgroundColor="$color4"
                disabled={isLoading}
              />
            </YStack>

            <Button
              size="$5"
              w="100%"
              bg={isLoading ? '$color5' : '$color4'}
              onPress={handleLogin}
              disabled={isLoading}
              animation="bouncy"
              pressStyle={{ scale: 0.97 }}
              opacity={isLoading ? 0.7 : 1}
            >
              <XStack gap="$2" ai="center">
                {isLoading && <Icon name="circle-notch" size={20} color={theme.color.val} style={{ transform: [{ rotate: '360deg' }] }} />}
                <Text fontSize="$4" fontWeight="600" fontFamily="$body">
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Text>
              </XStack>
            </Button>
          </YStack>

          <YStack ai="center" mt="$4">
            <Text fontSize="$3" color="$color11">
              Don't have an account?{' '}
              <Text
                color="$color12"
                fontWeight="600"
                onPress={() => !isLoading && navigation.replace('Signup')}
                pressStyle={{ scale: 0.95 }}
                opacity={isLoading ? 0.5 : 1}
              >
                Create one
              </Text>
            </Text>
          </YStack>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default Login;
