import { setLeaderboardSortAttributes } from "@src/actions";
import { colors } from "@src/constants";
import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { IconButton, Surface, Text, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { getThemedStyles } from "./styles";
import { SortButtonAttributes, SortButtonsHeaderRowProps } from "./types";

export const SortButtonsHeaderRow:FC<SortButtonsHeaderRowProps> = ({
  sortButtonAttributes = [],
  sourceToSort,
  setResults,
}) => {
  const theme = useTheme();
  const styles = getThemedStyles(theme);
  const dispatch = useDispatch();
  const isSortRestored = useRef<boolean>(false);

  const applySortToSearchResults = useCallback((activeSort: SortButtonAttributes) => {
    if (!sourceToSort || !sourceToSort.data[0] || !activeSort) {return;}
    const {data} = sourceToSort;
    const {sortOrder, keyToSort} = activeSort;
    if (
      sourceToSort.keyToSort === keyToSort &&
      sourceToSort.currentSortOrder === sortOrder){
      return;
    }

    let sorted = [] as LeaderboardItemWithExtraProps[];
    const typeOfValueToSort = typeof data[0][keyToSort];;

    if (typeOfValueToSort=== "string"){
      sorted = data.sort((a,b)=> 
        sortOrder === 'DESC'? 
        //@ts-ignore
          b[keyToSort]?.localeCompare(a[keyToSort]) : a[keyToSort]?.localeCompare(b[keyToSort])
      )as LeaderboardItemWithExtraProps[];
    }

    sorted = data.sort((a,b) =>
      sortOrder === 'DESC'?
      //@ts-ignore
        b[keyToSort] - a[keyToSort]: a[keyToSort] - b[keyToSort]
    ) as LeaderboardItemWithExtraProps[];

    setResults({
      keyToSort,
      currentSortOrder: sortOrder,
      data: sorted
    });
    isSortRestored.current = true;
  },[ sourceToSort, setResults]);

  const handleSortPressed = useCallback((item:SortButtonAttributes) => () => {
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
    }, [] as SortButtonAttributes[]);
    dispatch(setLeaderboardSortAttributes(newSortOrders));//rerender sort button row
    isSortRestored.current = false;
  },[sortButtonAttributes,  dispatch]);
  
  useEffect(()=> {
    if (isSortRestored.current) {return;}
    if (sortButtonAttributes){
      const activeSort = sortButtonAttributes.find(s=>s.isCurrentSort);
      if (activeSort) {
        applySortToSearchResults(activeSort);
      }
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