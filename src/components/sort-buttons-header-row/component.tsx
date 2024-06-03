import { setLeaderboardSortAttributes } from "@src/actions";
import { colors } from "@src/constants";
import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { IconButton, Surface, Text, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { getThemedStyles } from "./styles";
import { SortButtonAttributes, SortButtonsHeaderRowProps, SortOrder } from "./types";

// const getLocaleCompareFn = (a,b,keyToSort, order)=> {
//   return (a,b) => order === 'DESC' ?
//     b[keyToSort]?.localeCompare(a[keyToSort]) : a[keyToSort]?.localeCompare(b[keyToSort]);
// };

export const SortButtonsHeaderRow:FC<SortButtonsHeaderRowProps<Record<string, any>>> = ({
  sortButtonAttributes = [],
  sourceToSort,
  setResults,
  forecEntitiesSortedAlphabetically
}) => {
  const theme = useTheme();
  const styles = getThemedStyles(theme);
  const dispatch = useDispatch();
  const isSortRestored = useRef<boolean>(false);

  const keepEntityStringAttributeSorted 
  = useCallback((
    payload: Array<Record<string, any>>, 
    dominantKey: string, 
    domminantKeySortOrder: SortOrder) => {
    const {keyToSort, enabled} = forecEntitiesSortedAlphabetically;
    if (!enabled) {return;}
    const groupedByKeyToSort = payload.reduce((acc, item)=> {
      if (!acc[item[dominantKey]]){
        acc[item[dominantKey]] = [];
      }
      acc[item[dominantKey]].push(item);
      acc[item[dominantKey]].sort((a,b)=> a[keyToSort]?.localeCompare(b[keyToSort]));
      return acc;
    }, {});
    
    console.log('groupedByKeyToSort', groupedByKeyToSort);

    const entities = Object.values(groupedByKeyToSort);
    const deepSorted = entities.sort((a,b)=>  
      domminantKeySortOrder === 'DESC'? 
        b[dominantKey] - a[dominantKey]:
        a[dominantKey] - b[dominantKey]
    );
    const flattenedArr = [...deepSorted.flatMap(subArr => subArr)];
    console.log('deep sort result', flattenedArr);
    return flattenedArr;
  },[forecEntitiesSortedAlphabetically]);

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

      if (typeOfValueToSort=== "string"){
        sorted = data.sort((a,b)=> 
          sortOrder === 'DESC'? 
          //@ts-ignore
            b[keyToSort]?.localeCompare(a[keyToSort]) : a[keyToSort]?.localeCompare(b[keyToSort])
        );
        setResults({
          keyToSort,
          currentSortOrder: sortOrder,
          data: sorted as LeaderboardItemWithExtraProps[]
        });
        isSortRestored.current = true;
        return;
      };

      sorted = data.sort((a,b) =>
        sortOrder === 'DESC'?
        //@ts-ignore
          b[keyToSort] - a[keyToSort]: a[keyToSort] - b[keyToSort]
      );
      if (sortOrder === 'DESC'){
        const deepSorted = keepEntityStringAttributeSorted(sorted, 'bananas', sortOrder);
        if (deepSorted) {sorted = deepSorted;}
      }

      setResults({
        keyToSort,
        currentSortOrder: sortOrder,
        data: sorted as LeaderboardItemWithExtraProps[]
      });
      isSortRestored.current = true;
    },[ sourceToSort, setResults, keepEntityStringAttributeSorted]);

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