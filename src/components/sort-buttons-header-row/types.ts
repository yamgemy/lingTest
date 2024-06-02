import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import { SortedResults } from "../leaderboard/types";

export type SortOrder = 'DESC' | 'ASC' | null

export type SortButtonAttributes = {
  id: string,
  label: string,
  flex: number, //horizontal space taken up by each sort button in a row
  keyToSort: keyof LeaderboardItemWithExtraProps, //eg. refers to key in an entity in the leaderboard
  sortOrder: SortOrder,
  sortable: boolean //whether the button sort is enabled,
  isCurrentSort: boolean
}
export type SortButtonsHeaderRowProps = {
  sortButtonAttributes: Array<SortButtonAttributes>
  sourceToSort: SortedResults
  setResults: (sortedResults: SortedResults)=> void
}