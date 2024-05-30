import React from 'react';
import { StatusBar as RNStatusBar, View } from "react-native";
import { useTheme } from "react-native-paper";

export const MyStatusBar = () => {
  const theme = useTheme();

  console.log('MyStatusBar', theme.colors.background);

  return (
    <View style={{backgroundColor:theme.colors.background}}>
      <RNStatusBar
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
    />
    </View>
  );
};