import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors } from "../constans/colors"; // Importujeme barvy

type GameListProps = {
  games: Array<{
    id: string;
    date: string;
    gameName: string;
    winner: string;
  }>;
};

export default function GameList({ games }: GameListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            {item.date} - {item.gameName} - Winner: {item.winner}
          </Text>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background, // Použití barvy pozadí
  },
  contentContainer: {
    paddingVertical: 10,
  },
  text: {
    color: colors.textPrimary, // Použití barvy textu
  },
});
