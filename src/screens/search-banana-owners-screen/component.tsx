import { setAppThemePO } from "@src/actions";
import { ScalingTouchable } from "@src/components";
import { colors } from "@src/constants";
import { useThemeChoice } from "@src/hooks/use-theme-choice";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import { Button, IconButton, Searchbar, useTheme } from "react-native-paper";
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
    const nextTheme = themeNow === 'dark' ? 'light' : 'dark';
    dispatch(setAppThemePO(nextTheme));
  },[dispatch,getChosenAppTheme]);

  const bulbIcon = !theme.dark? 'lightbulb' :'lightbulb-off';
  const bulbColor = !theme.dark? colors.yellow : colors.grey_600;

  const [searchQuery, setSearchQuery] = React.useState('');

  const onSearchPress = useCallback(() => {

  },[]);

  return ( 
    <View style={styles.root}>
      <IconButton icon={bulbIcon} iconColor={bulbColor} onPress={toggleTheme}/>
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
          <ScalingTouchable >
            <Button 
                disabled={!searchQuery}
                labelStyle={styles.searchButtonLabel}
                contentStyle={styles.searchButtonContent}
                style={styles.searchButton}
                mode={'contained'}
                onPress={onSearchPress}
          >
              Search
            </Button>
          </ScalingTouchable>
        </View>

      </View>

    </View>
  );
};