import { setAppThemePO } from "@src/actions";
import { ScalingTouchable } from "@src/components";
import { useThemeChoice } from "@src/hooks/use-theme-choice";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { getThemedStyles } from "./styles";

/*

*/
export const SearchBananaOwnersScreen:FC<any> = () => {
  const dispatch = useDispatch();
  const {getChosenAppTheme} = useThemeChoice();
  const theme = useTheme();
  const styles = getThemedStyles(theme);

  const toggleTheme = useCallback(() => {
    const themeNow = getChosenAppTheme();
    const nextThem = themeNow === 'dark' ? 'light' : 'dark';
    dispatch(setAppThemePO(nextThem));
  },[dispatch,getChosenAppTheme]);

  return ( 
    <View style={styles.root}>
      <ScalingTouchable onPress={toggleTheme}>
        <Text theme={theme}>Toggle Theme</Text>
      </ScalingTouchable> 
    </View>
  );
};