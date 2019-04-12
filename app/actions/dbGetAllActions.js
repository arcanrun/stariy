import { dispatch } from 'rxjs/internal/observable/range';

//@flow

const dbGetAllRequest = () => ({
  type: 'DB_GET_ALL_REQUEST',
  isFetching: true
});
const dbGetAllFailure = err => ({
  type: 'DB_GET_ALL_FAILURE',
  isFetching: false
  error: true,
  error_message: new Error(err)
});
const dbGetAllSuccess = data => ({
  type: 'DB_GET_ALL_REQUEST',
  isFetching: false
  payload: data
});
export const dbGetAll = () => {
 return dispatch => {
  dispatch(dbGetAllRequest())

 };
};
