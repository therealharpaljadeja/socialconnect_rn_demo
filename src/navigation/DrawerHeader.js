import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function DrawerHeader({navigation, route, options}) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        elevation: 5,
      }}>
      <TouchableOpacity
        onPress={navigation.toggleDrawer}
        activeOpacity={0.9}
        style={{
          marginRight: 10,
        }}>
        <Image
          source={require('./assets/logo.png')}
          style={{
            height: 24,
            width: 24,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'EB_Garamond',
          fontSize: 16,
        }}>
        {route.name}
      </Text>
    </View>
  );
}
