import { Text, YStack, XStack, Input, Button, Theme, Circle, useTheme, Sheet, ScrollView, Image } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useMutation } from '@tanstack/react-query';
import { register } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { getRole } from '../api/storage';
import { useToast } from '../components/Toast';
import { AVATARS } from '../data/avatars';

const Signup = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { setUser, setRole } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarUrl: 'avatar1',
  });

  const [showAvatarSheet, setShowAvatarSheet] = useState(false);

  const {
    mutate: registerUser,
    isLoading,
    reset: resetMutation,
  } = useMutation({
    mutationFn: () => register(formData.email, formData.username, formData.password, formData.avatarUrl),
    onSuccess: async (response) => {
      try {
        setUser(response.token);
        const userRole = await getRole();
        setRole(userRole);
        showToast('Account created successfully!');
      } catch (err) {
        console.error('Registration processing error:', err);
        showToast('Failed to process registration. Please try again.', 'error');
        resetMutation();
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to register. Please try again.';
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
    if (!formData.email.trim() || !formData.username.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      showToast('Please fill in all fields', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }

    if (formData.username.length < 3) {
      showToast('Username must be at least 3 characters long', 'error');
      return false;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return false;
    }

    return true;
  };

  const handleSignup = () => {
    if (!validateForm()) return;
    registerUser();
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
            <Circle size="$12" bg="$color4" p="$2">
              <Image source={AVATARS[formData.avatarUrl]} width="100%" height="100%" borderRadius={999} />
            </Circle>
          </XStack>

          <YStack gap="$2" mb="$6">
            <Text fontSize="$7" fontWeight="600" fontFamily="$heading" ta="center">
              Create Account
            </Text>
            <Text fontSize="$4" color="$color11" ta="center">
              Join us and start your journey
            </Text>
          </YStack>

          <YStack gap="$4">
            <YStack gap="$4">
              <Input
                size="$4"
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                autoCapitalize="none"
                keyboardType="email-address"
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Username"
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                autoCapitalize="none"
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Button
                size="$4"
                w="100%"
                bg="$color4"
                onPress={() => setShowAvatarSheet(true)}
                disabled={isLoading}
                animation="bouncy"
                pressStyle={{ scale: 0.97 }}
              >
                <XStack gap="$2" ai="center">
                  <Image source={AVATARS[formData.avatarUrl]} width={24} height={24} borderRadius={12} />
                  <Text>Choose Avatar</Text>
                </XStack>
              </Button>
            </YStack>

            <Button
              size="$5"
              w="100%"
              bg={isLoading ? '$color5' : '$color4'}
              onPress={handleSignup}
              disabled={isLoading}
              animation="bouncy"
              pressStyle={{ scale: 0.97 }}
              opacity={isLoading ? 0.7 : 1}
            >
              <XStack gap="$2" ai="center">
                {isLoading && <Icon name="circle-notch" size={20} color={theme.color.val} style={{ transform: [{ rotate: '360deg' }] }} />}
                <Text fontSize="$5" fontFamily="$body">
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Text>
              </XStack>
            </Button>
          </YStack>

          <YStack ai="center" mt="$4">
            <Text fontSize="$3" color="$color11">
              Already have an account?{' '}
              <Text
                color="$color12"
                fontWeight="600"
                onPress={() => !isLoading && navigation.replace('Login')}
                pressStyle={{ scale: 0.95 }}
                opacity={isLoading ? 0.5 : 1}
              >
                Sign in
              </Text>
            </Text>
          </YStack>
        </YStack>

        <Sheet modal open={showAvatarSheet} onOpenChange={setShowAvatarSheet} snapPointsMode="fit" dismissOnSnapToBottom>
          <Sheet.Overlay />
          <Sheet.Frame padding="$4" pb="$8">
            <Sheet.Handle />
            <YStack gap="$4">
              <Text fontSize="$6" fontWeight="600" ta="center">
                Choose Your Avatar
              </Text>
              <XStack flexWrap="wrap" jc="center" gap="$4">
                {Object.entries(AVATARS).map(
                  ([key, value]) =>
                    key !== 'DEFAULT' && (
                      <Button
                        key={key}
                        size="$6"
                        circular
                        onPress={() => {
                          handleInputChange('avatarUrl', key);
                          setShowAvatarSheet(false);
                        }}
                        borderWidth={formData.avatarUrl === key ? 2 : 0}
                        borderColor="$color12"
                      >
                        <Image source={value} width={48} height={48} borderRadius={24} />
                      </Button>
                    )
                )}
              </XStack>
            </YStack>
          </Sheet.Frame>
        </Sheet>
      </YStack>
    </Theme>
  );
};

export default Signup;
