import { Text, YStack, XStack, Input, Theme, Circle, useTheme, Button, Form, Sheet, Image } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAddChild } from '../../hooks/useParent';
import { AVATARS } from '../../data/avatars';

const AddChildScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { mutate: addChild, isLoading } = useAddChild();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    initialBalance: '100',
    dateOfBirth: '',
    avatarUrl: 'avatar1',
  });

  const [showAvatarSheet, setShowAvatarSheet] = useState(false);
  const [success, setSuccess] = useState(false);
  const [childCredentials, setChildCredentials] = useState(null);

  const handleSubmit = () => {
    const childData = {
      ...formData,
      initialBalance: parseFloat(formData.initialBalance),
    };
    addChild(childData, {
      onSuccess: (response) => {
        setChildCredentials({
          username: response.username,
          password: response.password || formData.password,
        });
        setSuccess(true);
      },
    });
  };

  if (success && childCredentials) {
    return (
      <Theme name="green">
        <YStack f={1} backgroundColor="$color2" pt={insets.top} px="$4">
          <XStack w="100%" jc="flex-end" ai="center" py="$2">
            <Button size="$4" circular bg="$color4" pressStyle={{ scale: 0.9 }} onPress={() => navigation.goBack()} animation="bouncy">
              <Icon name="xmark" size={16} color={theme.color.val} />
            </Button>
          </XStack>

          <YStack f={1} gap="$4">
            <XStack w="100%" jc="center" ai="center" mb="$4">
              <Circle size="$12" bg="$color4">
                <Icon name="check" size={42} color={theme.color.val} />
              </Circle>
            </XStack>

            <YStack gap="$2" mb="$6">
              <Text fontSize="$7" fontWeight="600" fontFamily="$heading" ta="center">
                Child Added Successfully!
              </Text>
              <Text fontSize="$4" color="$color11" ta="center">
                Here are your child's login credentials
              </Text>
            </YStack>

            <YStack gap="$4" bg="$color4" p="$4" br="$4">
              <YStack gap="$2">
                <Text fontSize="$3" color="$color11">
                  Username
                </Text>
                <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
                  {childCredentials.username}
                </Text>
              </YStack>

              <YStack gap="$2">
                <Text fontSize="$3" color="$color11">
                  Password
                </Text>
                <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
                  {childCredentials.password}
                </Text>
              </YStack>
            </YStack>

            <Text fontSize="$3" color="$color11" ta="center" mt="$4">
              Make sure to save these credentials! Your child will need them to log in.
            </Text>

            <Button size="$5" w="100%" bg="$color4" onPress={() => navigation.goBack()} animation="bouncy" mt="$4">
              <Text fontSize="$5" fontFamily="$body">
                Done
              </Text>
            </Button>
          </YStack>
        </YStack>
      </Theme>
    );
  }

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
            <Circle size="$12" bg="$color4" p="$2">
              <Image source={AVATARS[formData.avatarUrl]} width="100%" height="100%" borderRadius={999} />
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

            <YStack gap="$4">
              <Input
                size="$4"
                placeholder="Username"
                value={formData.username}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, username: value }))}
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
                onChangeText={(value) => setFormData((prev) => ({ ...prev, password: value }))}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Initial Balance"
                value={formData.initialBalance}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, initialBalance: value }))}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={formData.dateOfBirth}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, dateOfBirth: value }))}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
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
                  <Text fontSize="$3" fontFamily="$body">
                    {isLoading ? 'Adding Child...' : 'Add Child'}
                  </Text>
                </XStack>
              </Button>
            </Theme>
          </Form>
        </YStack>

        <Sheet modal open={showAvatarSheet} onOpenChange={setShowAvatarSheet} snapPointsMode="fit" dismissOnSnapToBottom>
          <Sheet.Overlay />
          <Sheet.Frame padding="$4" pb="$8">
            <Sheet.Handle />
            <YStack gap="$4">
              <Text fontSize="$6" fontWeight="600" ta="center">
                Choose Avatar
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
                          setFormData((prev) => ({ ...prev, avatarUrl: key }));
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

export default AddChildScreen;
