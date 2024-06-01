import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getThemedStyles = (theme: MD3Theme) => StyleSheet.create({
  root:{
    flexDirection:'row',
    backgroundColor:theme.colors.background,
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  },
  sortSurface:{
    height: 50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }

});