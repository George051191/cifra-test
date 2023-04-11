/* eslint-disable max-len */
import axios, { AxiosResponse } from 'axios';
import BaseUrl from '../constants/urls';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TWorker } from '../services/types';
import { setCurrentWorkers } from '../store/allSlice';

const changeWorkerThunk: AppThunk = (changedData: TWorker, id: number, oldDivision: number, newDivision: number ) => async (dispatch) => {
  try {
    await axios.patch(`${BaseUrl}/workers/${id}`, {
      ...changedData,
      division: newDivision,
    });

    const allWorkers:AxiosResponse<TWorker[]> = await axios.get(`${BaseUrl}/workers?division=${oldDivision}`); /// change devision

    dispatch(setCurrentWorkers(allWorkers.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default changeWorkerThunk;
