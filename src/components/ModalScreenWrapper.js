import { YStack, useTheme, XStack, Button } from 'tamagui';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const ModalScreenWrapper = ({ children, containerProps = {}, scrollViewProps = {}, title }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <YStack f={1} backgroundColor={theme.color2.val}>
      {/* Header */}
      <YStack backgroundColor={theme.color5.val} pt={insets.top}>
        <XStack height={60} ai="center" jc="space-between" px="$3">
          <Button size="$3" circular chromeless onPress={() => navigation.goBack()} icon={<Icon name="xmark" size={20} color={theme.color.val} />} />
        </XStack>
      </YStack>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} {...scrollViewProps}>
        <YStack f={1} gap="$4" px="$4" pb="$6" {...containerProps}>
          {children}
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default ModalScreenWrapper;
