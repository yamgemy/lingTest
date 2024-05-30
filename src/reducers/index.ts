import { combineReducers } from 'redux';
import * as applicationReducer from './application.reducer';
export interface InitialState {
  applicationReducer: applicationReducer.InitialState,
  _persist: {
    version: number;
    rehydrated: boolean;
  };
}

export const rootReducer = combineReducers({
  applicationReducer: applicationReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>
