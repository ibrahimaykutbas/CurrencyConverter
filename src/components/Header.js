import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { width, height, colors, fonts } from '../theme/Index';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <Text style={styles.subTitle}>Check live rates.</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 3.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: height / 300,
    paddingBottom: height / 25
  },
  title: {
    color: colors.BLUE,
    fontSize: fonts.size(25),
    fontWeight: '700',
    marginBottom: height / 100
  },
  subTitle: {
    color: colors.GREY,
    fontSize: fonts.size(14),
    fontWeight: '400',
    textAlign: 'center'
  }
});
