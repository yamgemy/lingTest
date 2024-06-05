import { ForceEntitiesSortedAlphabeticallyOptions } from "@src/components/sort-buttons-header-row/types";

export const labels = {
  search_btn: 'Search'
};

export const keepNamesAlphabeticallySortedOptions = {
  keyToKeepAlphabetical: 'nameInPinyin',
  sortName: 'rank',
  enabled: true, 
} as ForceEntitiesSortedAlphabeticallyOptions<Record<string,any>>;

export const keywordToReturnAllEntities = '*';
