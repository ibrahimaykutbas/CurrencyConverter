import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

import { width, height, colors, fonts } from '../theme/Index';

import { Change } from '../assets/svgs/Index';

import Input from './Input';
import Modal from './Modal';

import useApi from '../hooks/useApi';
import getCountries from '../api/countries';
import getExchangerate from '../api/exchangerate';

import { useDispatch } from 'react-redux';
import {
  setTarget,
  setBase,
  setRate,
  reverseData
} from '../redux/exchangeRate';

import ReactNativeModal from 'react-native-modal';

const Content = () => {
  // Hooks
  const dispatch = useDispatch();
  const getExchangerateApi = useApi(getExchangerate.getExchangerate);
  const getCountriesApi = useApi(getCountries.getCounties);

  // States
  const [values, setValues] = useState([
    { name: 'TRY', amount: 0, flag: 'https://flagcdn.com/w320/tr.png' },
    { name: 'USD', amount: 0, flag: 'https://flagcdn.com/w320/us.png' }
  ]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [countries, setCountries] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [whichModal, setWhichModal] = useState(0); // 0: base, 1: target

  // Update States
  const onChangeBase = value => {
    let coppyValues = [...values];
    coppyValues[0].amount = value;
    setValues(coppyValues);

    getExchangerateRequest('base');
  };

  const onChangeTarget = value => {
    let coppyValues = [...values];
    coppyValues[1].amount = value;
    setValues(coppyValues);

    getExchangerateRequest('target');
  };

  // API Requests
  const getExchangerateRequest = async type => {
    try {
      let _baseName = type === 'base' ? values[0]?.name : values[1]?.name;
      const result = await getExchangerateApi.request(_baseName);

      if (result.status !== 200) return;

      let _targetName = type === 'base' ? values[1]?.name : values[0]?.name;
      let _targetAmount = type === 'base' ? values[0]?.amount : values[1]?.amount;

      let targetName = Number(result.data.rates[_targetName]);
      let targetAmount = Number(_targetAmount);
      let exchangeRateValue = targetName * targetAmount;

      setExchangeRate(exchangeRateValue.toFixed(2));
      dispatch(setRate(exchangeRateValue.toFixed(2)));

      let coppyValues = [...values];
      if (type === 'base') {
        coppyValues[1].amount = exchangeRateValue.toFixed(2);
        setValues(coppyValues);
        dispatch(setBase(values[0]));
        dispatch(setTarget(values[1]));
        return;
      }
      coppyValues[0].amount = exchangeRateValue.toFixed(2);
      setValues(coppyValues);
      dispatch(setBase(values[0]));
      dispatch(setTarget(values[1]));
      return;
    } catch (error) {
      console.log('ERROR!', error);
    }
  };

  const getCountriesRequest = async () => {
    try {
      const result = await getCountriesApi.request();

      if (result.status !== 200) return;

      setCountries(result.data);
    } catch (error) {
      console.log('ERROR!', error);
    }
  };

  useEffect(() => {
    getCountriesRequest();
  }, []);

  // Modal Settings
  const openModal = () => setModalVisibility(true);
  const closeModal = () => setModalVisibility(false);

  // Change Country
  const onSelectedCountry = item => {
    let coppyValues = [...values];
    coppyValues[whichModal].name = Object.keys(item.currencies)[0];
    coppyValues[whichModal].amount = '1.00';
    coppyValues[whichModal].flag = item?.flags.png;
    setValues(coppyValues);

    getExchangerateRequest(whichModal == 0 ? 'base' : 'target');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.infoContainer}>
          <Text style={styles.type}>Amount</Text>
          <View style={styles.values}>
            <TouchableOpacity
              onPress={() => {
                openModal();
                setWhichModal(0);
              }}
              style={styles.info}
              activeOpacity={0.7}>
              <Image
                style={styles.image}
                source={{ uri: values[0]?.flag }}
                resizeMode="cover"
              />
              <Text style={styles.country}>{values[0]?.name}</Text>
            </TouchableOpacity>
            <Input onValue={values[0]?.amount} onChangeValue={onChangeBase} />
          </View>
        </View>

        <View style={styles.center}>
          <View style={styles.line} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let coppyValues = [...values];
              coppyValues.reverse();
              setValues(coppyValues);
              dispatch(setBase(coppyValues[0]));
              dispatch(setTarget(coppyValues[1]));
              dispatch(reverseData());
            }}
            activeOpacity={0.9}>
            <Change width={height / 30} height={height / 30} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.type}>Converted Amount</Text>
          <View style={styles.values}>
            <TouchableOpacity
              onPress={() => {
                openModal();
                setWhichModal(1);
              }}
              style={styles.info}
              activeOpacity={0.7}>
              <Image
                style={styles.image}
                source={{ uri: values[1]?.flag }}
                resizeMode="cover"
              />
              <Text style={styles.country}>{values[1].name}</Text>
            </TouchableOpacity>
            <Input onValue={values[1]?.amount} onChangeValue={onChangeTarget} />
          </View>
        </View>
      </View>

      <ReactNativeModal
        style={{ margin: 0 }}
        isVisible={modalVisibility}
        backdropOpacity={0.4}
        onBackdropPress={closeModal}
        propagateSwipe={true}
        onSwipeComplete={closeModal}>
        <Modal
          countries={countries}
          closeModal={closeModal}
          onSelectedCountry={onSelectedCountry}
        />
      </ReactNativeModal>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: height / 2.33,
    height: height / 2.3,
    backgroundColor: colors.WHITE,

    justifyContent: 'space-between',
    paddingVertical: height / 25,

    position: 'absolute',
    top: -height / 12,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.BORDER,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 100
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: height / 37,
    justifyContent: 'center'
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: height / 20,
    height: height / 20,
    borderRadius: height
  },
  type: {
    color: colors.GREY,
    fontSize: fonts.size(16),
    marginBottom: height / 50
  },
  country: {
    color: colors.BLUE,
    fontSize: fonts.size(19),
    fontWeight: '500',
    marginLeft: height / 100
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -height / 18
  },
  line: {
    width: width / 1.33,
    height: 2,
    marginHorizontal: height / 37,
    backgroundColor: colors.LT_GREY,
    marginBottom: -height / 33
  },
  button: {
    width: height / 17,
    height: height / 17,
    borderRadius: height / 20,
    backgroundColor: colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
