import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseName: '',
  baseAmount: '',
  targetName: '',
  targetAmount: '',
  rate: '',
  reverse: false
};

const exchangeRate = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    setBase: (state, action) => {
      let { name, amount } = action.payload;
      state.baseName = name;
      state.baseAmount = amount;
    },
    setTarget: (state, action) => {
      let { name, amount } = action.payload;
      state.targetName = name;
      state.targetAmount = amount;
    },
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    reverseData: (state, action) => {
      state.reverse = !state.reverse;
    }
  }
});

export const { setBase, setTarget, setRate, reverseData } = exchangeRate.actions;
export default exchangeRate.reducer;
