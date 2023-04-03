import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';

import { height, colors, fonts } from '../theme/Index';

const Value = () => {
  const { baseName, baseAmount, targetName, targetAmount, rate, reverse } =
    useSelector(state => state.exchangeRate);

  return (
    <View style={styles.container}>
      {baseName !== '' &&
        baseAmount !== '' &&
        targetName !== '' &&
        targetAmount !== '' && (
          <>
            <Text style={styles.text}>Indicative Exchange Rate</Text>

            <Text style={styles.value}>
              {`${baseAmount} ${baseName} = ${reverse ? targetAmount : rate} ${targetName}`}
            </Text>
          </>
        )}
    </View>
  );
};

export default Value;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height / 5,
    marginLeft: height / 40
  },
  text: {
    color: colors.GREY,
    fontSize: fonts.size(15),
    fontWeight: '400',
    marginBottom: height / 100
  },
  value: {
    color: colors.BLACK,
    fontSize: fonts.size(20),
    fontWeight: '500'
  }
});
