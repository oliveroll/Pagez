import React from 'react';
import { View, StyleSheet } from 'react-native';

export const HomeIndicator: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 139,
    height: 5,
  },
  bar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 2.5,
  },
});
