import Button from '../components/Button';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import Screen from '../components/Screen';
import {useRef, useState} from 'react';
import PhoneInputHOC from '../components/PhoneInputHOC';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import useAddress from '../hooks/useAddress';
import {H4, SmallText} from '../components/Typography';

// function SendBottomSheetContent() {
//     return (
//         <View
//             style={{
//                 height: 500,
//                 width: "100%",
//                 alignItems: "center",
//                 paddingTop: 20,
//                 paddingHorizontal: 25,
//             }}
//         >
//             <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
//                 <H4>Summary</H4>
//                 <Image
//                     source={require("../assets/send_to_phone.png")}
//                     style={{
//                         height: 200,
//                         width: 200,
//                     }}
//                 />
//             </View>
//             <View style={{ width: "100%", marginBottom: 80 }}>
//                 <View
//                     style={{
//                         width: "100%",
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                     }}
//                 >
//                     <H5>To</H5>
//                     <View style={{ alignItems: "flex-end" }}>
//                         <SmallText>+1-1234567890</SmallText>
//                         <SmallText style={{ fontSize: 14, color: "gray" }}>
//                             0x5739039
//                         </SmallText>
//                     </View>
//                 </View>
//                 <View
//                     style={{
//                         width: "100%",
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         marginTop: 10,
//                     }}
//                 >
//                     <H5>Amount</H5>
//                     <SmallText>[amount] CELO</SmallText>
//                 </View>
//                 <Button title="Confirm" />
//             </View>
//         </View>
//     );
// }

export default function Send() {
  const connector = useWalletConnect();
  const address = useAddress();
  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <Screen>
      <View style={styles.container}>
        <H4 style={{fontSize: 20}}>Send</H4>
        <TextInput
          style={{
            fontFamily: 'EB_Garamond',
            fontSize: 48,
            marginTop: 20,
          }}
          keyboardType="number-pad"
          placeholder="0"
          textAlign="center"
        />
        <SmallText
          style={{
            ...styles.text,
            marginTop: 10,
            alignSelf: 'center',
          }}>
          CELO
        </SmallText>
        <SmallText style={{...styles.text}}>To</SmallText>
        <PhoneInputHOC
          ref={phoneInputRef}
          onChangeText={number => setPhoneNumber(number)}
        />
        <Text style={{...styles.text, marginTop: 10}}>
          Resolves to: [resolved_address]
        </Text>
        <View
          style={{
            width: '100%',
            marginTop: 'auto',
            marginBottom: 30,
          }}>
          <Button onPress={() => console.log('Send')} title="Send" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    marginTop: 30,
    alignSelf: 'flex-start',
  },
});
