// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { menu } from './menu';
import { airplanes } from './airplanes';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    menu,
    airplanes
  });
}
