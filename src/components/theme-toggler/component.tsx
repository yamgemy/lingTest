import { setAppThemePO } from "@src/actions";
import { colors } from "@src/constants";
import { useThemeChoice } from "@src/hooks";
import React, { useCallback } from 'react';
import { IconButton, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";

export const ThemeToggler = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {getChosenAppTheme} = useThemeChoice();

  const toggleTheme = useCallback(() => {
    const themeNow = getChosenAppTheme();
    const nextTheme = themeNow === 'dark' ? 'light' : 'dark';
    dispatch(setAppThemePO(nextTheme));
  },[dispatch,getChosenAppTheme]);
    
  const bulbIcon = !theme.dark? 'lightbulb' :'lightbulb-off';
  const bulbColor = !theme.dark? colors.yellow : colors.grey_600;
    
  return (
    <IconButton
        mode={'contained'}
        icon={bulbIcon} 
        iconColor={bulbColor} 
        onPress={toggleTheme}
    />
  );
};