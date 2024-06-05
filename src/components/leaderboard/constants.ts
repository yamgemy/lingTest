import { LeaderboardItemWithExtraProps } from "@src/mockdata/types";
import {
  SortButtonAttributes
} from "../sort-buttons-header-row/types";

export const labels = {
  noResults: 'This user name does not exist! Please specify an existing user name!',
  beforeQuery: 'Enter user name and hit the Search button to begin, or enter * to view all.',
  suggestions_title:'Suggestions:'
};

export const defaultSortOrders = [
  {
    id: 'A',
    label: 'Name',
    keyToSort: 'nameInPinyin', //not name because some names are in chinese
    flex: 2.5,
    sortOrder: 'ASC',
    sortable: true,
    isCurrentSort: false
  },
  {
    id: 'B',
    label: 'Rank',
    keyToSort: 'rank',
    flex:1,
    sortOrder: 'ASC',
    sortable: true,
    isCurrentSort: true
  },
  {
    id: 'C',
    label: 'Bananas',
    keyToSort: 'bananas',
    flex:1,
    sortOrder: 'DESC',
    sortable: false,
    isCurrentSort: false
  }
] as SortButtonAttributes<LeaderboardItemWithExtraProps | Record<string,any>>[];
