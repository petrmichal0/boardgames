import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { leaderboardData } from "../data";
import { colors } from "../constans/colors"; // Importujeme barvy

export default function Games() {
  const [newGame, setNewGame] = useState("");

  const addGame = () => {
    leaderboardData.forEach((player) => {
      player.games[newGame] = 0; // Přidáme hru s 0 výhrami
    });
    setNewGame(""); // Reset input field
  };

  const removeGame = (gameName: string) => {
    leaderboardData.forEach((player) => {
      delete player.games[gameName]; // Odebereme hru
    });
  };

  const allGames = Object.keys(leaderboardData[0]?.games || {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Games</Text>

      <FlatList
        data={allGames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
            <Button title="Remove Game" onPress={() => removeGame(item)} />
          </View>
        )}
      />

      <TextInput
        value={newGame}
        onChangeText={setNewGame}
        placeholder="New game name"
        style={styles.input}
      />
      <Button title="Add Game" onPress={addGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background, // Barva pozadí
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary, // Barva textu
  },
  item: {
    marginVertical: 5,
    color: colors.textPrimary, // Barva textu
  },
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    marginVertical: 10,
    marginTop: 40,
  },
});
