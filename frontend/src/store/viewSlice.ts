import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWorker, TDivision } from '../services/types';

type TViewState = {
  division: TDivision | null,
  worker: TWorker | null,
  divisionsArray: TDivision[] | null,
  currentDivisions: string[],
  currentWorkerDivision: string,
  currentLevel: number,
  previousDivision: number,
};
const initialState : TViewState = {
  division: null,
  worker: null,
  divisionsArray: null,
  currentDivisions: [],
  currentWorkerDivision: '',
  currentLevel: 0,
  previousDivision: 0,
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setCurrentDivision: (state, action: PayloadAction<TDivision>) => ({
      ...state, division: action.payload,
    }),
    setCurrentWorker: (state, action: PayloadAction<TWorker>) => ({
      ...state, worker: action.payload,
    }),
    setDivisionArray: (state, action: PayloadAction<TDivision[]>) => ({
      ...state, divisionsArray: action.payload,
    }),
    setCurrentDivisionsName: (state, action: PayloadAction<string[]>) => ({
      ...state, currentDivisions: action.payload,
    }),
    setCurrentWorkerDivision: (state, action: PayloadAction<string>) => ({
      ...state, currentWorkerDivision: action.payload,
    }),
    increaseCurrentLevel: (state) => ({
      ...state, currentLevel: state.currentLevel + 1,
    }),
    decreaseCurrentLevel: (state) => ({
      ...state, currentLevel: state.currentLevel - 1,
    }),
    setPreviousDivision: (state, action: PayloadAction<number>) => ({
      ...state, previousDivision: action.payload,
    })
  },

});

const viewReducer = viewSlice.reducer;

export const {
  setCurrentDivision,
  setCurrentWorker,
  setDivisionArray,
  setCurrentDivisionsName,
  setCurrentWorkerDivision,
  increaseCurrentLevel,
  decreaseCurrentLevel,
  setPreviousDivision
} = viewSlice.actions;

export default viewReducer;
