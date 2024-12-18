import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Avatar, Progress } from 'tamagui';
import { useState, useRef, useLayoutEffect } from 'react';
import { Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { CoinAmount } from '../utils/components';
import ScreenWrapper from '../components/ScreenWrapper';
import { deleteToken } from '../api/storage';
import { useAuth } from '../context/AuthContext';
import { useChildProfile, useChildChores, useChildStoreItems } from '../hooks/useChild';
import { useQuizQuestions, useAllAttempts, useTotalQuizRewards } from '../hooks/useQuiz';
import { AVATARS } from '../data/avatars';
import { getRandomChildTitle } from '../data/constants';

const StatCard = ({ icon, title, value, theme: cardTheme }) => {
  const theme = useTheme();
  return (
    <Theme name={cardTheme}>
      <Card f={1} bg="$color6" br="$6" p="$3" bc="$color4" borderBottomWidth={4}>
        <YStack gap="$2">
          <Circle size="$3" bg="$color3">
            <Icon name={icon} size={14} color={theme.color.val} />
          </Circle>
          <Text fontSize="$2" color="$color11">
            {title}
          </Text>
          <Text fontSize="$6" fontWeight="600" fontFamily="$heading">
            {value}
          </Text>
        </YStack>
      </Card>
    </Theme>
  );
};

const AchievementCard = ({ icon, title, description, progress, theme: cardTheme }) => {
  const theme = useTheme();
  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4}>
        <XStack gap="$3" ai="center">
          <Circle size="$5" bg="$color3">
            <Icon name={icon} size={24} color={theme.color.val} />
          </Circle>
          <YStack f={1} gap="$1">
            <Text fontSize="$4" fontWeight="600" fontFamily="$heading">
              {title}
            </Text>
            <Text fontSize="$2" color="$color11">
              {description}
            </Text>
            <Progress size="$1" value={progress} bg="$color4" mt="$2">
              <Progress.Indicator animation="bouncy" bg="$color11" />
            </Progress>
          </YStack>
        </XStack>
      </Card>
    </Theme>
  );
};

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

export default function ProfileScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { setUser, setRole } = useAuth();

  const { data: profile, isLoading: isLoadingProfile } = useChildProfile();
  const { data: chores, isLoading: isLoadingChores } = useChildChores();
  const { data: storeItems, isLoading: isLoadingStore } = useChildStoreItems();
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuizQuestions();
  const { data: attempts, isLoading: isLoadingAttempts } = useAllAttempts();
  const { data: quizRewards, isLoading: isLoadingRewards } = useTotalQuizRewards();

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

  if (isLoadingProfile || isLoadingChores || isLoadingStore || isLoadingQuizzes || isLoadingAttempts || isLoadingRewards) {
    return (
      <YStack f={1} ai="center" jc="center" backgroundColor="$color2">
        <Text>Loading...</Text>
      </YStack>
    );
  }

  // Calculate statistics
  const completedChores = chores?.filter((c) => c.status === 'COMPLETED')?.length || 0;
  const totalChores = chores?.length || 0;
  const totalQuizzes = quizzes?.length || 0;
  const completedQuizzes = new Set(attempts?.filter((a) => a.correct).map((a) => a.quizQuestionEntity?.id)).size;
  const correctQuizzes = attempts?.filter((a) => a.correct)?.length || 0;
  const purchasedItems = storeItems?.filter((item) => item.purchasedAt)?.length || 0;

  // Calculate achievements
  const achievements = [
    {
      icon: 'trophy',
      title: 'Task Master',
      description: `Complete ${totalChores} tasks`,
      progress: totalChores > 0 ? Math.round((completedChores / totalChores) * 100) : 0,
      theme: 'green',
    },
    {
      icon: 'brain',
      title: 'Quiz Whiz',
      description: 'Complete all quizzes',
      progress: totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0,
      theme: 'blue',
    },
    {
      icon: 'piggy-bank',
      title: 'Super Saver',
      description: 'Save 100 KD',
      progress: Math.round(Math.min((profile?.balance / 100) * 100, 100)),
      theme: 'orange',
    },
    {
      icon: 'store',
      title: 'Smart Shopper',
      description: 'Buy 5 items from store',
      progress: Math.round((purchasedItems / 5) * 100),
      theme: 'purple',
    },
  ];

  return (
    <ScreenWrapper>
      {/* Profile Header */}
      <YStack ai="center" gap="$4">
        <Circle borderWidth={4} borderColor="$color6">
          <Avatar circular size="$12">
            <Avatar.Image source={AVATARS[profile?.avatarUrl] || AVATARS.DEFAULT} />
            <Avatar.Fallback backgroundColor="$color6" />
          </Avatar>
        </Circle>
        <YStack ai="center" gap="$1">
          <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
            {profile?.username}
          </Text>
          <Text fontSize="$4" color="$color11">
            {getRandomChildTitle()}
          </Text>
        </YStack>
      </YStack>

      {/* Statistics */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          My Progress
        </Text>
        <XStack gap="$3">
          <StatCard icon="list-check" title="Tasks Done" value={`${completedChores}/${totalChores}`} theme="green" />
          <StatCard icon="brain" title="Quizzes" value={`${completedQuizzes}/${totalQuizzes}`} theme="blue" />
        </XStack>
        <XStack gap="$3">
          <StatCard icon="piggy-bank" title="Savings" value={<CoinAmount amount={profile?.balance || 0} />} theme="orange" />
          <StatCard icon="store" title="Purchases" value={purchasedItems} theme="purple" />
        </XStack>
      </YStack>

      {/* Achievements */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Achievements
        </Text>
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            progress={achievement.progress}
            theme={achievement.theme}
          />
        ))}
      </YStack>

      {/* Settings */}
      <YStack gap="$3" mt="$4">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Settings
        </Text>
        <YStack gap="$3">
          <SettingCard icon="gear" title="Account Settings" theme="blue" onPress={() => {}} />
          <SettingCard icon="right-from-bracket" title="Logout" theme="red" onPress={handleLogout} />
        </YStack>
      </YStack>
    </ScreenWrapper>
  );
}
