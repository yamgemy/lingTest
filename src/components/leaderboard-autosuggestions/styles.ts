import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  footer:{
    height: 300
  },
  title:{
    height: 30,
    fontSize: 20,
    fontWeight: '500'
  },
  listEmptyWrap:{
    flex:1,
    height:Dimensions.get('screen').height/2,
    justifyContent:'center',
    marginHorizontal: 30
  },
  listEmptyMessage:{
    textAlign:'center'
  }
});