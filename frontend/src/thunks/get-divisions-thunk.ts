/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import BaseUrl from '../constants/urls';
import { setCurrentDivisions } from '../store/allSlice';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';

const getAllDivisionsThunk: AppThunk = (changeStep:(key:boolean)=>void, id?: number) => async (dispatch) => {
  try {
    if (id) {
       
      const subDivisions = await axios.get(`${BaseUrl}/divisions?parentDivision=${id}`);
      if (subDivisions.data.length !== 0) {
        dispatch(setCurrentDivisions(subDivisions.data));
        changeStep(false);
        return;
      }
      throw new Error('Нет вложенных подразделений')
     
    }
    const divisions = await axios.get(`${BaseUrl}/divisions?parentDivision=0`);
    dispatch(setCurrentDivisions(divisions.data));
  } catch (error: any) {
    dispatch(setErrorMessage(error.message));
  }
};

export default getAllDivisionsThunk;

/// решить вопрос с типизацией ответа и написать типы всех ответов от бека