import { RootState } from "@src/reducers";

export const appLoadingSelector = (state: RootState) => state.applicationReducer.appLoading;

export const appThemeSelector = (state: RootState) => state.applicationReducer.appTheme;