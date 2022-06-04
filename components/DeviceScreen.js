import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import NavigationMenu from "./tools/NavigationMenu";

export default function DeviceScreen({ navigation }) {
  const [name_device, setname_device] = useState("");
  const [secret_device, setsecret_device] = useState("");
  const [machine_id, setmachine_id] = useState(null);
  const [loading, setloading] = useState(false);

  const save_device = () => {
    setloading(true);
    fetch("https://n6pl0q.deta.dev/create_device/", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        name: name_device,
        secret: secret_device,
        machines_id: machine_id,
      }),
    }).then((response) => {
      setloading(false);
      if (response.status === 200) {
        Alert.alert("El registro fue guardado con exito");
        setname_device("");
        setsecret_device("");
        setmachine_id(null);
      } else {
        Alert.alert("El registro falló");
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <NavigationMenu></NavigationMenu>
      <Pressable
        style={styles.container_form}
        onPress={() => Keyboard.dismiss()}
      >
        <Text style={styles.tittle_form}>Dispositivo</Text>
        <View style={styles.row_form}>
          <Text style={styles.tittle_form}>Nombre:</Text>
          <TextInput
            style={styles.input_form}
            onChangeText={setname_device}
            value={name_device}
            placeholder="Nombre del dispositivo"
          ></TextInput>
        </View>
        <View style={styles.row_form}>
          <Text style={styles.tittle_form}>Secret:</Text>
          <TextInput
            style={styles.input_form}
            onChangeText={setsecret_device}
            value={secret_device}
            secureTextEntry={true}
            placeholder="Contraseña"
          ></TextInput>
        </View>
        <View style={styles.row_form}>
          <Text style={styles.tittle_form}>Id Maquina</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input_form}
            onChangeText={setmachine_id}
            value={machine_id}
            placeholder="Id Maquina"
          ></TextInput>
        </View>
        <Pressable style={styles.button_form} onPress={save_device}>
          {loading ? (
            <ActivityIndicator
              animating={true}
              size="large"
              style={{ opacit: 1 }}
              color="white"
            ></ActivityIndicator>
          ) : (
            <Text style={styles.tittle_button}>Guardar</Text>
          )}
        </Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container_form: {
    width: 300,
    height: "50%",
    backgroundColor: "gray",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  row_form: {
    width: "95%",
    height: 30,
    // backgroundColor: "red",
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tittle_form: {
    fontSize: 20,
    color: "white",
    width: 120,
  },
  input_form: {
    width: 150,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
  },
  button_form: {
    width: "80%",
    height: 50,
    backgroundColor: "black",
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  tittle_button: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});
