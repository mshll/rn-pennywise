import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Avatar } from 'tamagui';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ParentScreenWrapper from '../../components/parent/ParentScreenWrapper';
import { deleteToken } from '../../api/storage';
import { useAuth } from '../../context/AuthContext';
import { useParentProfile } from '../../hooks/useParent';
import { AVATARS } from '../../data/avatars';

const SettingCard = ({ icon, title, onPress, theme: cardTheme }) => {
  const theme = useTheme();
  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4} pressStyle={{ scale: 0.95 }} animation="bouncy" onPress={onPress}>
        <XStack gap="$3" ai="center">
          <Circle size="$5" bg="$color3">
            <Icon name={icon} size={24} color={theme.color.val} />
          </Circle>
          <YStack f={1}>
            <Text fontSize="$4" fontWeight="600" fontFamily="$heading">
              {title}
            </Text>
          </YStack>
          <Circle bg="$color3" size="$3">
            <Icon name="chevron-right" size={12} color={theme.color.val} />
          </Circle>
        </XStack>
      </Card>
    </Theme>
  );
};

const ParentProfileScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { setUser, setRole } = useAuth();
  const { data: parentProfile, isLoading, error } = useParentProfile();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await deleteToken();
            setRole(null);
            setUser(null);
          },
        },
      ],
      { cancelable: true }
    );
  };

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
      <YStack ai="center" gap="$4">
        <Circle bw="$1.5" bc="$color6">
          <Avatar circular size="$12">
            <Avatar.Image source={AVATARS[parentProfile.avatarUrl] || AVATARS.DEFAULT} />
            <Avatar.Fallback backgroundColor="$color6" />
          </Avatar>
        </Circle>
        <YStack ai="center" gap="$1">
          <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
            {parentProfile.username}
          </Text>
          <Text fontSize="$4" color="$color11">
            {parentProfile.email}
          </Text>
        </YStack>
      </YStack>

      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Children
        </Text>
        <XStack gap="$3" flexWrap="wrap">
          {parentProfile.children?.map((child) => (
            <Circle
              bw="$1.5"
              bc="$color6"
              key={child.id}
              pressStyle={{ scale: 0.95 }}
              animation="bouncy"
              onPress={() => navigation.navigate('ChildDetailsScreen', { childId: child.id })}
            >
              <Avatar circular size="$8">
                <Avatar.Image source={AVATARS[child.avatarUrl] || AVATARS.DEFAULT} />
                <Avatar.Fallback backgroundColor="$color6" />
              </Avatar>
            </Circle>
          ))}
          <Theme name="pink">
            <Button
              bw="$1"
              bc="$color6"
              size="$8"
              circular
              bg="$color4"
              icon={<Icon name="plus" size={24} color={theme.color.val} />}
              onPress={() => navigation.navigate('AddChildScreen')}
            />
          </Theme>
        </XStack>
      </YStack>

      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Settings
        </Text>
        <YStack gap="$3">
          <SettingCard icon="user" title="Account Settings" theme="blue" onPress={() => {}} />
          <SettingCard icon="bell" title="Notifications" theme="purple" onPress={() => {}} />
          <SettingCard icon="shield" title="Privacy & Security" theme="green" onPress={() => {}} />
          <SettingCard icon="circle-info" title="Help & Support" theme="orange" onPress={() => {}} />
          <SettingCard icon="right-from-bracket" title="Logout" theme="red" onPress={handleLogout} />
        </YStack>
      </YStack>
    </ParentScreenWrapper>
  );
};

export default ParentProfileScreen;
