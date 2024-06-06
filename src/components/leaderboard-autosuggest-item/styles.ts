import { colors } from "@src/constants";
import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getThemedStyles = (theme: MD3Theme) => StyleSheet.create({
  suggestionRow:{
    minHeight: 40,
    justifyContent:'center',
    marginBottom: 2,
    marginHorizontal:3,
  },
  suggestionText:{
    fontSize: 16,
    marginLeft: 6,
    color: theme.dark? colors.grey_100: colors.grey_900
  },
  suggestionTextWrap:{
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  highlight:{
    backgroundColor:  theme.dark? colors.red_700: colors.red_500
  },
  suggestionTextLeft:{
    flexDirection:'row',
    alignItems:'center'
  }
});