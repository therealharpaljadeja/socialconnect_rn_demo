import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Register from '../screens/Register';
import DeRegister from '../screens/Deregister';
import Send from '../screens/Send';
import {View, TouchableOpacity, Image, Text} from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerHeader({navigation, route, options}) {
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
          source={require('../../assets/logo.png')}
          style={{
            height: 24,
            width: 24,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'EBGaramond-VariableFont_wght',
          fontSize: 16,
        }}>
        {route.name}
      </Text>
    </View>
  );
}

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Register"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: 'green',
          header: props => <DrawerHeader {...props} />,
        }}>
        <Drawer.Screen name="Register">
          {props => <Register {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Deregister" component={DeRegister} />
        <Drawer.Screen name="Send" component={Send} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
