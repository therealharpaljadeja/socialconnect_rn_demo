import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function Button({onPress, style, title}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
    marginTop: 20,
    elevation: 5,
    width: '100%',
  },
  title: {color: 'white', fontSize: 18, fontFamily: 'Jost-400-Book'},
});
