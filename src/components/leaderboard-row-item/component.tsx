import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import React, { FC, useCallback, useMemo } from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import { ScalingTouchable } from "../scaling-touchable";
import { SortButtonAttributes } from "../sort-buttons-header-row/types";
import { UseThemedStyles } from "./styles";

export type LeaderboardRowItemProps = {
  entity: LeaderboardItemWithExtraProps
  isLast: boolean,
  index: number,
  searchQuery?: Maybe<string>
  sortOrders: SortButtonAttributes<LeaderboardItemWithExtraProps>[]
}

export const LeaderboardRowItem :FC<LeaderboardRowItemProps> = ({
  entity, 
  isLast, 
  index,
  searchQuery,
  sortOrders
}) => {
  const theme = useTheme();
  const styles = UseThemedStyles(theme, index);
  const isEntityTargetQuery = useMemo(
    ()=> searchQuery && entity.name.toLowerCase().includes(searchQuery), 
    [searchQuery, entity]
  );

  const getCellFlexAllocation = useCallback((key:string)=> {
    const targetSortAttribute = sortOrders.find(s=> s.keyToSort === key);
    return {flex: targetSortAttribute?.flex ?? 1};
  },[sortOrders]);

  return (
    <ScalingTouchable onPress={()=>{}}>
      {sortOrders && (
      <Surface 
          style={[
            styles.rowRoot, 
            isLast && styles.lastBottomCell,
            isEntityTargetQuery && styles.rowHitsQuery,
        ]} 
          mode="elevated" 
          elevation={2}>
        <Surface style={[styles.cell, getCellFlexAllocation('nameInPinyin')]} mode={'flat'}>
          <Text style={isEntityTargetQuery? styles.nameTextHitsQuery: {}}>
            {entity.name ?? entity.nameInPinyin}
          </Text>
        </Surface>
        {entity.rank && (
        <Surface style={[styles.cell, getCellFlexAllocation('rank')]} mode={'flat'}>
          <Text>{entity.rank.toString()}</Text>
        </Surface>
      )}
        <Surface style={[styles.cell, styles.cellLastRight, getCellFlexAllocation('bananas')]} mode={'flat'}>
          <Text>{entity.bananas}</Text>
        </Surface>
      </Surface>
      )}
    </ScalingTouchable>
  );
};