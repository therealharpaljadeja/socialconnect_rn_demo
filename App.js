import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {useContext} from 'react';
import {Text, View} from 'react-native';
import KitContext from './src/context/KitContext';
import ConnectWallet from './src/screens/ConnectWallet';
import React from 'react';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  const {isInitialized} = useContext(KitContext);
  const connector = useWalletConnect();
  if (!isInitialized)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  if (!connector.connected) return <ConnectWallet />;
  return <MainScreen />;
};

export default App;
