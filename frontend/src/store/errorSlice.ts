/* eslint-disable import/prefer-default-export */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TErrorsState = {
  errorMessage: string
};
const initialState : TErrorsState = {
  errorMessage: '',
};

const errorsSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => ({
      ...state, errorMessage: action.payload,
    }),
  },

});

const errorReducer = errorsSlice.reducer;

export const {
  setErrorMessage,
} = errorsSlice.actions;

export default errorReducer;
