import { Dimensions, StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getThemedStyles = (theme: MD3Theme)=> StyleSheet.create({
  footer:{
    height: 300
  },
  title:{
    height: 30,
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    backgroundColor: theme.colors.background
  },
  listEmptyWrap:{
    flex:1,
    height:Dimensions.get('screen').height/3,
    justifyContent:'center',
    marginHorizontal: 30
  },
  listEmptyMessage:{
    textAlign:'center'
  }
});