import HighlightText from '@sanar/react-native-highlight-text';
import { colors } from '@src/constants';
import { LeaderboardItemProps } from '@src/mockdata/types';
import React, { FC, useCallback } from 'react';
import { Surface, useTheme } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import { ScalingTouchable } from '../scaling-touchable';
import { getThemedStyles } from './styles';

export type LeaderboardAutosuggestItemProps = {
  onSelect: (selection:string)=>void
  entity: LeaderboardItemProps
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
      <Surface style={styles.suggestionRow}>
        <HighlightText
            highlightStyle={styles.highlight}
            // @ts-ignore
            searchWords={[searchQuery]}
            style={styles.suggestionText}
            selectionColor={colors.red_500}
            caseSensitive={false}
            textToHighlight={entity.name}
        />
      </Surface>
    </ScalingTouchable>
  );
};