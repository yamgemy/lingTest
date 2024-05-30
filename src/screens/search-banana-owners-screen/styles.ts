import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getThemedStyles = (theme: MD3Theme)=> StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: theme.colors.background
  }
});