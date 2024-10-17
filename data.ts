type leaderboardDataProps = {
  playerName: string;
  totalWins: number;
  games: {
    [key: string]: number;
  };
};

export const leaderboardData: leaderboardDataProps[] = [
  {
    playerName: "Peter",
    totalWins: 5,
    games: {
      Catan: 3,
      Carcassonne: 2,
    },
  },
  {
    playerName: "Anna",
    totalWins: 3,
    games: {
      Catan: 1,
      Carcassonne: 2,
    },
  },
  {
    playerName: "John",
    totalWins: 2,
    games: {
      Catan: 2,
    },
  },
];
