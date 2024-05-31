import { setAppThemePO } from "@src/actions";
import { ScalingTouchable } from "@src/components";
import { Leaderboard } from "@src/components/leaderboard/component";
import { colors } from "@src/constants";
import { useThemeChoice } from "@src/hooks/use-theme-choice";
import leaderboardMockData from '@src/mockdata/leaderboard.json';
import React, { FC, useCallback, useEffect } from "react";
import { View } from "react-native";
import { IconButton, Searchbar, Surface, Text, useTheme } from "react-native-paper";
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
  const [searchQueryToHit, setSearchQueryToHit] = React.useState('');

  const onSearchPress = useCallback(() => {
    setSearchQueryToHit(searchQuery.toLowerCase().trim());
  },[searchQuery]);

  useEffect(()=>{
    !searchQuery && setSearchQueryToHit('');
  },[searchQuery]);

  return ( 
    <View style={styles.root}>
      <View style={styles.section}>
        <IconButton icon={bulbIcon} 
            iconColor={bulbColor} 
            onPress={toggleTheme}/>
      </View>
      <Surface 
          style={[styles.searchRow, styles.section]} 
          mode={"flat"}>
        <View style={styles.searchInputContainer}>
          <Searchbar
              style={styles.searchComponent}
              inputStyle={styles.searchInput}
              placeholder="User name"
              onChangeText={setSearchQuery}
              value={searchQuery}
              autoCapitalize="none"
           />
        </View>
        <View style={styles.searchButtonContainer}>
          <ScalingTouchable disabled={!searchQuery} onPress={onSearchPress}>
            <Surface 
                mode={"flat"} 
                style={[styles.searchButton, 
                  !searchQuery && styles.searchButtonDisabled
                ]}
            >
              <Text                
                  style={styles.searchButtonLabel}>
                Search
              </Text>
            </Surface>
          </ScalingTouchable>
        </View>
      </Surface>
      <View style={styles.section}>
        <Leaderboard 
            source={leaderboardMockData} 
            searchQueryDynamic={searchQuery}
            searchQueryToHit={searchQueryToHit}/>
      </View>
    </View>
  );
};