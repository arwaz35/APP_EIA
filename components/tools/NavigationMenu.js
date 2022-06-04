import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  Foundation,
} from "@expo/vector-icons";

export default function NavigationMenu() {
  const navigation = useContext(NavigationContext);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("home")}>
        <View style={styles.icon_container}>
          <Entypo
            style={styles.icon_style}
            name="home"
            size={24}
            color="white"
          />
          <Text style={styles.icon_text}>HOME</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("machine")}>
        <View style={styles.icon_container}>
          <MaterialCommunityIcons
            style={styles.icon_style}
            name="factory"
            size={24}
            color="white"
          />
          <Text style={styles.icon_text}>MACHINES</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("device")}>
        <View style={styles.icon_container}>
          <AntDesign
            style={styles.icon_style}
            name="pluscircle"
            size={24}
            color="white"
          />
          <Text style={styles.icon_text}>DEVICES</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("graph")}>
        <View style={styles.icon_container}>
          <Foundation
            style={styles.icon_style}
            name="graph-bar"
            size={24}
            color="white"
          />
          <Text style={styles.icon_text}>GRAPHS</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("control")}>
        <View style={styles.icon_container}>
          <Ionicons
            name="game-controller-outline"
            style={styles.icon_style}
            size={24}
            color="white"
          />
          <Text style={styles.icon_text}>CONTROL</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    height: 120,
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  icon_style: {
    marginTop: 35,
  },
  icon_text: {
    color: "white",
    fontSize: 12,
  },
  icon_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
