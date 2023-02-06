import {useWalletConnect} from '@walletconnect/react-native-dapp';

export default function useAddress() {
  const connector = useWalletConnect();

  if (connector.connected) {
    return connector.accounts[0];
  } else {
    return '[connected_address]';
  }
}
