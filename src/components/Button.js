import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

export default function Button({onPress, style, title, isLoading = false}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.container, style]}>
      {isLoading ? (
        <>
          <ActivityIndicator color="white" style={{marginRight: 10}} />
          <Text style={styles.title}>Loading...</Text>
        </>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
