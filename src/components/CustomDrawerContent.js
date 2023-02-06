import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Text, View} from 'react-native';
import useAddress from '../hooks/useAddress';
import Button from './Button';

function CustomDrawerHeader({focused, color}) {
  return (
    <View
      style={{
        margin: 0,
        padding: 0,
      }}>
      <Text style={{color: color}}>Celo Asv2</Text>
      <Text style={{color: color, marginTop: 5}}>
        Register and Send CELO using phone number
      </Text>
    </View>
  );
}

export default function CustomDrawerContent(props) {
  const connector = useWalletConnect();
  const address = useAddress();

  function handleDisconnect() {
    connector.killSession();
  }

  return (
    <View style={{flex: 1}}>
      <DrawerItem
        label={({focused, color}) => (
          <CustomDrawerHeader focused={focused} color="#333" />
        )}
        onPress={() => {}}
        style={{padding: 0, margin: 0}}
      />
      <DrawerContentScrollView
        style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          paddingVertical: 30,
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        }}>
        <View
          style={{
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          <Text style={{color: '#333'}}>Connected Address:</Text>
          <Text style={{color: '#333', marginTop: 5}}>{address}</Text>
        </View>
        <Button onPress={handleDisconnect} title="Disconnect Wallet" />
      </View>
    </View>
  );
}
