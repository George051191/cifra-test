/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import axios, { AxiosResponse } from 'axios';
import BaseUrl from '../constants/urls';
import { setCurrentDivisions } from '../store/allSlice';

import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TDivision } from '../services/types';
import { decreaseCurrentLevel, setPreviousDivision } from '../store/viewSlice';

const getPreviousDivisionsThunk: AppThunk = (id: number) => async (dispatch, getState) => {
  try {
    const division:AxiosResponse<TDivision> = await axios.get(`${BaseUrl}/divisions/${id}`);
    const allDivisions:AxiosResponse<TDivision[]> = await axios.get(`${BaseUrl}/divisions?parentDivision=${division.data.parentDivision}`);
    dispatch(decreaseCurrentLevel());
    dispatch(setPreviousDivision(id));

    dispatch(setCurrentDivisions(allDivisions.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default getPreviousDivisionsThunk;
