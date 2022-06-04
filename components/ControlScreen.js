import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Animated,
} from "react-native";
import NavigationMenu from "./tools/NavigationMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
var mqtt = require("@taoqf/react-native-mqtt");

var options = {
  protocol: "mqtts",
  clientId: "Front",
  username: "daniel-eia",
  password: "PfB28Q6QswPRw9iY",
};

export default function ControlScreen({ navigation }) {
  const [press, setpress] = useState(false);
  const [message, setmessage] = useState("");
  const [buttonLedAnimation, setbuttonLedAnimation] = useState(
    new Animated.Value(-22)
  );
  const [ledStatus, setledStatus] = useState("ON");

  const control_led = () => {
    setpress(!press);
    StartButtonAnimation(press ? 0 : 1);
    var client = mqtt.connect("mqtt://daniel-eia.cloud.shiftr.io", options);
    client.on("connect", function () {
      client.subscribe("led", function (err) {
        if (!err) {
          if (press) {
            client.publish("led", "OFF", { qos: 0, retain: true });
            setmessage("OFF");
            setledStatus("OFF");
            // StartButtonAnimation(0);
          } else {
            client.publish("led", "ON", { qos: 0, retain: true });
            setmessage("ON");
            setledStatus("ON");
            // StartButtonAnimation(1);
          }
        }
      });
    });
    client.on("message", function (topic, message) {
      //setmessage(message.toString());
      //console.log(message.toString());
      client.end();
    });
  };

  const StartButtonAnimation = (value) => {
    //console.log("ss", press);
    Animated.timing(buttonLedAnimation, {
      toValue: value === 1 ? -22 : 68,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const circleAnimated = {
    circle_button: { transform: [{ translateX: buttonLedAnimation }] },
  };

  const StartLedAnimation = (value) => {
    //console.log("ss", press);
    Animated.timing(buttonLedAnimation, {
      toValue: value === 1 ? -22 : 68,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const ledAnimated = {
    circle_button: { transform: [{ translateX: buttonLedAnimation }] },
  };

  useEffect(() => {
    //StartButtonAnimation();
    var client = mqtt.connect("mqtt://daniel-eia.cloud.shiftr.io", options);
    client.subscribe("led");
    var note;
    client.on("message", function (topic, message) {
      note = message.toString();
      if (note == "ON") {
        StartButtonAnimation(1);
        setpress(true);
        setmessage("ON");
      } else {
        StartButtonAnimation(0);
        setpress(false);
        setmessage("OFF");
      }
      client.end();
      // StartButtonAnimation();
    });
  }, []);

  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <View style={styles.container_buttons}>
        <Text style={{ fontSize: 30, color: "black" }}>LED {message}</Text>
        {ledStatus === "ON" ? (
          <View style={styles.display_led_on}></View>
        ) : (
          <View style={styles.display_led_off}></View>
        )}
        {/* <View style={styles.display_led_on}></View> */}
        <Pressable style={styles.button} onPress={control_led}>
          <Animated.View
            style={[styles.circle_button, circleAnimated.circle_button]}
          ></Animated.View>
          <MaterialCommunityIcons
            name="lightbulb-off"
            size={50}
            color="black"
          />
          <MaterialCommunityIcons name="lightbulb-on" size={50} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 80,
    backgroundColor: "white",
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container_buttons: {
    width: 300,
    height: 600,
    backgroundColor: "rgb(231, 231, 231)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 60,
  },
  text_machines: {
    fontSize: 25,
    color: "white",
  },
  circle_button: {
    position: "absolute",
    backgroundColor: "green",
    width: 100,
    height: 70,
    borderRadius: 35,
    zIndex: 2,
    // transform: [{ translateX: -22 }],
  },
  display_led_on: {
    width: 60,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "gray",
    marginBottom: 20,
    marginTop: 20,
  },
  display_led_off: {
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "gray",
    marginBottom: 20,
    marginTop: 20,
  },
  // circle_left: {
  //   position: "absolute",
  //   backgroundColor: "black",
  //   width: 100,
  //   height: 70,
  //   borderRadius: 35,
  //   zIndex: 2,
  //   transform: [{ translateX: -22 }],
  // },
  // circle_right: {
  //   position: "absolute",
  //   backgroundColor: "black",
  //   width: 100,
  //   height: 70,
  //   borderRadius: 35,
  //   zIndex: 2,
  //   transform: [{ translateX: 68 }],
  // },
});
