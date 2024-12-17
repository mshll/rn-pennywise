import { Text, YStack, XStack, Input, Theme, Circle, useTheme, Button, Form } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CoinAmount } from '../../utils/components';

const AddStoreItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { childId } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    // TODO: Implement add store item logic
    navigation.goBack();
  };

  return (
    <Theme name="purple">
      <YStack f={1} backgroundColor="$color2" pt={insets.top} px="$4">
        <XStack w="100%" jc="flex-end" ai="center" py="$2">
          <Button size="$4" circular bg="$color4" pressStyle={{ scale: 0.9 }} onPress={() => navigation.goBack()} animation="bouncy">
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
              <Input size="$4" placeholder="Reward Name" value={name} onChangeText={setName} backgroundColor="$color4" />

              <Input
                size="$4"
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                backgroundColor="$color4"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />

              <Input size="$4" placeholder="Price" value={price} onChangeText={setPrice} keyboardType="number-pad" backgroundColor="$color4" />

              <Input size="$4" placeholder="Image URL (optional)" value={imageUrl} onChangeText={setImageUrl} backgroundColor="$color4" />
            </YStack>

            <Button
              size="$5"
              w="100%"
              bg="$color4"
              icon={<Icon name="plus" size={16} color={theme.color.val} />}
              onPress={handleSubmit}
              animation="bouncy"
            >
              <Text fontSize="$5" fontFamily="$body">
                Add Reward
              </Text>
            </Button>
          </Form>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default AddStoreItemScreen;
