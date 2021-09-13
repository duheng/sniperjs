import * as types from '../constants/ActionTypes'
import { handleActions, } from 'redux-actions';

const initialState = {
  homeData: {},
};

const handler = {};

handler[types.RECEIVE_HOME] = (state, action) => {
  const { homeData, } = action;
  return {
    ...state,
    homeData,
  };
};

export default handleActions(handler, initialState);
