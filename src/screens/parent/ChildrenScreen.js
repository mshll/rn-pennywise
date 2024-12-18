import { Text, YStack, Theme, Circle, useTheme, Button } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import ParentScreenWrapper from '../../components/parent/ParentScreenWrapper';
import { useParentProfile } from '../../hooks/useParent';
import ChildCard from '../../components/parent/ChildCard';

const ChildrenScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { data: parentProfile, isLoading, error } = useParentProfile();

  if (isLoading) {
    return (
      <ParentScreenWrapper>
        <YStack f={1} ai="center" jc="center">
          <Text>Loading...</Text>
        </YStack>
      </ParentScreenWrapper>
    );
  }

  if (error) {
    return (
      <ParentScreenWrapper>
        <YStack f={1} ai="center" jc="center">
          <Text color="$red10">Error loading profile</Text>
        </YStack>
      </ParentScreenWrapper>
    );
  }

  return (
    <ParentScreenWrapper containerProps={{ gap: '$6' }}>
      <YStack gap="$2" mt="$4">
        <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
          Children
        </Text>
        <Text fontSize="$4" color="$color11">
          Manage your children's profiles
        </Text>
      </YStack>

      {parentProfile?.children?.map((child, index) => (
        <ChildCard
          key={child.id}
          child={child}
          theme={THEMES[index % THEMES.length]}
          onPress={() => navigation.navigate('ChildDetailsScreen', { childId: child.id })}
        />
      ))}

      {(!parentProfile?.children || parentProfile.children.length === 0) && (
        <YStack ai="center" jc="center" h={200} gap="$4">
          <Circle size="$8" bg="$color4">
            <Icon name="child" size={32} color={theme.color.val} />
          </Circle>
          <YStack ai="center" gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading" ta="center">
              No Children Yet
            </Text>
            <Text fontSize="$3" color="$color11" ta="center">
              Add your first child to start managing their activities!
            </Text>
          </YStack>
          <Theme name="green">
            <Button
              size="$4"
              bg="$color4"
              icon={<Icon name="plus" size={14} color={theme.color.val} />}
              onPress={() => navigation.navigate('AddChildScreen')}
            >
              <Text>Add Your First Child</Text>
            </Button>
          </Theme>
        </YStack>
      )}
    </ParentScreenWrapper>
  );
};

export default ChildrenScreen;
