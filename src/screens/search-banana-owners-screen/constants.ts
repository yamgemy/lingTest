import { ForceEntitiesSortedAlphabeticallyOptions } from "@src/components/sort-buttons-header-row/types";

export const labels = {
  search_btn: 'Search'
};

export const keepNamesAlphabeticallySortedOptions = {
  keyToKeepAlphabetical: 'nameInPinyin',
  sortName: 'rank',
  // dominantKey not 'rank' because 'rank' is unique in our case; 'banans' group up entities with diff names
  dominantKey: 'bananas',
  enabled: true, 
} as ForceEntitiesSortedAlphabeticallyOptions<Record<string,any>>;

export const keywordToReturnAllEntities = '*';
