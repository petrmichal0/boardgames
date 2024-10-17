import { View, Text, ScrollView, StyleSheet } from "react-native";
import { leaderboardData } from "../data";
import { colors } from "../constans/colors"; // Importujeme barvy

export default function Leaderboard() {
  const totalGamesCount = leaderboardData.reduce(
    (gameCount: { [key: string]: number }, player) => {
      Object.keys(player.games).forEach((game) => {
        if (!gameCount[game]) {
          gameCount[game] = 0;
        }
        gameCount[game] += player.games[game];
      });
      return gameCount;
    },
    {} as { [key: string]: number }
  );

  const sortedGames = Object.entries(totalGamesCount).sort(
    ([_, a], [__, b]) => (b as number) - (a as number)
  ) as [string, number][];

  const totalWins = leaderboardData.map((player) => {
    const totalWinsForPlayer = Object.values(player.games).reduce(
      (sum, wins) => sum + wins,
      0
    );
    return {
      playerName: player.playerName,
      totalWins: totalWinsForPlayer,
    };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionHeader}>Total Wins</Text>
      {totalWins.map((item) => (
        <View key={item.playerName}>
          <Text>
            {item.playerName}: {item.totalWins}
          </Text>
        </View>
      ))}

      <Text style={styles.sectionHeader}>Total Games Played</Text>
      {sortedGames.map(([gameName, count]) => (
        <View key={gameName}>
          <Text>
            {gameName}: {count}
          </Text>
        </View>
      ))}

      <Text style={styles.sectionHeader}>Wins by Game</Text>
      {Object.keys(leaderboardData[0].games).map((gameName) => (
        <View key={gameName} style={styles.gameSection}>
          <Text style={styles.boldText}>{gameName}</Text>
          {leaderboardData.map((player) => {
            if (player.games && player.games[gameName]) {
              return (
                <Text key={player.playerName}>
                  {player.playerName}: {player.games[gameName]} wins
                </Text>
              );
            }
            return null;
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.textPrimary, // Barva textu
  },
  gameSection: {
    marginBottom: 15,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.textPrimary,
  },
});
