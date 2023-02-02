/**
 * @format
 */
import 'node-libs-react-native/globals';
import './src/missingGlobals';
import {withWalletConnect} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const Root = withWalletConnect(App, {
  clientMeta: {
    description: 'Connect with WalletConnect',
  },
  redirectUrl:
    Platform.OS === 'web' ? window.location.origin : 'socialconnect://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});

AppRegistry.registerComponent(appName, () => Root);
