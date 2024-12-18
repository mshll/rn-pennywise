import { Text, YStack, XStack, Input, Theme, Circle, useTheme, Button, Form } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAddChild } from '../../hooks/useParent';

const AddChildScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { mutate: addChild, isLoading } = useAddChild();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    initialBalance: '100',
    dateOfBirth: '',
  });

  const handleSubmit = () => {
    const childData = {
      ...formData,
      initialBalance: parseFloat(formData.initialBalance),
    };
    addChild(childData, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <Theme name="blue">
      <YStack f={1} backgroundColor="$color2" pt={insets.top} px="$4">
        <XStack w="100%" jc="flex-end" ai="center" py="$2">
          <Button
            size="$4"
            circular
            bg="$color4"
            pressStyle={{ scale: 0.9 }}
            onPress={() => navigation.goBack()}
            animation="bouncy"
            disabled={isLoading}
          >
            <Icon name="xmark" size={16} color={theme.color.val} />
          </Button>
        </XStack>

        <YStack f={1} gap="$4">
          <XStack w="100%" jc="center" ai="center" mb="$4">
            <Circle size="$12" bg="$color4">
              <Icon name="child" size={42} color={theme.color.val} />
            </Circle>
          </XStack>

          <YStack gap="$2" mb="$6">
            <Text fontSize="$7" fontWeight="600" fontFamily="$heading" ta="center">
              Add Child
            </Text>
            <Text fontSize="$4" color="$color11" ta="center">
              Enter your child's information
            </Text>
          </YStack>

          <Form gap="$4" onSubmit={handleSubmit}>
            <YStack gap="$4">
              <Input
                size="$4"
                placeholder="Username"
                value={formData.username}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, username: value }))}
                autoCapitalize="none"
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                autoCapitalize="none"
                keyboardType="email-address"
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, password: value }))}
                secureTextEntry
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Initial Balance"
                value={formData.initialBalance}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, initialBalance: value }))}
                keyboardType="numeric"
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={formData.dateOfBirth}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, dateOfBirth: value }))}
                backgroundColor="$color4"
                disabled={isLoading}
              />
            </YStack>

            <Theme name="green">
              <Button
                size="$5"
                w="100%"
                bg="$color4"
                icon={isLoading ? undefined : <Icon name="plus" size={16} color={theme.color.val} />}
                onPress={handleSubmit}
                animation="bouncy"
                disabled={isLoading}
              >
                <XStack gap="$2" ai="center">
                  {isLoading && <Icon name="circle-notch" size={20} color={theme.color.val} style={{ transform: [{ rotate: '360deg' }] }} />}
                  <Text fontSize="$5" fontFamily="$body">
                    {isLoading ? 'Adding Child...' : 'Add Child'}
                  </Text>
                </XStack>
              </Button>
            </Theme>
          </Form>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default AddChildScreen;
