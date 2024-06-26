import { LeaderboardItemWithExtraProps } from '@src/mockdata/types';
import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LeaderboardAutosuggestItem } from '../leaderboard-autosuggest-item';
import { labels } from '../leaderboard/constants';
import { getThemedStyles } from './styles';

export type LeaderboardAutosuggestionsProps = {
  keywordToReturnAllEntities: string
  searchQuery: string
  source: Array<LeaderboardItemWithExtraProps >
  onSelect: (name:string) => void
}
export const LeaderboardAutosuggestions:FC<LeaderboardAutosuggestionsProps> = ({
  source,
  searchQuery,
  onSelect
}) => {

  const theme = useTheme();
  const styles = getThemedStyles(theme);

  const suggestions = useMemo(()=> {
    if (!searchQuery){return [];}
    return source.filter(i=>i.name.toLowerCase().trim().includes(searchQuery));
  }, [source, searchQuery]);

  const renderSuggestionItem = useCallback(({ item }: ListRenderItemInfo<LeaderboardItemWithExtraProps>)=> {
    return (
      <LeaderboardAutosuggestItem 
          entity={item}
          searchQuery={searchQuery}
          onSelect={onSelect}/>
    );
  }, [onSelect, searchQuery]);
  return (
    <>
      <FlatList 
          data={suggestions}
          renderItem={renderSuggestionItem}
          keyExtractor={(item)=> item.uid}
          ListHeaderComponent={
            <Text style={styles.title}>
              {suggestions.length > 0 ? labels.suggestions_title: ''}
            </Text>
          }
          stickyHeaderIndices={[0]}
          ListFooterComponent={<View style={styles.footer} />}
          ListEmptyComponent={
            <View style={styles.listEmptyWrap}>
              <Text style={styles.listEmptyMessage}>
                {searchQuery? labels.noResults: ''}
              </Text>
            </View>
          }
      />
    </>
  );
};