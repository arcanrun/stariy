//@flow
import { ipcRenderer } from 'electron';

import {
  DB_GET_ALL_FAILURE,
  DB_GET_ALL_REQUEST,
  DB_GET_ALL_SUCCESS
} from '../constants';

const dbGetAllRequest = () => ({
  type: DB_GET_ALL_REQUEST,
  isFetching: true
});
const dbGetAllFailure = err => ({
  type: DB_GET_ALL_FAILURE,
  isFetching: false,
  error: true,
  error_message: new Error(err)
});
const dbGetAllSuccess = data => ({
  type: DB_GET_ALL_SUCCESS,
  isFetching: false,
  payload: data
});
export const dbGetAll = () => {
  return (dispatch: any) => {
    dispatch(dbGetAllRequest());
    try {
      ipcRenderer.send('get-all');
      ipcRenderer.on('all-data', (event, message) => {
        dispatch(dbGetAllSuccess(message));
      });
    } catch (error) {
      dispatch(dbGetAllFailure(error));
    }
  };
};
