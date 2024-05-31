import { RootState } from "@src/reducers";

export const leaderboardSearchQuerySelector = (state: RootState) => state.leaderboardReducer.searchQuery;
