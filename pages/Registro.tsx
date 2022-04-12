import axios from "axios";
import React, { useContext, useReducer } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { AuthContext } from "../context";

interface user {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export function Registro() {
  const { setAuth } = useContext(AuthContext);
  const [user, setUser] = useReducer<React.Reducer<user, user>>(
    (prevUser: user, newUser: user) => {
      return { ...prevUser, ...newUser };
    },
    {
      name: "",
      email: "",
      password: "",
      password2: "",
    }
  );
  async function crearUser() {
    if (user.password != user.password2) {
      if (Platform.OS == "web") {
        alert("Passwords do not match");
      }
      Alert.alert("Red Social", "Passwords do not match");
      return;
    }
    const { data } = await axios.post("/register", user);
    console.log(data);

    if (data.rToken) {
      setAuth({ isAuth: true, ...data });
    }
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, position: "absolute", top: 100 }}>
        Registro
      </Text>
      <TextInput
        onChangeText={(name) => setUser({ name })}
        value={user.name}
        style={styles.input}
        placeholder="Name"
      />
      <TextInput
        onChangeText={(email) => setUser({ email })}
        value={user.email}
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        onChangeText={(password) => setUser({ password })}
        value={user.password}
        style={styles.input}
        placeholder="Clave"
      />
      <TextInput
        onChangeText={(password2) => setUser({ password2 })}
        value={user.password2}
        style={styles.input}
        placeholder="Confirmar clave"
      />
      <TouchableOpacity style={styles.btn} onPress={crearUser}>
        <Text style={styles.btntext}>Crear cuenta</Text>
      </TouchableOpacity>
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
  input: {
    padding: 15,
    backgroundColor: "#f3f3f3",
    marginVertical: 5,
    borderRadius: 15,
  },
  btn: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "blueviolet",
    borderRadius: 15,
    minWidth: 150,
  },
  btntext: {
    textAlign: "center",
    color: "white",
  },
});
