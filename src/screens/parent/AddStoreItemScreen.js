import { Text, YStack, XStack, Input, Theme, Circle, useTheme, Button, Form } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAddStoreItem } from '../../hooks/useParent';

const AddStoreItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { childId } = route.params;
  const { mutate: addStoreItem, isLoading } = useAddStoreItem();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleSubmit = () => {
    const itemData = {
      ...formData,
      price: parseFloat(formData.price),
      child_id: childId,
    };

    addStoreItem(
      { childId, itemData },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
  };

  return (
    <Theme name="purple">
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
              <Icon name="gift" size={42} color={theme.color.val} />
            </Circle>
          </XStack>

          <YStack gap="$2" mb="$6">
            <Text fontSize="$7" fontWeight="600" fontFamily="$heading" ta="center">
              Add Reward
            </Text>
            <Text fontSize="$4" color="$color11" ta="center">
              Create a new reward for your child
            </Text>
          </YStack>

          <Form gap="$4" onSubmit={handleSubmit}>
            <YStack gap="$4">
              <Input
                size="$4"
                placeholder="Reward Name"
                value={formData.name}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                backgroundColor="$color4"
                disabled={isLoading}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
              />

              <Input
                size="$4"
                placeholder="Description"
                value={formData.description}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                backgroundColor="$color4"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                disabled={isLoading}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
              />

              <Input
                size="$4"
                placeholder="Price"
                value={formData.price}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, price: value }))}
                keyboardType="numeric"
                backgroundColor="$color4"
                disabled={isLoading}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
              />

              <Input
                size="$4"
                placeholder="Image URL"
                value={formData.image}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, image: value }))}
                backgroundColor="$color4"
                disabled={isLoading}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
              />
            </YStack>

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
                  {isLoading ? 'Adding Reward...' : 'Add Reward'}
                </Text>
              </XStack>
            </Button>
          </Form>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default AddStoreItemScreen;
