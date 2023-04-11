/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */

import axios, { AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import BaseUrl from '../constants/urls';
import { setCurrentDivisions } from '../store/allSlice';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TDivision } from '../services/types';
import { increaseCurrentLevel, setCurrentDivisionsName, setCurrentWorkerDivision, setDivisionArray } from '../store/viewSlice';

const getAllDivisionsThunk: AppThunk = (specKey?:boolean, id?: number) => async (dispatch, getState) => {
  try {
    if (specKey) {
      const currentWorker = getState().view.worker;
      const divisionArray: AxiosResponse<TDivision[]> = await axios.get(`${BaseUrl}/divisions`);
      const currentDivisionsNames = divisionArray.data.map((el) => el.name);
      const currentWorkerDivision = divisionArray.data.find((el) => el.id === currentWorker!.division)
      batch(() => {
        dispatch(setDivisionArray(divisionArray.data));
        dispatch(setCurrentDivisionsName(currentDivisionsNames));
        dispatch(setCurrentWorkerDivision(currentWorkerDivision!.name));
      });
      return;
    }
    if (id) {
      const subDivisions: AxiosResponse<TDivision[]> = await axios.get(`${BaseUrl}/divisions?parentDivision=${id}`);
      if (subDivisions.data.length !== 0) {
        dispatch(setCurrentDivisions(subDivisions.data));
        dispatch(increaseCurrentLevel());
        return;
      }
      throw new Error('Нет вложенных подразделений');
    }
    const divisions: AxiosResponse<TDivision[]> = await axios.get(`${BaseUrl}/divisions?parentDivision=0`);
    dispatch(setCurrentDivisions(divisions.data));
  } catch (error:any) {
    dispatch(setErrorMessage(error.message));
  }
};

export default getAllDivisionsThunk;

/// решить вопрос с типизацией ответа и написать типы всех ответов от бека
