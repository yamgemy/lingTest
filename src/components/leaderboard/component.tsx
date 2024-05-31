import { LeaderboardItemProps } from '@src/mockdata/types';
import { leaderboardDisplayModeSelector } from '@src/selectors/leaderboard.reducer';
import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { slugify } from 'transliteration';
import { LeaderboardAutosuggestions } from '../leaderboard-autosuggestions';
import { LeaderboardRowItem } from '../leaderboard-row-item/component';
import { labels } from './constants';
import { styles } from './styles';

export type LeaderboardProps = {
  source: Record<string, Record<string, any>>
  searchQueryToHit?: Maybe<string>
  searchQueryDynamic: Maybe<string>
  onSuggestionSelected: (selection:string)=> void
}

export const Leaderboard:FC<LeaderboardProps> = ({
  source,
  searchQueryToHit,
  searchQueryDynamic,
  onSuggestionSelected
}) => {

  const mode = useSelector(leaderboardDisplayModeSelector);

  const flattenedSource = useMemo(()=> {
    const raw = Object.values(source) as Array<LeaderboardItemProps>;
    const rawWithPinyin = raw.map(i=> ({...i, nameInPinyin: slugify(i.name)}));
    const sortedByName = rawWithPinyin.sort((a, b) => a.nameInPinyin.localeCompare(b.nameInPinyin));
    const sortedByBananaCount = sortedByName.sort((a,b)=>b.bananas -a.bananas);
    const withRank = sortedByBananaCount.map((i, index)=> ({...i, rank: index+1}));
    return withRank;
  }, [source]);

  const queryHits = useMemo(()=> {
    if (searchQueryToHit === 'all') {return flattenedSource;}
    if (!searchQueryToHit) {return [];}
    const topTen = flattenedSource.slice(0,10);
    if (topTen.find(i=> i.name.toLowerCase().includes(searchQueryToHit))){
      return topTen;
    }
    const target = flattenedSource.find(i=>i.name.toLowerCase().includes(searchQueryToHit));
    console.log('queryHits', target);
    if (target){
      return topTen.slice(0,9).concat([target]);
    }
    return [];
  },[searchQueryToHit, flattenedSource]);

  const renderLeaderboardItem = useCallback(({ item, index }: ListRenderItemInfo<LeaderboardItemProps>) => {
    const isLast = index === flattenedSource.length -1;
    return (
      <LeaderboardRowItem 
          entity={item} 
          isLast={isLast} 
          index={index} 
          searchQuery={searchQueryToHit}/>
    );
  }, [flattenedSource.length, searchQueryToHit]);

  return(
    mode === 'suggestions' ? (
      <LeaderboardAutosuggestions
          searchQuery={searchQueryDynamic??''}
          source={flattenedSource}
          onSelect={onSuggestionSelected}
      />
    ): (
      <FlatList 
          data={queryHits} 
          renderItem={renderLeaderboardItem}
          ListFooterComponent={<View style={styles.listFooter}/>}
          keyExtractor={(item)=> item.uid}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              {(searchQueryToHit && queryHits.length === 0 )&& (
              <Text style={styles.listEmptyMessage}>
                {labels.noResults}
                </Text>
            )}
              {(!searchQueryDynamic)&& (
              <Text style={styles.listEmptyMessage}>
                {labels.beforeQuery}
              </Text>
            )}
            </View>
        }
    />
    )
  );
};