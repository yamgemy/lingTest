import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import React, { FC, useCallback, useMemo } from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import { ScalingTouchable } from "../scaling-touchable";
import { SortButtonAttributes } from "../sort-buttons-header-row/types";
import { UseThemedStyles } from "./styles";

export type LeaderboardRowItemProps = {
  entity: LeaderboardItemWithExtraProps
  isVerticalLast: boolean,
  verticalIndex: number,
  searchQuery?: Maybe<string>
  sortOrders: SortButtonAttributes<LeaderboardItemWithExtraProps>[]
}

const Component :FC<LeaderboardRowItemProps> = ({
  entity, 
  isVerticalLast, 
  verticalIndex,
  searchQuery,
  sortOrders
}) => {
  const theme = useTheme();
  const styles = UseThemedStyles(theme, verticalIndex);
  const isEntityTargetQuery = useMemo(
    ()=> searchQuery && entity.name.toLowerCase().includes(searchQuery), 
    [searchQuery, entity]
  );

  const getCellFlexAllocation = useCallback((key: keyof LeaderboardItemWithExtraProps)=> {
    const targetSortAttribute = sortOrders.find(s=> s.keyToSort === key);
    return {flex: targetSortAttribute?.flex ?? 1};
  },[sortOrders]);

  const handleRowPress = useCallback(() => {
    //stub
  },[]);

  return (
    <ScalingTouchable onPress={handleRowPress} reducedScale={0.97}>
      {sortOrders && (
      <Surface 
          style={[
            styles.rowRoot, 
            isVerticalLast && styles.lastBottomCell,
            isEntityTargetQuery && styles.rowHitsQuery,
        ]} 
          mode="elevated" 
          elevation={2}>
        <Surface 
            mode={'flat'} 
            style={[styles.cell, getCellFlexAllocation('nameInPinyin')]} 
        >
          <Text style={isEntityTargetQuery? styles.nameTextHitsQuery: {}}>
            {entity.name ?? entity.nameInPinyin}
          </Text>
        </Surface>
        {entity.rank && (
        <Surface 
            mode={'flat'}
            style={[styles.cell, getCellFlexAllocation('rank')]} 
            >
          <Text>{entity.rank.toString()}</Text>
        </Surface>
      )}
        <Surface 
            mode={'flat'}
            style={[
              styles.cell, 
              styles.cellLastRight, 
              getCellFlexAllocation('bananas')
            ]} 
        >
          <Text>{entity.bananas}</Text>
        </Surface>
      </Surface>
      )}
    </ScalingTouchable>
  );
};

export const LeaderboardRowItem = React.memo(Component);