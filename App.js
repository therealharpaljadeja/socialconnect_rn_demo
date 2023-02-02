/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {newKit} from '@celo/contractkit';
import {OdisUtils} from '@celo/identity';
import {
  getServiceContext,
  OdisContextName,
  ODIS_ALFAJORES_CONTEXT_PNP,
} from '@celo/identity/lib/odis/query';
import {buyMoreQuota, getQuota} from './src/utils/odisUtils';
import {E164_REGEX} from './src/services/twilio';
import {ReactBlsBlindingClient} from './src/utils/bls-blinding-client';
import {IdentifierPrefix} from '@celo/identity/lib/odis/identifier';
import {ISSUER_PRIVATE_KEY} from '@env';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const connector = useWalletConnect();
  const [phoneNumber, setPhoneNumber] = useState(0);
  let issuer, federatedAttestations, odisPaymentContract;
  const issuerKit = newKit('https://alfajores-forno.celo-testnet.org');

  useEffect(() => {
    const init = async () => {
      issuerKit.addAccount(ISSUER_PRIVATE_KEY);
      issuer =
        issuerKit.web3.eth.accounts.privateKeyToAccount(ISSUER_PRIVATE_KEY);
      issuerKit.defaultAccount = issuer.address;
      federatedAttestations =
        await issuerKit.contracts.getFederatedAttestations();
      odisPaymentContract = await issuerKit.contracts.getOdisPayments();
    };
    init();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  function handleConnect() {
    connector.connect();
  }

  async function getIdentifier(phoneNumber) {
    try {
      if (!E164_REGEX.test(phoneNumber)) {
        throw 'Attempting to hash a non-e164 number: ' + phoneNumber;
      }
      const authSigner = {
        authenticationMethod: OdisUtils.Query.AuthenticationMethod.WALLET_KEY,
        contractKit: issuerKit,
      };
      const serviceContext = getServiceContext(OdisContextName.ALFAJORES);

      const remainingQuota = await getQuota(
        issuerKit.defaultAccount,
        authSigner,
        serviceContext,
      );

      if (remainingQuota < 1) {
        let paymentTxHash = await buyMoreQuota(issuer, issuerKit);
        console.log(`Odis Quota Payment: ${paymentTxHash}`);
      }

      const blindingClient = new ReactBlsBlindingClient(
        serviceContext.odisPubKey,
      );

      const {obfuscatedIdentifier} =
        await OdisUtils.Identifier.getObfuscatedIdentifier(
          phoneNumber,
          IdentifierPrefix.PHONE_NUMBER,
          issuer.address,
          authSigner,
          serviceContext,
          undefined,
          undefined,
          blindingClient,
        );

      const attestationReceipt = await federatedAttestations
        .registerAttestationAsIssuer(
          obfuscatedIdentifier,
          connector.accounts[0],
          Math.floor(new Date().getTime() / 1000),
        )
        .sendAndWaitForReceipt();

      console.log(attestationReceipt.transactionHash);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDisconnect() {
    connector.killSession();
  }

  async function handleGetIdentifier() {
    await getIdentifier(phoneNumber);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FCF6F1',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#000000'}}>SocialConnect</Text>

        {connector.connected ? (
          <View>
            <Text style={styles.text}>{connector.accounts[0]}</Text>
            <TextInput
              style={{
                borderWidth: 1,
                textAlign: 'center',
                margin: 10,
                color: 'black',
                padding: 10,
              }}
              keyboardType="phone-pad"
              onChangeText={text => setPhoneNumber(text)}
            />
            <Button title="Get Identifier" onPress={handleGetIdentifier} />
            <Button title="Disconnect" onPress={handleDisconnect} />
          </View>
        ) : (
          <Button title="Connect" onPress={handleConnect} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  text: {color: '#000000'},
});

export default App;
