import { RootState } from "@src/reducers";

export const leaderboardSearchQuerySelector = (state: RootState) => state.leaderboardReducer.searchQuery;

export const leaderboardDisplayModeSelector = (state: RootState) => state.leaderboardReducer.mode;