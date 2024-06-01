import { setLeaderboardDisplayMode, setLeaderboardSearchQuery } from "@src/actions";
import { ScalingTouchable } from "@src/components";
import { Leaderboard } from "@src/components/leaderboard/component";
import { ThemeToggler } from "@src/components/theme-toggler/component";
import leaderboardMockData from '@src/mockdata/leaderboard.json';
import {
  leaderboardDisplayModeSelector,
  leaderboardSearchQuerySelector
} from "@src/selectors/leaderboard.reducer";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { Searchbar, Surface, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { labels } from "./constants";
import { getThemedStyles } from "./styles";
MaterialCommunityIcon.loadFont();

export const SearchBananaOwnersScreen:FC<any> = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getThemedStyles(theme);

  const leaderboardMode = useSelector(leaderboardDisplayModeSelector);;
  const searchQuery = useSelector(leaderboardSearchQuerySelector);
  const [searchQueryToHit, setSearchQueryToHit] = React.useState('');

  const handleSearchInputTextChange = useCallback((text: string) => {
    dispatch(setLeaderboardDisplayMode('suggestions'));
    dispatch(setLeaderboardSearchQuery(text.toLowerCase().trim()));
  }, [dispatch]);

  const onSearchPress = useDebouncedCallback(useCallback(() => {
    dispatch(setLeaderboardDisplayMode('results'));
    setSearchQueryToHit(searchQuery.toLowerCase().trim());
  },[searchQuery,dispatch]), 300);

  const onSuggestionPress = useDebouncedCallback(useCallback((selection:string) => {
    dispatch(setLeaderboardDisplayMode('results'));
    dispatch(setLeaderboardSearchQuery(selection.toLowerCase().trim()));
    setSearchQueryToHit(selection.toLowerCase().trim());
  },[dispatch]), 300);

  //@ts-ignore
  const handleKeyPress = useCallback(({ nativeEvent: { key: keyValue } }) => {
    console.log(keyValue);
    if(keyValue === 'Enter')
    {
      console.log("enter");
    }
  },[]);

  useEffect(()=>{
    if (!searchQuery) {
      dispatch(setLeaderboardDisplayMode('results'));
      setSearchQueryToHit('');
    }
  },[searchQuery,dispatch]);

  const isLastSearchLoaded = useRef<boolean>(false);
  useEffect(()=> {
    if (!isLastSearchLoaded.current && leaderboardMode === 'results'){
      isLastSearchLoaded.current = true;
      onSearchPress();
    }
  }, [searchQuery, onSearchPress, leaderboardMode]);

  return ( 
    <View style={styles.root}>
      <View style={styles.section}>
        <ThemeToggler/>
      </View>
      <Surface 
          style={[styles.searchRow, styles.section]} 
          mode={"flat"}>
        <View style={styles.searchInputContainer}>
          <Searchbar
              style={styles.searchComponent}
              inputStyle={styles.searchInput}
              placeholder="User name"
              onChangeText={handleSearchInputTextChange}
              value={searchQuery}
              autoCapitalize="none"
              numberOfLines={1}
              onKeyPress={handleKeyPress}
           />
        </View>
        <View style={styles.searchButtonContainer}>
          <ScalingTouchable 
              disabled={!searchQuery}
              onPress={onSearchPress}>
            <Surface 
                mode={"flat"} 
                style={[styles.searchButton, 
                  !searchQuery && styles.searchButtonDisabled
                ]}
            >
              <Text style={styles.searchButtonLabel}>
                {labels.search_btn}
              </Text>
            </Surface>
          </ScalingTouchable>
        </View>
      </Surface>
      <View style={styles.section}>
        <Leaderboard 
            source={leaderboardMockData} 
            searchQueryDynamic={searchQuery}
            onSuggestionSelected={onSuggestionPress}
            searchQueryToHit={searchQueryToHit}/>
      </View>
    </View>
  );
};