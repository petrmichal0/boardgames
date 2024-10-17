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

export default function Player() {
  const [newPlayer, setNewPlayer] = useState("");

  const addPlayer = () => {
    if (newPlayer) {
      leaderboardData.push({
        playerName: newPlayer,
        totalWins: 0,
        games: {},
      });
      setNewPlayer(""); // Reset input field
    }
  };

  const removePlayer = (playerName: string) => {
    const index = leaderboardData.findIndex(
      (player) => player.playerName === playerName
    );
    if (index !== -1) {
      leaderboardData.splice(index, 1); // Odebereme hráče
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players</Text>

      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.playerName}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.playerName}</Text>
            <Button
              title="Remove Player"
              onPress={() => removePlayer(item.playerName)}
            />
          </View>
        )}
      />

      <TextInput
        value={newPlayer}
        onChangeText={setNewPlayer}
        placeholder="New player name"
        style={styles.input}
      />
      <Button title="Add Player" onPress={addPlayer} />
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
