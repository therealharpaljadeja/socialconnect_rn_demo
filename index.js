/**
 * @format
 */
import 'node-libs-react-native/globals';
import './src/missingGlobals';
import {withWalletConnect} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppWrapper from './AppWrapper';
import 'react-native-gesture-handler';

const Root = withWalletConnect(AppWrapper, {
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
