import HighlightText from '@sanar/react-native-highlight-text';
import { colors } from '@src/constants';
import { LeaderboardItemWithExtraProps } from '@src/mockdata/types';
import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Icon, Surface, Text, useTheme } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import { ScalingTouchable } from '../scaling-touchable';
import { getThemedStyles } from './styles';

export type LeaderboardAutosuggestItemProps = {
  onSelect: (selection:string)=>void
  entity: LeaderboardItemWithExtraProps
  searchQuery: string
}
export const LeaderboardAutosuggestItem:FC<LeaderboardAutosuggestItemProps> = ({
  onSelect,
  entity,
  searchQuery
}) => {
  const theme = useTheme();
  const styles= getThemedStyles(theme);
  
  const handleSuggestionItemPress = useDebouncedCallback(useCallback(() => {
    onSelect(entity.name);
  }, [entity.name, onSelect]),300);
  
  return (
    <ScalingTouchable onPress={handleSuggestionItemPress}>
      <Surface style={styles.suggestionRow} mode='flat' elevation={1}>
        <View style={styles.suggestionTextWrap}>
          <View style={styles.suggestionTextLeft}>
            <Icon source="magnify" size={15}/>
            <HighlightText
                highlightStyle={styles.highlight}
            // @ts-ignore
                searchWords={[searchQuery]}
                style={styles.suggestionText}
                selectionColor={colors.red_500}
                caseSensitive={false}
                textToHighlight={entity.name}
        />
          </View>
          <Text>Rank: {entity.rank}</Text>
        </View>
      </Surface>
    </ScalingTouchable>
  );
};