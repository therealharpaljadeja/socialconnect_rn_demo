import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PhoneInputHOC from '../components/PhoneInputHOC';
import Button from '../components/Button';
import useAddress from '../hooks/useAddress';
import Screen from '../components/Screen';
import {H4, SmallText} from '../components/Typography';
import React, {createContext, useContext, useReducer} from 'react';
import Input from '../components/Input';

const INITIAL_STATE = {
  flow: 'DEREGISTRATION',
  phoneNumber: '',
  formattedPhoneNumber: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'flowChange':
      return {...state, flow: action.payload};
    case 'phoneNumber':
      return {...state, phoneNumber: action.payload};
    case 'formattedPhoneNumber':
      return {...state, formattedPhoneNumber: action.payload};
    default:
      return state;
  }
}

const DeRegistrationContext = createContext(null);

const DeRegistrationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <DeRegistrationContext.Provider value={{state, dispatch}}>
      {children}
    </DeRegistrationContext.Provider>
  );
};

function OTP() {
  const address = useAddress();
  const {state, dispatch} = useContext(DeRegistrationContext);

  return (
    <View style={{flex: 1}}>
      <SmallText style={{marginTop: 5}}>
        Registering address:{' '}
        <SmallText
          style={{
            fontFamily: 'Jost-500-Medium',
            fontSize: 14,
            color: 'green',
          }}>{`${address.substring(0, 6)}...${address.substring(
          36,
        )}`}</SmallText>
      </SmallText>
      <SmallText style={{marginTop: 5}}>
        Please enter OTP we sent on {state.formattedPhoneNumber}
      </SmallText>
      <Input
        keyboardType="number-pad"
        style={{textAlign: 'center', fontSize: 24}}
        maxLength={6}
      />
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          marginTop: 10,
        }}
        activeOpacity={1}
        onPress={() =>
          dispatch({type: 'flowChange', payload: 'DEREGISTRATION'})
        }>
        <SmallText style={{textAlign: 'center'}}>Change Number</SmallText>
      </TouchableOpacity>
      <Button title="Submit" />
    </View>
  );
}

function DeRegistration() {
  const address = useAddress();
  const {state, dispatch} = useContext(DeRegistrationContext);
  return (
    <View style={{flex: 1}}>
      <SmallText style={{marginTop: 5}}>
        De-Registering address:{' '}
        <SmallText
          style={{
            fontFamily: 'Jost-500-Medium',
            fontSize: 14,
            color: 'green',
          }}>{`${address.substring(0, 6)}...${address.substring(
          36,
        )}`}</SmallText>
      </SmallText>
      <SmallText style={{marginTop: 5}}>
        Please enter your phone number
      </SmallText>
      <PhoneInputHOC
        value={state.phoneNumber}
        onChangeText={text => dispatch({type: 'phoneNumber', payload: text})}
        onChangeFormattedText={text =>
          dispatch({type: 'formattedPhoneNumber', payload: text})
        }
      />
      <Button
        title="De-Register"
        onPress={() => dispatch({type: 'flowChange', payload: 'OTP'})}
      />
      <SmallText style={{marginTop: 20}}>
        This is the screen to deregister your phone number and un-link your EVM
        address from it
      </SmallText>
    </View>
  );
}

function DeRegisterContent() {
  const {state, dispatch} = useContext(DeRegistrationContext);

  return (
    <View style={styles.container}>
      <H4>De-Register</H4>
      {state.flow === 'DEREGISTRATION' ? <DeRegistration /> : <OTP />}
    </View>
  );
}

export default function DeRegister(props) {
  return (
    <React.Fragment>
      <Screen>
        <DeRegistrationProvider>
          <DeRegisterContent />
        </DeRegistrationProvider>
      </Screen>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 220,
  },
});
