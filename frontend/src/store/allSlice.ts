import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWorker, TDivision } from '../services/types';

type TAllState = {
  divisions: Array<TDivision> | null,
  workers: Array<TWorker> | null
};
const initialState : TAllState = {
  divisions: null,
  workers: null,
};

const allSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    setCurrentDivisions: (state, action: PayloadAction<Array<TDivision>>) => ({
      ...state, divisions: action.payload,
    }),
    setCurrentWorkers: (state, action: PayloadAction<Array<TWorker>>) => ({
      ...state, workers: action.payload,
    }),
  },

});

const allReducer = allSlice.reducer;

export const {
  setCurrentDivisions,
  setCurrentWorkers,
} = allSlice.actions;

export default allReducer;