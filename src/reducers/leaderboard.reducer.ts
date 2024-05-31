
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions';

export type LeaderboardModes = 'results' | 'suggestions'

export interface InitialState {
  searchQuery: string
  mode: LeaderboardModes
}

export const initialState: InitialState = {
  searchQuery: '',
  mode: 'suggestions'
};

export const reducer = handleActions<InitialState, any>(
  {
    [actionTypes.SET_LEADERBOARD_SEARCHQUERY]: (state, { payload }) => ({
      ...state,
      searchQuery: payload,
    }),
    [actionTypes.SET_LEADBOARD_DISPLAY_MODE]: (state, {payload}) => ({
      ...state,
      mode:payload
    })
  },
  initialState,
);
