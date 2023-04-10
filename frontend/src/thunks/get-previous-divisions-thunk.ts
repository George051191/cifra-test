/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import BaseUrl from '../constants/urls';
import { setCurrentDivisions } from '../store/allSlice';

import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';

const getPreviousDivisionsThunk: AppThunk = (id: number, changeStep: (key:boolean) => void) => async (dispatch) => {
  try {
    const division = await axios.get(`${BaseUrl}/divisions/${id}`);
      const allDivisions = await axios.get(`${BaseUrl}/divisions?parentDivision=${division.data.parentDivision}`);
      changeStep(true)

    dispatch(setCurrentDivisions(allDivisions.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default getPreviousDivisionsThunk;
