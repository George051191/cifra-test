/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import axios from 'axios';
import BaseUrl from '../constants/urls';
import { setCurrentDivisions } from '../store/allSlice';

import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';

const createDivisionThunk: AppThunk = (newDivision: { name: string, description: string }) => async (dispatch) => {
  try {
    await axios.post(`${BaseUrl}/divisions`, {
      ...newDivision,
      createdAt: (new Date().toLocaleDateString()),
      parentDivision: 0,
    });
    const allDivisions = await axios.get(`${BaseUrl}/divisions?parentDivision=0`);

    dispatch(setCurrentDivisions(allDivisions.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default createDivisionThunk;
