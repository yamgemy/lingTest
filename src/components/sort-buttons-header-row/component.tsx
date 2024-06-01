import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import { IconButton, Surface, Text, useTheme } from "react-native-paper";
import { getThemedStyles } from "./styles";

export type SortOrder = 'DESC' | 'ASC' | null

export type SortButtonAttributes = {
  id: string,
  label: string,
  flex: number, //horizontal space taken up by each sort button in a row
  keyToSort: string, //eg. refers to key in an entity in the leaderboard
  sortOrder: SortOrder,
  sortable: boolean //whether the button sort is enabled
}
export type SortButtonsHeaderRowProps = {
  allocations: Array<SortButtonAttributes>
  sourceToSort: Array<Record<string,any>>
  setResults: React.Dispatch<React.SetStateAction<LeaderboardItemWithExtraProps[]>>
  setSortOrders: React.Dispatch<React.SetStateAction<SortButtonAttributes[]>>
}
export const SortButtonsHeaderRow:FC<SortButtonsHeaderRowProps> = ({
  allocations = [],
  sourceToSort,
  setResults,
  setSortOrders
}) => {
  const theme = useTheme();
  const styles = getThemedStyles(theme);

  const handleSortPressed = useCallback((item:SortButtonAttributes) => ()=> {
    const {sortOrder, keyToSort} = item;

    const newSortOrders = allocations.reduce((acc, item)=> {
      if (item.keyToSort === keyToSort){
        acc.push({...item, sortOrder: item.sortOrder === 'ASC'? 'DESC': 'ASC' });
        return acc;
      }
      else {
        acc.push(item);
      }
      return acc;
    }, [] as SortButtonAttributes[]);
    setSortOrders(newSortOrders);
    let sorted = [] as LeaderboardItemWithExtraProps[];
    if (typeof sourceToSort[0][keyToSort] === "string"){
      sorted = sourceToSort.sort((a,b)=> {
        if (sortOrder === 'ASC'){
          return b[keyToSort].localeCompare(a[keyToSort]);
        }
        if (sortOrder === 'DESC') {
          return a[keyToSort].localeCompare(b[keyToSort]);
        }
      })as LeaderboardItemWithExtraProps[];
    }

    if (typeof sourceToSort[0][keyToSort] === "number"){
      sorted = sourceToSort.sort((a,b) =>{
        if (sortOrder === 'ASC'){
          return b[keyToSort] - a[keyToSort]; //reverse from 'ASC'
        }
        if (sortOrder === 'DESC') {
          return a[keyToSort] - b[keyToSort]; //revere from 'DESC'
        }
        return 0;
      }) as LeaderboardItemWithExtraProps[];
    }

    setResults(sorted);

  },[allocations, setResults, setSortOrders, sourceToSort]);

  return (
    <View style={styles.root}>
      {allocations.map(i=> (
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
                onPress={handleSortPressed(i)}
            />
            )}
          </View>
        </Surface>
        ))}
    </View>
  );

};