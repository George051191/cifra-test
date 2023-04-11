
import axios, { AxiosResponse } from 'axios';
import BaseUrl from '../constants/urls';
import { setCurrentWorkers } from '../store/allSlice';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TWorker } from '../services/types';

const getWorkersThunk: AppThunk = (id:number) => async (dispatch) => {
  try {
    const workers:AxiosResponse<TWorker[]> = await axios.get(`${BaseUrl}/workers?division=${id}`);
    dispatch(setCurrentWorkers(workers.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default getWorkersThunk;
