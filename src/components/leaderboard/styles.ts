import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  emptyListContainer: {
    flex:1,
    height:Dimensions.get('screen').height/2,
    justifyContent:'center',
    marginHorizontal: 30
  },
  listEmptyMessage:{
    textAlign:'center'
  },
  listFooter:{
    height: 300
  }
});