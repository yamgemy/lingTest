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

  //when rank is Descending, i.e. largest number rank top -> lowest bottom
  const keepAlphabeticalWhenSortDesc = useCallback((payload: Record<string, any>[], keyToSort: string) => {

    const {keyToKeepAlphabetical, enabled, sortName} = forceAlphabeticalOptions;
    const activeSortButton = sortButtonAttributes.find(button=> button.isCurrentSort);

    if (enabled && activeSortButton?.keyToSort === sortName){
      const result = payload
        .sort((a,b)=> {
          const desc_number = b[keyToSort] - a[keyToSort];
          const asc_string =  a[keyToKeepAlphabetical].localeCompare(b[keyToKeepAlphabetical]);
          return desc_number || asc_string;
        }); //asc names
      return result;
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
          //data.sort((a,b)=> b[keyToSort] - a[keyToSort]):
          keepAlphabeticalWhenSortDesc(data, keyToSort):
          data.sort((a,b)=> a[keyToSort] - b[keyToSort]);
      }

      setResults({
        keyToSort,
        currentSortOrder: sortOrder,
        data: sorted as LeaderboardItemWithExtraProps[]
      });
      isSortRestored.current = true;
    },[ sourceToSort, setResults, keepAlphabeticalWhenSortDesc]);

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
          <View style={styles.iconButtonWrap}>
            {i.sortable && (
            <IconButton 
                icon={i.sortOrder === 'ASC' ? 'menu-up': 'menu-down'}
                size={25}
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