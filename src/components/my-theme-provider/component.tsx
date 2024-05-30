import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useThemeChoice } from "@src/hooks/use-theme-choice";
import React, { FC, useMemo } from "react";
import { MD3DarkTheme, MD3LightTheme, MD3Theme, PaperProvider } from "react-native-paper";

type MyThemeProviderProps  ={
  children: JSX.Element
}

//this wrapper componenet reads the redux store
export const MyThemeProvider:FC<MyThemeProviderProps>= ({
  children
}) => {
  const {getChosenAppTheme} = useThemeChoice();
  const { theme } = useMaterial3Theme();
  console.log('asdf', getChosenAppTheme());

  const themeToSet : MD3Theme = useMemo(()=> {
    return getChosenAppTheme() === 'light'? 
      { ...MD3LightTheme, colors: theme.light }
      : { ...MD3DarkTheme, colors: theme.dark };
  }, [theme, getChosenAppTheme]);

  return (
    <PaperProvider theme={themeToSet}>
      {children}
    </PaperProvider>
  );

};