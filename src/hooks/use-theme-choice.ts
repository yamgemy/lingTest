import { setAppThemePO } from "@src/actions";
import { appThemeSelector } from "@src/selectors";
import { useCallback } from "react";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const useThemeChoice = () => {

  const dispatch = useDispatch();

  const deviceColorTheme = useColorScheme(); //either light or dark or null/undefined

  const chosenAppTheme = useSelector(appThemeSelector);

  const getChosenAppTheme = useCallback(() => {
    if (chosenAppTheme) {
      return chosenAppTheme;
    }
    if (deviceColorTheme) {
      !chosenAppTheme && dispatch(setAppThemePO(deviceColorTheme));
      return deviceColorTheme;
    }
    return 'light';
  }, [dispatch, chosenAppTheme, deviceColorTheme]);

  return {
    getChosenAppTheme,
  };
};