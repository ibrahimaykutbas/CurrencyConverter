import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

import { colors } from '../theme/Index';

import Status from '../components/Status';
import Header from '../components/Header';
import Content from '../components/Content';
import Value from '../components/Value';

import { Provider } from 'react-redux';
import store from '../redux/index';

import LinearGradient from 'react-native-linear-gradient';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const Home = () => {
  return (
    <LinearGradient
      colors={[colors.LT_BLUE, colors.LT_GREY]}
      style={styles.container}>
      <Status />
      <SafeAreaView style={styles.container}>
        <Header />
        <Content />
        <Value />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
