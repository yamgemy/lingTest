import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getThemedStyles = (theme: MD3Theme)=> StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: theme.colors.background,
    paddingTop: 20
  },
  section:{
    marginHorizontal: 10
  },
  searchRow: {
    flexDirection:'row',
    height: 70,
    paddingBottom: 20,
    backgroundColor:theme.colors.background
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
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 20,
    backgroundColor: theme.colors.primary
  },
  searchButtonDisabled:{
    backgroundColor: theme.colors.surfaceDisabled
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