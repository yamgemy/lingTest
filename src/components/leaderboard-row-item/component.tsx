import { LeaderboardItemExtraProps, LeaderboardItemProps } from "@src/mockdata/types";
import React, { FC, useMemo } from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import { ScalingTouchable } from "../scaling-touchable";
import { UseThemedStyles } from "./styles";

export type LeaderboardRowItemProps = {
  entity: LeaderboardItemProps & LeaderboardItemExtraProps
  isLast: boolean,
  index: number,
  searchQuery?: Maybe<string>
}

export const LeaderboardRowItem :FC<LeaderboardRowItemProps> = ({entity, isLast, index,searchQuery}) => {
  const theme = useTheme();
  const styles = UseThemedStyles(theme, index);
  const isEntityTargetQuery = useMemo(
    ()=> searchQuery && entity.name.toLowerCase().includes(searchQuery), 
    [searchQuery, entity]
  );

  return (
    <ScalingTouchable onPress={()=>{}}>
      <Surface 
          style={[
            styles.rowRoot, 
            isLast && styles.lastBottomCell,
            isEntityTargetQuery && styles.rowHitsQuery
        ]} 
          mode="elevated" 
          elevation={2}>
        <Surface style={styles.cell} mode={'flat'}>
          <Text style={isEntityTargetQuery? styles.nameTextHitsQuery: {}}>
            {entity.name ?? entity.nameInPinyin}
          </Text>
        </Surface>
        {entity.rank && (
        <Surface style={styles.cell} mode={'flat'}>
          <Text>{entity.rank.toString()}</Text>
        </Surface>
      )}
        <Surface style={[styles.cell, styles.lastRightCell]} mode={'flat'}>
          <Text>{entity.bananas}</Text>
        </Surface>
      </Surface>
    </ScalingTouchable>
  );
};