import { SortedResults } from "../leaderboard/types";

export type SortOrder = 'DESC' | 'ASC' | null

export type SortButtonAttributes<EntityType> = {
  id: string,
  label: string,
  flex: number, //horizontal space taken up by each sort button in a row
  keyToSort: keyof EntityType, //eg. refers to key in an entity in the leaderboard
  sortOrder: SortOrder,
  sortable: boolean //whether the button sort is enabled,
  isCurrentSort: boolean
}

export type ForceEntitiesSortedAlphabeticallyOptions = {
  keyToSort: string,
  enabled: boolean
}

export type SortButtonsHeaderRowProps<EntityType> = {
  sortButtonAttributes: Array<SortButtonAttributes<EntityType>>
  sourceToSort: SortedResults<EntityType>
  setResults: (sortedResults: SortedResults<EntityType>)=> void
  forecEntitiesSortedAlphabetically: ForceEntitiesSortedAlphabeticallyOptions
}