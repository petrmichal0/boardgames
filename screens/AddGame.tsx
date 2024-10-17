import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { leaderboardData } from "../data";
import { colors } from "../constans/colors"; // Importujeme barvy

export default function AddGame() {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [showGameList, setShowGameList] = useState(false);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [dateError, setDateError] = useState("");

  const games = Object.keys(leaderboardData[0]?.games || {});

  const selectGame = (gameName: string) => {
    setSelectedGame(gameName);
    setShowGameList(false);
  };

  const removeGame = () => {
    setSelectedGame("");
  };

  const addPlayer = (playerName: string) => {
    if (!selectedPlayers.includes(playerName)) {
      setSelectedPlayers((prevPlayers) => [...prevPlayers, playerName]);
    }
  };
  const removePlayer = (playerName: string) => {
    setSelectedPlayers(
      selectedPlayers.filter((player) => player !== playerName)
    );
  };

  const validateDate = (inputDate: string) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(inputDate)) {
      setDateError("Datum musí být ve formátu YYYY-MM-DD.");
    } else {
      setDateError("");
    }
    setDate(inputDate);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Název hry:</Text>
      <TouchableOpacity onPress={() => setShowGameList(!showGameList)}>
        <Text style={styles.addButton}>+</Text>
      </TouchableOpacity>
      {showGameList && (
        <FlatList
          data={games}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectGame(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {selectedGame ? (
        <View style={styles.selectedGame}>
          <Text>{selectedGame}</Text>
          <Button title="X" onPress={removeGame} />
        </View>
      ) : null}

      <Text style={styles.label}>Jména hráčů:</Text>
      <TouchableOpacity onPress={() => setShowPlayerList(!showPlayerList)}>
        <Text style={styles.addButton}>+</Text>
      </TouchableOpacity>
      {showPlayerList && (
        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item.playerName}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => addPlayer(item.playerName)}>
              <Text>{item.playerName}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <FlatList
        data={selectedPlayers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.selectedPlayer}>
            <Text>{item}</Text>
            <Button title="X" onPress={() => removePlayer(item)} />
          </View>
        )}
      />

      <Text style={styles.label}>Datum (YYYY-MM-DD):</Text>
      <TextInput
        value={date}
        onChangeText={validateDate}
        placeholder="YYYY-MM-DD"
        style={styles.textInput}
      />
      {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

      <Button
        title="Add Game"
        onPress={() => console.log({ selectedGame, selectedPlayers, date })}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  label: {
    color: colors.textPrimary,
  },
  addButton: {
    color: colors.primary,
  },
  selectedGame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  selectedPlayer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  textInput: {
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 40,
  },
  errorText: {
    color: colors.error,
  },
});
