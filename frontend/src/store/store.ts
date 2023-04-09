import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import allReducer from './allSlice';
import errorReducer from './errorSlice';

const store = configureStore({
  reducer: {
    all: allReducer,
    errors: errorReducer
  },
  middleware: [thunk]
});
export default store;