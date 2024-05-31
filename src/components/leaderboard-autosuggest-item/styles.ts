import { colors } from "@src/constants";
import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getThemedStyles = (theme: MD3Theme) => StyleSheet.create({
  suggestionRow:{
    minHeight: 30,
    justifyContent:'center',
    marginBottom: 10,
    marginHorizontal:3,
    paddingLeft:10
  },
  suggestionText:{
    fontSize: 16,
    color: theme.dark? colors.grey_100: colors.grey_900
  },
  highlight:{
    backgroundColor:  theme.dark? colors.red_700: colors.red_500
  },
});