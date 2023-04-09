/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import BaseUrl from '../constants/urls';
import { setCurrentWorkers } from '../store/allSlice';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';


const getWorkersThunk: AppThunk = (id:number) => async (dispatch) => {
    try {
      const workers = await axios.get(`${BaseUrl}/workers?division=${id}`);
        dispatch(setCurrentWorkers(workers.data));
        console.log(workers.data)
    } catch (error) {
      dispatch(setErrorMessage('oshibka'));
    }
  };
  
  export default getWorkersThunk;
  