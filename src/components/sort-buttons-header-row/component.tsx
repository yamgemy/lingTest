import { setLeaderboardSortAttributes } from "@src/actions";
import { colors } from "@src/constants";
import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { IconButton, Surface, Text, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { getThemedStyles } from "./styles";
import { SortButtonAttributes, SortButtonsHeaderRowProps } from "./types";

export const SortButtonsHeaderRow:FC<SortButtonsHeaderRowProps<Record<string, any>>> = ({
  sortButtonAttributes = [],
  sourceToSort,
  setResults,
  forceAlphabeticalOptions
}) => {
  const theme = useTheme();
  const styles = getThemedStyles(theme);
  const dispatch = useDispatch();
  const isSortRestored = useRef<boolean>(false);

  //any list that falls under this func is when sortOrder is DESC
  // const keepEntityStringAttributeSortedAphabetically 
  // = useCallback(( payload: Array<Record<string, any>>, keyToSort: string) => {
  //   const {keyToKeepAlphabetical, enabled, dominantKey} = forecEntitiesSortedAlphabetically;
  //   if (!enabled) {return payload.sort((a,b)=> b[keyToSort] - a[keyToSort]);}

  //   const groupedByDominantKey = payload.reduce((acc, item)=> {
  //     if (!acc[item[dominantKey]]){
  //       acc[item[dominantKey]] = [];
  //     }
  //     acc[item[dominantKey]].push(item);
  //     acc[item[dominantKey]].sort((a,b)=> 
  //a[keyToKeepAlphabetical]?.localeCompare(b[keyToKeepAlphabetical]));
  //     return acc;
  //   }, {});

  //   console.log('groupedByDominantKey', groupedByDominantKey);

  //   const deepSorted = Object.values(groupedByDominantKey).sort((a,b)=>  
  //     a[subDominantKey] - b[subDominantKey]
  //   );
  //   return [...deepSorted.flatMap(subArr => subArr)] ?? [];
  // },[forecEntitiesSortedAlphabetically]);

  //when rank is Descending, i.e. largest number rank top -> lowest bottom
  const version2 = useCallback((payload: Record<string, any>[], keyToSort: string) => {

    const {keyToKeepAlphabetical, enabled, dominantKey, sortName} = forceAlphabeticalOptions;

    const activeSortButton = sortButtonAttributes.find(button=> button.isCurrentSort);

    if (enabled && activeSortButton?.keyToSort === sortName){
      const namesOrderInEachGroup = activeSortButton?.sortOrder; //presumes to be 'rank'
      const groupedByBananas = payload.reduce((acc, item)=> {
        if (!acc[dominantKey]){
          acc[dominantKey] = [];
        }
        acc[dominantKey].push(item);
        //@ts-ignore
        acc[dominantKey].sort((a,b)=> //namesOrderInEachGroup === 'ASC'?
          b[keyToKeepAlphabetical]?.localeCompare(a[keyToKeepAlphabetical]) 
          // :b[keyToKeepAlphabetical]?.localeCompare(a[keyToKeepAlphabetical]) 
        );
        return acc;
      }, {} as Record<string, LeaderboardItemWithExtraProps[]>);
  
      const sortedByBananaCountDESC = Object.values(groupedByBananas)
        .flat(1)
        .sort((a,b)=> b[dominantKey] - a[dominantKey]) //desc bananas
        .map((entity, index)=> ({...entity, rank: index+1}))
        .reverse();
      console.log('sortedByBananaCountDESC', sortedByBananaCountDESC);
      return sortedByBananaCountDESC;
    }

    return payload.sort((a,b)=> b[keyToSort] - a[keyToSort]);

  },[forceAlphabeticalOptions, sortButtonAttributes]);

  const applySortToSearchResults = useCallback(
    (activeSort: SortButtonAttributes<Record<string,any>>) => {
      if (!sourceToSort || !sourceToSort.data[0] || !activeSort) {return;}
      const {data} = sourceToSort;
      const {sortOrder, keyToSort} = activeSort;
      if (
        sourceToSort.keyToSort === keyToSort &&
        sourceToSort.currentSortOrder === sortOrder){
        return;
      }

      let sorted = [] as Record<string, any>[];
      const typeOfValueToSort = typeof data[0][keyToSort];;

      //e.g sort list by name
      if (typeOfValueToSort=== "string"){
        sorted = data.sort((a,b)=> 
          //@ts-ignore
          sortOrder === 'DESC'?
            b[keyToSort]?.localeCompare(a[keyToSort]):
            a[keyToSort]?.localeCompare(b[keyToSort])
        );
      } else {
        sorted = sortOrder === 'DESC' ?
          version2(data, keyToSort):
          data.sort((a,b)=> a[keyToSort] - b[keyToSort]);
      }

      setResults({
        keyToSort,
        currentSortOrder: sortOrder,
        data: sorted as LeaderboardItemWithExtraProps[]
      });
      isSortRestored.current = true;
    },[ sourceToSort, setResults, version2]);

  const handleSortPressed = useCallback((item:SortButtonAttributes<LeaderboardItemWithExtraProps>) => () => {
    const {sortOrder, keyToSort} = item;
    const newSortOrders = sortButtonAttributes.reduce((acc, item)=> {
      if (item.keyToSort === keyToSort){
        acc.push({...item, 
          sortOrder: sortOrder === 'ASC'? 'DESC': 'ASC' ,
          isCurrentSort:true
        });
        return acc;
      }
      acc.push({...item, isCurrentSort:false});
      return acc;
    }, [] as SortButtonAttributes<Record<string,any>>[]);
    dispatch(setLeaderboardSortAttributes(newSortOrders));//rerender sort button row
    isSortRestored.current = false;
  },[sortButtonAttributes,  dispatch]);
  
  useEffect(()=> {
    if (isSortRestored.current) {return;}
    if (sortButtonAttributes){
      const activeSort = sortButtonAttributes.find(s=>s.isCurrentSort);
      activeSort && applySortToSearchResults(activeSort);
    }
  }, [sortButtonAttributes,  applySortToSearchResults]);

  return (
    <View style={styles.root}>
      {sortButtonAttributes.map(i=> (
        <Surface 
            key={i.id}
            mode={'flat'} 
            style={[styles.sortSurface, {flex: i.flex}]}>
          <Text>
            {i.label}
          </Text>
          <View style={{width:30}}>
            {i.sortable && (
            <IconButton 
                icon={i.sortOrder === 'ASC' ? 'menu-up': 'menu-down'}
                size={20}
                iconColor={i.isCurrentSort? colors.red_600 : colors.plainBlack}
                onPress={handleSortPressed(i)}
            />
            )}
          </View>
        </Surface>
        ))}
    </View>
  );
};