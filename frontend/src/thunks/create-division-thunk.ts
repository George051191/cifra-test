/* eslint-disable @typescript-eslint/default-param-last */

/* eslint-disable max-len */
import axios, { AxiosResponse } from 'axios';
import BaseUrl from '../constants/urls';
import { setCurrentDivisions } from '../store/allSlice';

import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TDivision } from '../services/types';

const createDivisionThunk: AppThunk = (newDivision: { name: string, description: string }, id?:number,) => async (dispatch) => {
  try {
    if (id) {
      await axios.post(`${BaseUrl}/divisions`, {
        ...newDivision,
        createdAt: (new Date().toLocaleDateString()),
        parentDivision: id,
      });
      return
    }

    await axios.post(`${BaseUrl}/divisions`, {
      ...newDivision,
      createdAt: (new Date().toLocaleDateString()),
      parentDivision: 0,
    });
    const allDivisions:AxiosResponse<TDivision[]> = await axios.get(`${BaseUrl}/divisions?parentDivision=0`);

    dispatch(setCurrentDivisions(allDivisions.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default createDivisionThunk;
