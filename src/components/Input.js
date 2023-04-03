import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

import { height, colors, fonts } from '../theme/Index';

const Input = ({ onValue, onChangeValue }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="1000"
        value={onValue}
        onChangeText={onChangeValue}
        placeholderTextColor={colors.GREY}
        style={styles.input}
        keyboardType="decimal-pad"
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: height / 8,
    height: height / 20,
    backgroundColor: colors.INPUT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height / 100
  },
  input: {
    width: height / 8,
    height: height / 20,
    color: colors.BLACK,
    fontSize: fonts.size(15),
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
