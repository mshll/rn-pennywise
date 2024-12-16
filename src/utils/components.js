import { XStack, Text, Image, useTheme } from 'tamagui';

export const CoinAmount = ({
  amount,
  color = '$color',
  size = '$4',
  clr = '$color',
  fSize = '$6',
  iSize = 26,
  src = require('../../assets/images/coin.png'),
  ...props
}) => {
  const theme = useTheme();
  return (
    <XStack ai="center" gap="5" {...props}>
      <Text fontWeight="600" fontSize={fSize || size} fontFamily="$heading" color={clr || color}>
        {amount}
      </Text>
      <Image source={src} width={iSize || 24} height={iSize || 24} resizeMode="contain" tintColor={theme[clr || color]?.val} />
    </XStack>
  );
};
