import Button from '../components/Button';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import Screen from '../components/Screen';
import {useContext, useRef, useState} from 'react';
import PhoneInputHOC from '../components/PhoneInputHOC';
import {H4, SmallText} from '../components/Typography';
import KitContext from '../context/KitContext';
import useAddress from '../hooks/useAddress';

export default function Send() {
  const phoneInputRef = useRef(null);
  const address = useAddress();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendValue, setSendValue] = useState('0');
  const [resolvingAddress, setResolvingAddress] = useState(false);
  const {sendToPhoneNumber, getAccountsFromPhoneNumber} =
    useContext(KitContext);
  const [resolvedAddress, setResolvedAddress] = useState('[resolved_address]');

  async function send() {
    setResolvingAddress(true);
    try {
      await sendToPhoneNumber(address, resolvedAddress, sendValue);
    } catch (e) {
      console.log(e);
    } finally {
      setResolvingAddress(false);
    }
  }

  async function getAccounts() {
    setResolvingAddress(true);

    try {
      const accounts = await getAccountsFromPhoneNumber(phoneNumber);
      if (accounts.length) setResolvedAddress(accounts.slice(-1)[0]);
      else setResolvedAddress('No Accounts Found');
    } catch (e) {
      console.log(e);
    } finally {
      setResolvingAddress(false);
    }
  }

  return (
    <Screen>
      <View style={styles.container}>
        <H4 style={{fontSize: 20}}>Send</H4>
        <TextInput
          style={{
            fontFamily: 'EBGaramond-VariableFont_wght',
            fontSize: 48,
            marginTop: 20,
            color: 'black',
          }}
          keyboardType="number-pad"
          placeholder="0"
          defaultValue="0"
          textAlign="center"
          value={sendValue}
          onChangeText={text => setSendValue(text)}
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
          onChangeFormattedText={text => setPhoneNumber(text)}
        />
        <Text style={{...styles.text, color: 'black', marginTop: 10}}>
          Resolves to: {resolvedAddress}
        </Text>
        <View
          style={{
            width: '100%',
            marginTop: 'auto',
            marginBottom: 30,
          }}>
          {resolvedAddress !== '[resolved_address]' &&
          resolvedAddress !== 'No Accounts Found' ? (
            <Button title="Confirm" onPress={send} />
          ) : (
            <Button
              onPress={getAccounts}
              isLoading={resolvingAddress}
              title="Send"
            />
          )}
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
