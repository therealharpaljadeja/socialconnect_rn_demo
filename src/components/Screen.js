import {StyleSheet, View, ViewProps} from 'react-native';

export default function Screen({children}) {
  return (
    <View style={styles.screen}>
      <View style={{flex: 1, paddingHorizontal: 20}}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
