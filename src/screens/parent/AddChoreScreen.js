import { Text, YStack, XStack, Input, Theme, Circle, useTheme, Button, Form } from 'tamagui';
import { useState, memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { useAddChore, useParentProfile, useParentBalance } from '../../hooks/useParent';
import { CoinAmount } from '../../utils/components';
import { useToast } from '../../components/Toast';

const icons = [
  'broom',
  'book',
  'utensils',
  'shirt',
  'paw',
  'seedling',
  'bed',
  'bath',
  'tooth',
  'trash',
  'plate-wheat',
  'socks',
  'backpack',
  'pen',
  'pencil',
  'paintbrush',
  'basketball',
  'bicycle',
  'puzzle-piece',
  'music',
  'computer',
  'gamepad',
  'table',
  'couch',
  'window',
  'door',
  'car',
  'fish',
  'cat',
  'dog',
  'leaf',
  'carrot',
  'kitchen-set',
  'soap',
  'toilet-paper',
  'spray-can',
  'vacuum-robot',
];

const IconButton = memo(({ iconName, isSelected, onPress, theme }) => (
  <Button size="$5" circular backgroundColor={isSelected ? '$color4' : '$color6'} pressStyle={{ scale: 0.95 }} onPress={onPress} animation="quick">
    <Icon name={iconName} size={20} color={theme.color.val} />
  </Button>
));

const AddChoreScreen = ({ route }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { childId } = route.params;
  const { mutate: addChore, isLoading } = useAddChore();
  const { data: parentProfile } = useParentProfile();
  const { data: parentBalance = 0 } = useParentBalance(parentProfile?.username);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rewardAmount: '',
    icon: 'broom',
  });

  const handleSubmit = useCallback(() => {
    const rewardAmount = parseFloat(formData.rewardAmount);
    if (rewardAmount > parentBalance) {
      showToast('Insufficient balance for reward amount', 'error');
      return;
    }

    if (!formData.title.trim()) {
      showToast('Please enter a task title', 'error');
      return;
    }

    const choreData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      rewardAmount,
      icon: formData.icon,
    };

    addChore(
      {
        childId,
        choreData,
        username: parentProfile?.username,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
  }, [formData, childId, addChore, navigation, parentProfile?.username, parentBalance]);

  const renderIcon = useCallback(
    ({ item }) => (
      <XStack pr="$2">
        <IconButton
          iconName={item}
          isSelected={formData.icon === item}
          onPress={() => setFormData((prev) => ({ ...prev, icon: item }))}
          theme={theme}
        />
      </XStack>
    ),
    [formData.icon, theme]
  );

  const keyExtractor = useCallback((item) => item, []);

  return (
    <Theme name="green">
      <YStack f={1} backgroundColor="$color2" pt={insets.top} px="$4">
        <XStack w="100%" jc="flex-end" ai="center" py="$2">
          <Button
            size="$4"
            circular
            bg="$color4"
            pressStyle={{ scale: 0.9 }}
            onPress={() => navigation.goBack()}
            animation="quick"
            disabled={isLoading}
          >
            <Icon name="xmark" size={16} color={theme.color.val} />
          </Button>
        </XStack>

        <YStack f={1} gap="$4">
          <XStack w="100%" jc="center" ai="center" mb="$4">
            <Circle size="$12" bg="$color4">
              <Icon name="list-check" size={42} color={theme.color.val} />
            </Circle>
          </XStack>

          <YStack gap="$2" mb="$6">
            <Text fontSize="$7" fontWeight="600" fontFamily="$heading" ta="center">
              Add Task
            </Text>
            <Text fontSize="$4" color="$color11" ta="center">
              Create a new task for your child
            </Text>
            <XStack jc="center" ai="center" gap="$3">
              <Text fontSize="$3" color="$color11" ta="center">
                Your Balance:
              </Text>
              <CoinAmount amount={parentBalance} />
            </XStack>
          </YStack>

          <Form gap="$4" onSubmit={handleSubmit}>
            <YStack gap="$4">
              <Input
                size="$4"
                placeholder="Task Title"
                value={formData.title}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, title: value }))}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Description"
                value={formData.description}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                backgroundColor="$color4"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                disabled={isLoading}
              />

              <Input
                size="$4"
                placeholder="Reward Amount"
                value={formData.rewardAmount}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, rewardAmount: value }))}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                backgroundColor="$color4"
                disabled={isLoading}
              />

              <YStack gap="$2">
                <Text fontSize="$3" color="$color11">
                  Choose an Icon
                </Text>
                <FlatList
                  data={icons}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={keyExtractor}
                  renderItem={renderIcon}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={5}
                  removeClippedSubviews={true}
                  getItemLayout={(data, index) => ({
                    length: 48,
                    offset: 48 * index,
                    index,
                  })}
                  contentContainerStyle={{ paddingBottom: 8 }}
                />
              </YStack>
            </YStack>

            <Button
              size="$5"
              w="100%"
              bg="$color4"
              icon={isLoading ? undefined : <Icon name="plus" size={16} color={theme.color.val} />}
              onPress={handleSubmit}
              animation="quick"
              disabled={isLoading}
            >
              <XStack gap="$2" ai="center">
                {isLoading && <Icon name="circle-notch" size={20} color={theme.color.val} style={{ transform: [{ rotate: '360deg' }] }} />}
                <Text fontSize="$5" fontFamily="$body">
                  {isLoading ? 'Adding Task...' : 'Add Task'}
                </Text>
              </XStack>
            </Button>
          </Form>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default memo(AddChoreScreen);
