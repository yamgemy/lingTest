import { ColorSchemeName } from "react-native";
import { createAction } from "redux-actions";
import * as types from './action-types';

export const setAppLoadingPO = createAction<boolean>(types.SET_APP_LOADING);

export const setAppThemePO = createAction<ColorSchemeName>(types.SET_APP_THEME);