import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Image, Progress } from 'tamagui';
import { Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { QUIZ_LEVELS, THEMES } from '../data/constants';
import { moneyTips } from '../data/tips';
import { CoinAmount } from '../utils/components';
import ScreenWrapper from '../components/ScreenWrapper';
import { useChildProfile, useChildChores, useChildStoreItems } from '../hooks/useChild';
import { useQuizQuestions, useAllAttempts } from '../hooks/useQuiz';

const HEADER_HEIGHT = 60;
const LARGE_TITLE_HEIGHT = 60;
const SCROLL_THRESHOLD = LARGE_TITLE_HEIGHT;

const TIP_ROTATION_INTERVAL = 10000; // 10 seconds

const QuickStatsCard = ({ icon, title, value, theme: cardTheme }) => {
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

const FeaturedCard = ({ title, description, icon, onPress, theme: cardTheme }) => {
  const theme = useTheme();
  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4} pressStyle={{ scale: 0.95 }} animation="bouncy" onPress={onPress}>
        <XStack gap="$3" ai="center">
          <Circle size="$5" bg="$color3">
            <Icon name={icon} size={24} color={theme.color.val} />
          </Circle>
          <YStack f={1} gap="$1">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
              {title}
            </Text>
            <Text fontSize="$3" color="$color11">
              {description}
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

const TipCard = ({ tip, progress }) => {
  const theme = useTheme();
  return (
    <Theme name="orange">
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4}>
        <YStack gap="$3">
          <Circle size="$5" bg="$color3">
            <Icon name={tip.icon} size={24} color={theme.color.val} />
          </Circle>
          <Text fontSize="$4" fontWeight="500" fontFamily="$heading">
            {tip.title}
          </Text>
          <Text fontSize="$3" color="$color11">
            {tip.description}
          </Text>
          <Progress size="$1" value={Math.round(progress)} bg="$color4">
            <Progress.Indicator animation="bouncy" bg="$color11" />
          </Progress>
        </YStack>
      </Card>
    </Theme>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [tipProgress, setTipProgress] = useState(100);
  const progressInterval = useRef(null);

  const { data: profile } = useChildProfile();
  const { data: chores } = useChildChores();
  const { data: storeItems } = useChildStoreItems();
  const { data: quizzes } = useQuizQuestions();
  const { data: attempts } = useAllAttempts();

  // Handle tip rotation and progress
  useEffect(() => {
    // Clear any existing intervals
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    // Start new progress interval
    let timeLeft = TIP_ROTATION_INTERVAL;
    const updateInterval = 100; // Update every 100ms for smooth progress

    progressInterval.current = setInterval(() => {
      timeLeft -= updateInterval;
      const progress = Math.round((timeLeft / TIP_ROTATION_INTERVAL) * 100);
      setTipProgress(progress);

      if (timeLeft <= 0) {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % moneyTips.length);
        timeLeft = TIP_ROTATION_INTERVAL;
        setTipProgress(100);
      }
    }, updateInterval);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentTipIndex]);

  const handleNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % moneyTips.length);
    setTipProgress(100);
  };

  // Calculate stats
  const activeChores = chores?.filter((c) => c.status === 'INCOMPLETE')?.length || 0;
  const affordableItems = storeItems?.filter((item) => item.price <= (profile?.balance || 0))?.length || 0;
  const remainingQuizzes = quizzes?.length - new Set(attempts?.filter((a) => a.correct).map((a) => a.quizQuestionEntity?.id)).size || 0;

  return (
    <ScreenWrapper containerProps={{ gap: '$6' }}>
      <YStack gap="$2" mt="$4">
        <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
          Welcome back! 👋
        </Text>
        <Text fontSize="$4" color="$color11">
          Let's learn about money today!
        </Text>
      </YStack>

      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Overview
        </Text>
        <XStack gap="$3">
          <QuickStatsCard icon="piggy-bank" title="My Balance" value={<CoinAmount amount={profile?.balance || 0} />} theme="pink" />
          <QuickStatsCard icon="list-check" title="Tasks Done" value={`${activeChores}/${chores?.length || 0}`} theme="green" />
        </XStack>
      </YStack>

      <YStack gap="$3">
        <XStack jc="space-between" ai="center">
          <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
            Money Tip
          </Text>
          <Theme name="orange">
            <Button size="$3" bg="$color4" circular icon={<Icon name="arrow-right" size={12} color={theme.color.val} />} onPress={handleNextTip} />
          </Theme>
        </XStack>
        <TipCard tip={moneyTips[currentTipIndex]} progress={tipProgress} />
      </YStack>

      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Featured
        </Text>

        <FeaturedCard
          title="Daily Tasks"
          description={`You have ${activeChores} tasks waiting for you!`}
          icon="list"
          theme="green"
          onPress={() => navigation.navigate('Chores')}
        />

        <FeaturedCard
          title="Money Quiz"
          description={remainingQuizzes > 0 ? `${remainingQuizzes} new quizzes to try!` : 'All quizzes completed! Great job! 🎉'}
          icon="brain"
          theme="blue"
          onPress={() => navigation.navigate('Quizzes')}
        />

        <FeaturedCard
          title="Reward Store"
          description={`You can afford ${affordableItems} items!`}
          icon="store"
          theme="purple"
          onPress={() => navigation.navigate('Store')}
        />
      </YStack>
    </ScreenWrapper>
  );
};

export default HomeScreen;
