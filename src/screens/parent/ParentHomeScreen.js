import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Input, Sheet } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import { CoinAmount } from '../../utils/components';
import ParentScreenWrapper from '../../components/parent/ParentScreenWrapper';
import { useParentProfile, useParentBalance, useUpdateParentBalance } from '../../hooks/useParent';
import { useToast } from '../../components/Toast';
import ChildCard from '../../components/parent/ChildCard';

const QuickStatsCard = ({ icon, title, value, theme: cardTheme, onPress, fullWidth }) => {
  const theme = useTheme();
  return (
    <Theme name={cardTheme}>
      <Card
        f={fullWidth ? undefined : 1}
        w={fullWidth ? '100%' : undefined}
        bg="$color6"
        br="$6"
        p="$3"
        bc="$color4"
        borderBottomWidth={4}
        pressStyle={onPress ? { scale: 0.97 } : undefined}
        onPress={onPress}
      >
        <YStack gap="$2">
          <XStack jc="space-between" ai="center">
            <Circle size="$3" bg="$color3">
              <Icon name={icon} size={14} color={theme.color.val} />
            </Circle>
            {onPress && (
              <XStack ai="center" gap="$1">
                <Icon name="plus" size={12} color={theme.blue11.val} />
                <Text fontSize="$2" color="$color11" ml="$1">
                  Tap to deposit
                </Text>
              </XStack>
            )}
          </XStack>
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

const ParentHomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { data: parentProfile, isLoading, error } = useParentProfile();
  const { data: parentBalance = 0 } = useParentBalance(parentProfile?.username);
  const { mutate: updateBalance } = useUpdateParentBalance();
  const { showToast } = useToast();

  const [showDepositSheet, setShowDepositSheet] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const totalBalance = parentProfile?.children?.reduce((sum, child) => sum + child.balance, 0) || 0;
  const totalChildren = parentProfile?.children?.length || 0;

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    updateBalance(
      { username: parentProfile.username, amount },
      {
        onSuccess: () => {
          showToast(`Successfully deposited ${amount} KD`, 'success');
          setShowDepositSheet(false);
          setDepositAmount('');
        },
      }
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
      <YStack gap="$2" mt="$4">
        <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
          Welcome back! 👋
        </Text>
        <Text fontSize="$4" color="$color11">
          Here's how your children are doing
        </Text>
      </YStack>

      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Overview
        </Text>
        <YStack gap="$3">
          <QuickStatsCard
            icon="wallet"
            title="Your Balance"
            value={<CoinAmount amount={parentBalance} />}
            theme="blue"
            onPress={() => setShowDepositSheet(true)}
            fullWidth
          />
          <XStack gap="$3">
            <QuickStatsCard icon="piggy-bank" title="Children's Balance" value={<CoinAmount amount={totalBalance} />} theme="pink" />
            <QuickStatsCard icon="users" title="Children" value={totalChildren} theme="green" />
          </XStack>
        </YStack>
      </YStack>

      <YStack gap="$3">
        <XStack jc="space-between" ai="center">
          <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
            Children
          </Text>
          <Theme name="green">
            <Button
              size="$3"
              bg="$color4"
              icon={<Icon name="plus" size={12} color={theme.color.val} />}
              onPress={() => navigation.navigate('AddChildScreen')}
            >
              <Text>Add Child</Text>
            </Button>
          </Theme>
        </XStack>

        {parentProfile?.children?.map((child, index) => (
          <ChildCard
            key={child.id}
            child={child}
            theme={THEMES[index % THEMES.length]}
            onPress={() => navigation.navigate('ChildDetailsScreen', { childId: child.id })}
          />
        ))}
      </YStack>

      {(!parentProfile?.children || parentProfile.children.length === 0) && (
        <YStack ai="center" jc="center" h={200} gap="$4">
          <Circle size="$8" bg="$color4">
            <Icon name="users" size={32} color={theme.color.val} />
          </Circle>
          <YStack ai="center" gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading" ta="center">
              No Children Yet
            </Text>
            <Text fontSize="$3" color="$color11" ta="center">
              Add your first child to start managing their tasks and rewards!
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

      <Sheet modal open={showDepositSheet} onOpenChange={setShowDepositSheet} snapPointsMode="fit" dismissOnSnapToBottom>
        <Sheet.Overlay />
        <Sheet.Frame padding="$4" pb="$8">
          <Sheet.Handle />
          <YStack gap="$4">
            <Text fontSize="$6" fontWeight="600" ta="center">
              Deposit Funds
            </Text>
            <Input
              size="$4"
              placeholder="Amount"
              value={depositAmount}
              onChangeText={setDepositAmount}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              backgroundColor="$color4"
            />
            <Theme name="green">
              <Button size="$4" bg="$color4" onPress={handleDeposit} disabled={!depositAmount || parseFloat(depositAmount) <= 0}>
                <Text>Deposit</Text>
              </Button>
            </Theme>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </ParentScreenWrapper>
  );
};

export default ParentHomeScreen;
