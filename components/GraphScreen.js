import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import NavigationMenu from "./tools/NavigationMenu";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function GraphScreen({ navigation }) {
  const [list_dots, setlist_dots] = useState(null);
  const get_machine = () => {
    fetch("https://n6pl0q.deta.dev/get_dots_app/1", {
      method: "GET",
      headers: { "content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json_response) => {
          setlist_dots(json_response.data);
          return false;
        });
      } else {
        Alert.alert("fallo");
      }
    });
  };
  useEffect(() => {
    get_machine();
  }, []);
  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <LineChart
        data={{
          labels: list_dots?.list_2_dots ? list_dots?.list_2_dots : [0],
          datasets: [
            {
              data: list_dots?.list_2_data ? list_dots?.list_2_data : [0],
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      ></LineChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
