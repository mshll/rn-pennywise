import { YStack, useTheme } from 'tamagui';
import { ScrollView } from 'react-native';

const ParentScreenWrapper = ({ children, containerProps = {}, scrollViewProps = {} }) => {
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.color2.val }} showsVerticalScrollIndicator={false} {...scrollViewProps}>
      <YStack f={1} gap="$4" px="$4" py="$6" {...containerProps}>
        {children}
      </YStack>
    </ScrollView>
  );
};

export default ParentScreenWrapper;
