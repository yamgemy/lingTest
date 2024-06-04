
import { defaultSortOrders } from '@src/components/leaderboard/constants';
import { SortButtonAttributes } from '@src/components/sort-buttons-header-row/types';
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions';

export type LeaderboardModes = 'results' | 'suggestions'

export interface InitialState {
  searchQuery: string
  mode: LeaderboardModes,
  sortAttributes: SortButtonAttributes<Record<string, any>>[]
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
