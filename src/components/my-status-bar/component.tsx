import React from 'react';
import { StatusBar as RNStatusBar, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MyStatusBar = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  console.log('MyStatusBar', theme.colors.background);

  return (
    <View style={[{height:insets.top, backgroundColor: theme.colors.background}]}>
      <RNStatusBar
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
    />
    </View>
  );
};