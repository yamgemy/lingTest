import { combineReducers } from 'redux';
import * as applicationReducer from './application.reducer';
import * as leaderboardReducer from './leaderboard.reducer';

export interface InitialState {
  applicationReducer: applicationReducer.InitialState,
  leaderboardReducer: leaderboardReducer.InitialState
  _persist: {
    version: number;
    rehydrated: boolean;
  };
}

export const rootReducer = combineReducers({
  applicationReducer: applicationReducer.reducer,
  leaderboardReducer:leaderboardReducer.reducer
});

export type RootState = ReturnType<typeof rootReducer>
