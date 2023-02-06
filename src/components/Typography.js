import {Text} from 'react-native';

export function H1({children, style}) {
  return (
    <Text
      style={[
        {
          fontFamily: 'EBGaramond-VariableFont_wght',
          color: 'black',
          fontSize: 48,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export function H2({children, style}) {
  return (
    <Text
      style={[
        {
          fontFamily: 'EBGaramond-VariableFont_wght',
          color: 'black',
          fontSize: 40,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export function H3({children, style}) {
  return (
    <Text
      style={[
        {fontFamily: 'Jost-400-book', color: 'black', fontSize: 24},
        style,
      ]}>
      {children}
    </Text>
  );
}

export function H4({children, style}) {
  return (
    <Text
      style={[
        {
          fontFamily: 'EBGaramond-VariableFont_wght',
          color: 'black',
          fontSize: 28,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export function H5({children, style}) {
  return (
    <Text
      style={[
        {fontFamily: 'Jost-500-medium', color: 'black', fontSize: 16},
        style,
      ]}>
      {children}
    </Text>
  );
}

export function H6({children, style}) {
  return (
    <Text
      style={[
        {fontFamily: 'Jost-500-medium', color: 'black', fontSize: 16},
        style,
      ]}>
      {children}
    </Text>
  );
}

export function BodyText({children, style}) {
  return (
    <Text
      style={[
        {
          fontFamily: 'EBGaramond-VariableFont_wght',
          color: 'black',
          fontSize: 20,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export function SmallText({children, style}) {
  return (
    <Text
      style={[
        {
          fontFamily: 'EBGaramond-VariableFont_wght',
          color: 'black',
          fontSize: 16,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}
