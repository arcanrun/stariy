//@flow
import {
  DB_GET_ALL_FAILURE,
  DB_GET_ALL_REQUEST,
  DB_GET_ALL_SUCCESS
} from '../constants';

type initialSateType = {
  allData: Array<any>,
  isFetching: boolean,
  error: boolean,
  error_message: ?string
};

const initialSate: initialSateType = {
  allData: [],
  isFetching: false,
  error: false,
  error_message: undefined
};

export function airplanes(
  state: initialSateType = initialSate,
  action: Object
) {
  switch (action.type) {
    case DB_GET_ALL_REQUEST:
      return { ...state, isFetching: true, error: false };
    case DB_GET_ALL_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        error_message: action.error_message
      };
    case DB_GET_ALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        error_message: undefined,
        allData: action.payload
      };
    default:
      return state;
  }
}
