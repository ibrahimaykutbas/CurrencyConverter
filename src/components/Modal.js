import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import React from 'react';

import { width, height, colors } from '../theme/Index';

const Model = ({ countries, onSelectedCountry, closeModal }) => {
  const RenderCountry = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemLine}
        onPress={() => {
          closeModal();
          onSelectedCountry(item);
        }}>
        <Text>{item?.flag}</Text>
        <Text>{item?.name?.common}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.line} />

      <FlatList data={countries} renderItem={RenderCountry} />
    </SafeAreaView>
  );
};

export default Model;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 1.5,
    backgroundColor: colors.WHITE,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: height / 25,
    borderTopRightRadius: height / 25,
    paddingHorizontal: height / 50
  },
  line: {
    width: width / 5,
    height: height / 200,
    backgroundColor: colors.LT_GREY,
    alignSelf: 'center',
    marginVertical: height / 50
  },
  itemLine: {
    width: width,
    height: height / 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
