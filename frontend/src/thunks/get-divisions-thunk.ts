/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import BaseUrl from '../constants/urls';
import { setCurrentDivisions } from '../store/allSlice';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';

const getAllDivisionsThunk: AppThunk = (id?: number) => async (dispatch) => {
  try {
    if (id) {
      const subDivisions = await axios.get(`${BaseUrl}/divisions?parentDivision=${id}`);
      dispatch(setCurrentDivisions(subDivisions.data));
      return;
    }
    const divisions = await axios.get(`${BaseUrl}/divisions?parentDivision=0`);
    dispatch(setCurrentDivisions(divisions.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default getAllDivisionsThunk;

/// решить вопрос с типизацией ответа и написать типы всех ответов от бека