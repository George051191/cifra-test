import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import allReducer from './allSlice';
import errorReducer from './errorSlice';
import viewReducer from './viewSlice';

const store = configureStore({
  reducer: {
    all: allReducer,
    errors: errorReducer,
    view: viewReducer
  },
  middleware: [thunk]
});
export default store;