import { LeaderboardItemProps, LeaderboardItemWithExtraProps } from '@src/mockdata/types';
import { keywordToReturnAllEntities } from '@src/screens/search-banana-owners-screen/constants';
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
  onSuggestionSelected,
  forceAlphabeticalOptions
}) => {
  const dispatch = useDispatch();
  const sortAttributes = useSelector(leaderboardSortAttributesSelector);
  const [results, setResults] = useState<SortedResults<Record<string,any>>>();
  const mode = useSelector(leaderboardDisplayModeSelector);

  const augmentedSource = useMemo(()=> {
    const raw = Object.values(source) as Array<LeaderboardItemProps>;
    const rawWithPinyin = raw.map(i=> ({...i, nameInPinyin: slugify(i.name)}));
    const groupKey: keyof LeaderboardItemWithExtraProps = 'bananas';
    const keyToKeepAlphabetical: keyof LeaderboardItemWithExtraProps = 'nameInPinyin';

    const groupedByBananas = rawWithPinyin
      .sort((a,b)=>a[keyToKeepAlphabetical]?.localeCompare(b[keyToKeepAlphabetical]))
      .reduce((acc, item)=> {
        if (!acc[item[groupKey]]){
          acc[item[groupKey]] = [];
        }
        acc[item[groupKey]].push(item);
        return acc;
      }, {} as Record<string, LeaderboardItemWithExtraProps[]>);

    /*
      assigning same rank to entities with same banana count
      */
    const assignedRanks = Object.keys(groupedByBananas)
      .sort((a,b)=> Number(b) - (Number(a))) //most bananas first
      .map((key, index)=> groupedByBananas[key].map(entity=> ({...entity, rank: index+ 1})))
      .flat(1);
    return assignedRanks;
  }, [source]);

  const queryHits : LeaderboardItemWithExtraProps[]= useMemo(()=> {
    if (searchQueryToHit === keywordToReturnAllEntities) {return augmentedSource;}
    if (!searchQueryToHit) {return [];}
    const topTen = augmentedSource.slice(0,10);
    if (topTen.find(i=> i.name.toLowerCase().includes(searchQueryToHit))){
      return topTen;
    }
    const target = augmentedSource.find(i=>i.name.toLowerCase().includes(searchQueryToHit));
    if (target){
      return topTen.slice(0,9).concat([target]);
    }
    return [];
  },[searchQueryToHit, augmentedSource]);
  
  useEffect(()=> {
    setResults({
      keyToSort: 'rank',
      currentSortOrder:'ASC',
      data: queryHits as Array<LeaderboardItemWithExtraProps>
    });
  },[queryHits, dispatch]);

  const renderLeaderboardItem = useCallback(({ item, index }: ListRenderItemInfo<Record<string,any>>) => {
    return (
      <LeaderboardRowItem 
          entity={item as LeaderboardItemWithExtraProps} 
          isVerticalLast={index === queryHits.length -1} 
          verticalIndex={index}
          sortOrders={sortAttributes}
          searchQuery={searchQueryToHit}/>
    );
  }, [queryHits.length, searchQueryToHit, sortAttributes]);

  return(
    mode === 'suggestions' ? (
      <LeaderboardAutosuggestions
          keywordToReturnAllEntities={keywordToReturnAllEntities}
          searchQuery={searchQueryDynamic??''}
          source={Object.values(augmentedSource).flatMap(subArr=>subArr)}
          onSelect={onSuggestionSelected}
      />
    ): (
      <>
        {results && results.data && (
        <FlatList 
            data={results.data} 
            renderItem={renderLeaderboardItem}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <>
                {results && results.data.length > 0 && (
                  <SortButtonsHeaderRow 
                      sourceToSort={results}
                      setResults={setResults}
                      sortButtonAttributes={sortAttributes }
                      forceAlphabeticalOptions={forceAlphabeticalOptions}
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