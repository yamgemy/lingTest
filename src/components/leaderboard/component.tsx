import { LeaderboardItemProps } from '@src/mockdata/types';
import {
  leaderboardDisplayModeSelector,
  leaderboardSortAttributesSelector
} from '@src/selectors/leaderboard.selectors';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { slugify } from 'transliteration';
import { LeaderboardAutosuggestions } from '../leaderboard-autosuggestions';
import { LeaderboardRowItem } from '../leaderboard-row-item/component';
import { SortButtonsHeaderRow, } from '../sort-buttons-header-row';
import { labels } from './constants';
import { styles } from './styles';
import { LeaderboardProps, SortedResults } from './types';

export const Leaderboard:FC<LeaderboardProps> = ({
  source,
  searchQueryToHit,
  searchQueryDynamic,
  onSuggestionSelected
}) => {
  const dispatch = useDispatch();
  const sortAttributes = useSelector(leaderboardSortAttributesSelector);
  const [results, setResults] = useState<SortedResults>();
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
    if (searchQueryToHit === 'everything') {return flattenedSource;}
    if (!searchQueryToHit) {return [];}
    const topTen = flattenedSource.slice(0,10);
    if (topTen.find(i=> i.name.toLowerCase().includes(searchQueryToHit))){
      return topTen;
    }
    const target = flattenedSource.find(i=>i.name.toLowerCase().includes(searchQueryToHit));
    if (target){
      return topTen.slice(0,9).concat([target]);
    }
    return [];
  },[searchQueryToHit, flattenedSource]);
  
  useEffect(()=> {
    setResults({
      keyToSort: 'rank',
      currentSortOrder:'ASC',
      data: queryHits
    });
  },[queryHits, dispatch]);

  const renderLeaderboardItem = useCallback(({ item, index }: ListRenderItemInfo<LeaderboardItemProps>) => {
    const isLast = index === flattenedSource.length -1;
    return (
      <LeaderboardRowItem 
          entity={item} 
          isLast={isLast} 
          index={index}
          sortOrders={sortAttributes}
          searchQuery={searchQueryToHit}/>
    );
  }, [flattenedSource.length, searchQueryToHit, sortAttributes]);

  return(
    mode === 'suggestions' ? (
      <LeaderboardAutosuggestions
          searchQuery={searchQueryDynamic??''}
          source={flattenedSource}
          onSelect={onSuggestionSelected}
      />
    ): (
      <>
        {results && results.data && (
        <FlatList 
            data={results.data} 
            renderItem={renderLeaderboardItem}
            ListHeaderComponent={
              <>
                {results && results.data.length > 0 && (
                  <SortButtonsHeaderRow 
                      sourceToSort={results}
                      setResults={setResults}
                      sortButtonAttributes={sortAttributes}
                  />
                 )}
              </>
            }
            ListFooterComponent={<View style={styles.listFooter}/>}
            keyExtractor={(item)=> item.uid}
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                {(!searchQueryDynamic)&& (
                  <Text style={styles.listEmptyMessage}>
                    {labels.beforeQuery}
                  </Text>
                )}
              </View>
            }
        />
        )}
      </>
    
    )
  );
};