import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getThemedStyles = (theme: MD3Theme)=> StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: theme.colors.background
  },
  searchRow: {
    flexDirection:'row',
    height: 50,

  },
  searchInputContainer:{
    flex:4
  },
  searchButtonContainer:{
    flex:1,
    justifyContent:'center'
  },
  searchButton:{
    height: 50,
  },
  searchButtonContent:{
    height: 50,
  },
  searchButtonLabel:{
    padding:0,
    marginHorizontal: 0 
  },
  searchComponent:{
    height: 50,
  },
  searchInput:{
    height: 50,
    marginVertical: 0,
    paddingVertical:0,
    minHeight: 0
  }
});