import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./screens/Dashboard";
import AddGame from "./screens/AddGame";
import Player from "./screens/Player";
import Games from "./screens/Games";
import Icon from "react-native-vector-icons/Ionicons"; // Importujeme Ionicons

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";

            if (route.name === "Dashboard") {
              iconName = focused ? "home" : "home-outline"; // Ikona pro Dashboard
            } else if (route.name === "Add Game") {
              iconName = focused ? "add-circle" : "add-circle-outline"; // Ikona pro Add Game
            } else if (route.name === "Players") {
              iconName = focused ? "people" : "people-outline"; // Ikona pro Players
            } else if (route.name === "Games") {
              iconName = focused
                ? "game-controller"
                : "game-controller-outline"; // Ikona pro Games
            }

            // Vrátíme ikonu s příslušnými barvami a velikostí
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#000080", // Barva při aktivaci
          tabBarInactiveTintColor: "gray", // Barva při neaktivitě
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Add Game" component={AddGame} />
        <Tab.Screen name="Players" component={Player} />
        <Tab.Screen name="Games" component={Games} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
