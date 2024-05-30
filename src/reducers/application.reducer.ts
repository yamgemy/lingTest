import { ColorSchemeName } from 'react-native';
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions';

export interface InitialState {
  appLoading: boolean;
  appTheme: ColorSchemeName
}

export const initialState: InitialState = {
  appLoading: false,
  appTheme: null
};

export const reducer = handleActions<InitialState, any>(
  {
    [actionTypes.SET_APP_LOADING]: (state, { payload }) => ({
      ...state,
      appLoading: payload,
    }),
    [actionTypes.SET_APP_THEME]: (state, {payload}) => ({
      ...state,
      appTheme:payload
    }),
    [actionTypes.RESET_STORE]: () => initialState,
  },
  initialState,
);
