import { createAction } from "redux-actions";
import * as types from './action-types';

export const setLeaderboardSearchQuery = createAction<Maybe<string>>(types.SET_LEADERBOARD_SEARCHQUERY);