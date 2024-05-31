export type LeaderboardItemProps = {
  bananas : number,
  lastDayPlayed : string,
  longestStreak : number,
  name : string,
  stars : number,
  subscribed : boolean,
  uid : string,
  rank?: number
}

export type LeaderboardItemExtraProps = {
  rank?: number;
  nameInPinyin?: string;
}