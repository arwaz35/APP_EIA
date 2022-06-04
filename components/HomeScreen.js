import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import NavigationMenu from "./tools/NavigationMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
var mqtt = require("@taoqf/react-native-mqtt");

const screenWidth = Dimensions.get("window").width;

var options = {
  protocol: "mqtts",
  clientId: "Front",
  username: "daniel-eia",
  password: "PfB28Q6QswPRw9iY",
};
var cont = 0;
export default function HomeScreen({ navigation }) {
  const [current_val, setcurrent] = useState("");
  const [voltage_val, setvoltage_val] = useState("");

  // Real time graph
  const [current_graph, setcurrent_graph] = useState([0]);
  const [label, setlabel] = useState([0]);

  let currentref = useRef("");
  currentref.current = current_val;

  useEffect(() => {
    //console.log("data", data_send);
    var client = mqtt.connect("mqtt://daniel-eia.cloud.shiftr.io", options);
    client.subscribe("compresor1/Corriente/#");
    var note;
    client.on("message", function (topic, message) {
      note = message.toString();
      if (topic === "compresor1/Corriente/Fase") {
        console.log("Fase", note);
        cont = cont + 1;
        setlabel((label) => [...label, cont]);
        setcurrent_graph((current_graph) => [...current_graph, note]);
        setcurrent(note);
      } else if (topic === "compresor1/Corriente/Fase2") {
        setvoltage_val(note);
        console.log("Fase2", note);
      }
      // if (currentref.current === "") {
      //   client.end();
      // }
    });
  }, []);

  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <View style={styles.card_info}>
        <Text style={styles.text_info}>Corriente</Text>
        <View style={styles.line_separartor}></View>
        <View style={styles.raw_card}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={60}
            color="white"
          />
          <Text style={styles.text_val}>{current_val}</Text>
        </View>
      </View>
      <View style={styles.card_info}>
        <Text style={styles.text_info}>Voltaje</Text>
        <View style={styles.line_separartor}></View>
        <View style={styles.raw_card}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={60}
            color="white"
          />
          <Text style={styles.text_val}>{voltage_val}</Text>
        </View>
      </View>
      <LineChart
        data={{
          // labels: list_dots?.list_2_dots ? list_dots?.list_2_dots : [0],
          labels: label,
          datasets: [
            {
              data: current_graph,
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={280}
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
            r: "3",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          //marginVertical: 50,
          borderRadius: 20,
          marginTop: 50,
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card_info: {
    width: "80%",
    height: 120,
    backgroundColor: "rgb(208, 206, 201)",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    marginTop: 30,
  },
  text_val: {
    fontSize: 60,
    color: "white",
  },
  text_info: {
    fontSize: 30,
    color: "white",
  },
  raw_card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 4,
    //marginLeft: 20,
  },
  line_separartor: {
    width: "90%",
    height: 2,
    backgroundColor: "white",
  },
});
