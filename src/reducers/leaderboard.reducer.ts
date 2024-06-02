
import { SortButtonAttributes } from '@src/components';
import { defaultSortOrders } from '@src/components/leaderboard/constants';
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions';

export type LeaderboardModes = 'results' | 'suggestions'

export interface InitialState {
  searchQuery: string
  mode: LeaderboardModes,
  sortAttributes: SortButtonAttributes[] //remmembers current sort button states
}

export const initialState: InitialState = {
  searchQuery: '',
  mode: 'suggestions',
  sortAttributes: defaultSortOrders
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
    }),
    [actionTypes.SET_LEADERBOARD_SORT_ATTR]: (state, {payload}) => ({
      ...state,
      sortAttributes:payload
    }),
  },
  initialState,
);
