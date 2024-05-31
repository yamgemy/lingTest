
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions';

export interface InitialState {
  searchQuery: string
}

export const initialState: InitialState = {
  searchQuery: ''
};

export const reducer = handleActions<InitialState, any>(
  {
    [actionTypes.SET_LEADERBOARD_SEARCHQUERY]: (state, { payload }) => ({
      ...state,
      searchQuery: payload,
    }),
  },
  initialState,
);
