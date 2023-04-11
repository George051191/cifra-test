import axios, { AxiosResponse } from 'axios';
import BaseUrl from '../constants/urls';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TWorker } from '../services/types';
import { setCurrentWorkers } from '../store/allSlice';

const deleteWorkerThunk: AppThunk = (id: number, division:number) => async (dispatch) => {
    try {
      await axios.delete(`${BaseUrl}/workers/${id}`);
      const allWorkers:AxiosResponse<TWorker[]> = await axios.get(`${BaseUrl}/workers?division=${division}`);
  
      dispatch(setCurrentWorkers(allWorkers.data));
    } catch (error) {
      dispatch(setErrorMessage('oshibka'));
    }
  };
  
  export default deleteWorkerThunk;
  