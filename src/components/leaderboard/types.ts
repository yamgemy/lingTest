import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import { SortOrder } from "../sort-buttons-header-row/types";

export type LeaderboardProps = {
  source: Record<string, Record<string, any>>
  searchQueryToHit?: Maybe<string>
  searchQueryDynamic: Maybe<string>
  onSuggestionSelected: (selection:string)=> void
}
  
export type SortedResults = {
  keyToSort: keyof LeaderboardItemWithExtraProps,
  currentSortOrder: SortOrder,
  data: LeaderboardItemWithExtraProps[]
}
