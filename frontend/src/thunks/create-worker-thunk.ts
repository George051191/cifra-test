import axios, { AxiosResponse } from 'axios';
import BaseUrl from '../constants/urls';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TWorker } from '../services/types';
import { setCurrentWorkers } from '../store/allSlice';

const createWorkerThunk: AppThunk = (workerData:TWorker, id:number) => async (dispatch) => {
  try {
    await axios.post(`${BaseUrl}/workers`, {
      ...workerData,
      division: id,
    });
    const allWorkers:AxiosResponse<TWorker[]> = await axios.get(`${BaseUrl}/workers?division=${id}`);

    dispatch(setCurrentWorkers(allWorkers.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default createWorkerThunk;
