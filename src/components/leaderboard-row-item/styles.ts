import { colors } from "@src/constants";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const UseThemedStyles = (theme: MD3Theme, verticalIndex: number) => {
  const rowColor = useMemo(()=>{
    if (theme.dark){
      return verticalIndex%2 ===0 ? theme.colors.onSecondary: theme.colors.onPrimary;
    }
    return verticalIndex % 2 === 0 ? theme.colors.onSecondary: colors.light_green ;
  },[theme, verticalIndex]);

  const queryHitRowColor = useMemo(()=> {
    return theme.dark ? theme.colors.onTertiary: colors.red_500_lighter;
  }, [theme]);

  return StyleSheet.create({
    rowRoot: {
      flexDirection: 'row',
      minHeight: 50,
      marginVertical:0,
      padding:0,
      paddingVertical:0,
      marginTop:4,
      marginHorizontal: 4,
      backgroundColor: rowColor,
    },
    cell:{
      padding: 8,
      height: 80,
      width: 80,
      alignItems: 'flex-start',
      justifyContent: 'center',
      flex:1,
      backgroundColor:'transparent',
      borderRightColor: theme.colors.onSurface,
      borderRightWidth: 1,
      borderTopWidth:1,
      borderTopColor: theme.colors.surface
    },
    cellLastRight:{
      borderRightWidth: 0,
    },
    nameTextHitsQuery:{
      color:colors.red_800,
      fontWeight: '700'
    },
    lastRightCell: { 
      borderRightColor: theme.colors.onSurface,
      borderRightWidth: 0
    },
    lastBottomCell:{
      borderBottompWidth:1,
      borderBottomColor: theme.colors.surface
    },
    rowHitsQuery:{
      backgroundColor: queryHitRowColor
    }
  });};