export type LeaderboardItemProps = {
  bananas : number,
  lastDayPlayed : string,
  longestStreak : number,
  name : string,
  stars : number,
  subscribed : boolean,
  uid : string,
}

export type LeaderboardItemWithExtraProps = LeaderboardItemProps &{
  rank?: number;
  nameInPinyin: string;
}