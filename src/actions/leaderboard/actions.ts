import { SortButtonAttributes } from "@src/components";
import { LeaderboardModes } from "@src/reducers/leaderboard.reducer";
import { createAction } from "redux-actions";
import * as types from './action-types';

export const setLeaderboardSearchQuery = createAction<Maybe<string>>(types.SET_LEADERBOARD_SEARCHQUERY);

export const setLeaderboardDisplayMode = createAction<LeaderboardModes>(types.SET_LEADBOARD_DISPLAY_MODE);

export const setLeaderboardSortAttributes 
=  createAction<SortButtonAttributes[]>(types.SET_LEADERBOARD_SORT_ATTR);