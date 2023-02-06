import {TextInput} from 'react-native';

export default function Input(props) {
  return (
    <TextInput
      style={[
        {
          borderWidth: 2,
          borderRadius: 5,
          paddingVertical: 10,
          marginTop: 10,
          borderColor: '#ddd',
          fontFamily: 'EBGaramond-VariableFont_wght',
          paddingHorizontal: 20,
        },
        props.style,
      ]}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
    />
  );
}
