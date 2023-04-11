/* eslint-disable max-len */
import axios, { AxiosResponse } from 'axios';
import BaseUrl from '../constants/urls';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TDivision } from '../services/types';
import { setCurrentDivisions } from '../store/allSlice';

const changeDivisionDataThunk: AppThunk = (id:number, newData:{ name: string, description: string }, parentDivision: number) => async (dispatch) => {
  try {
    await axios.patch(`${BaseUrl}/divisions/${id}`, {
      name: newData.name,
      description: newData.description,
    });

    const allDivisions:AxiosResponse<TDivision[]> = await axios.get(`${BaseUrl}/divisions?parentDivision=${parentDivision}`);

    dispatch(setCurrentDivisions(allDivisions.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default changeDivisionDataThunk;
