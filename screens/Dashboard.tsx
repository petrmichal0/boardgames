import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GameList from "../components/GameList";
import Leaderboard from "../components/Leaderboard";
import { colors } from "../constans/colors"; // Importujeme barvy

const games = [
  { id: "1", date: "2024-10-16", gameName: "Catan", winner: "Peter" },
  { id: "2", date: "2024-10-17", gameName: "Carcassonne", winner: "Anna" },
];

export default function Dashboard() {
  return (
    <View style={styles.container}>
      {/* Sekce Leaderboard */}
      <View style={styles.section}>
        <Text style={styles.title}>Leaderboard</Text>
        <Leaderboard />
      </View>

      {/* Sekce Last Games */}
      <View style={styles.section}>
        <Text style={styles.title}>Last Games</Text>
        <GameList games={games} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Barva pozadí
  },
  section: {
    flex: 1, // Polovina obrazovky
    padding: 10, // Okraje mezi sekcemi
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10, // Mezera pod nadpisem
    color: colors.textPrimary, // Barva textu
  },
});
