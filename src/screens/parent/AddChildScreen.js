import { Text, YStack, XStack, Input, Theme, Circle, useTheme, Button, Form } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AddChildScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleSubmit = () => {
    // TODO: Implement add child logic
    navigation.goBack();
  };

  return (
    <Theme name="blue">
      <YStack f={1} backgroundColor="$color2" pt={insets.top} px="$4">
        <XStack w="100%" jc="flex-end" ai="center" py="$2">
          <Button size="$4" circular bg="$color4" pressStyle={{ scale: 0.9 }} onPress={() => navigation.goBack()} animation="bouncy">
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
              <Input size="$4" placeholder="Child's Name" value={name} onChangeText={setName} autoCapitalize="words" backgroundColor="$color4" />
              <Input size="$4" placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" backgroundColor="$color4" />
              <Input
                size="$4"
                placeholder="Email (optional)"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                backgroundColor="$color4"
              />
              <Input
                size="$4"
                placeholder="Birth Year"
                value={birthYear}
                onChangeText={setBirthYear}
                keyboardType="number-pad"
                backgroundColor="$color4"
              />
            </YStack>

            <Theme name="green">
              <Button
                size="$5"
                w="100%"
                bg="$color4"
                icon={<Icon name="plus" size={16} color={theme.color.val} />}
                onPress={handleSubmit}
                animation="bouncy"
              >
                <Text fontSize="$5" fontFamily="$body">
                  Add Child
                </Text>
              </Button>
            </Theme>
          </Form>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default AddChildScreen;
