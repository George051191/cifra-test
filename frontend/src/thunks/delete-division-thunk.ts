import axios, { AxiosResponse } from 'axios';
import BaseUrl from '../constants/urls';
import { setErrorMessage } from '../store/errorSlice';
import { AppThunk } from '../store/store.types';
import { TDivision } from '../services/types';
import { setCurrentDivisions, setCurrentWorkers } from '../store/allSlice';
import { setPreviousDivision } from '../store/viewSlice';

const deleteDivisionThunk: AppThunk = (id: number, parentDivision: number) => async (dispatch) => {
  try {
    await axios.delete(`${BaseUrl}/divisions/${id}`);
    dispatch(setCurrentWorkers([]));
    const allDivisions:AxiosResponse<TDivision[]> = await axios.get(`${BaseUrl}/divisions?parentDivision=${parentDivision}`);
    dispatch(setPreviousDivision(parentDivision));
    dispatch(setCurrentDivisions(allDivisions.data));
  } catch (error) {
    dispatch(setErrorMessage('oshibka'));
  }
};

export default deleteDivisionThunk;
