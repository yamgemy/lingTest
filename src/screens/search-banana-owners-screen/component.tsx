import { setAppThemePO } from "@src/actions";
import { ScalingTouchable } from "@src/components";
import { useThemeChoice } from "@src/hooks/use-theme-choice";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import { Button, Searchbar, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from "react-redux";
import { getThemedStyles } from "./styles";
MaterialCommunityIcon.loadFont();

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

  const [searchQuery, setSearchQuery] = React.useState('');

  return ( 
    <View style={styles.root}>
      <ScalingTouchable onPress={toggleTheme}>
        <Text theme={theme}>Toggle Theme</Text>
      </ScalingTouchable>
      <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
          <Searchbar
              style={styles.searchComponent}
              inputStyle={styles.searchInput}
              placeholder="User name"
              onChangeText={setSearchQuery}
              value={searchQuery}
           />
        </View>
        <View style={styles.searchButtonContainer}>
          <Button 
              labelStyle={styles.searchButtonLabel}
              contentStyle={styles.searchButtonContent}
              style={styles.searchButton}
              mode={'contained'}
              onPress={()=>{}}
          >
            Search
          </Button>
        </View>

      </View>

    </View>
  );
};