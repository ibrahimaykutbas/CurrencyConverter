import { configureStore } from '@reduxjs/toolkit';

import exchangeRate from './exchangeRate';

const store = configureStore({
  reducer: {
    exchangeRate
  }
});

export default store;
