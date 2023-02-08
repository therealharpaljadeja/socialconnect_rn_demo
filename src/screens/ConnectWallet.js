import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Text, View} from 'react-native';
import Button from '../components/Button';
import Screen from '../components/Screen';

export default function ConnectWallet() {
  const connector = useWalletConnect();

  async function handlePress() {
    connector.connect();
  }

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title="Connect Wallet" onPress={handlePress} />
      </View>
    </Screen>
  );
}
