import axios from "axios";
import React, { useContext, useReducer } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context";
import { IUser } from "../types";
import { globalStyles } from "./styles";

export function Registro() {
  const { setAuth } = useContext(AuthContext);
  const [user, setUser] = useReducer<React.Reducer<IUser, IUser>>(
    (prevUser: IUser, newUser: IUser) => {
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
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#fff",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <Text style={{ fontSize: 50, marginVertical: 100 }}>Registro</Text>
      <TextInput
        onChangeText={(name) => setUser({ name })}
        value={user.name}
        style={globalStyles.input}
        placeholder="Name"
      />
      <TextInput
        onChangeText={(email) => setUser({ email })}
        value={user.email}
        style={globalStyles.input}
        placeholder="Email"
      />
      <TextInput
        onChangeText={(password) => setUser({ password })}
        value={user.password}
        style={globalStyles.input}
        placeholder="Clave"
      />
      <TextInput
        onChangeText={(password2) => setUser({ password2 })}
        value={user.password2}
        style={globalStyles.input}
        placeholder="Confirmar clave"
      />
      <TouchableOpacity style={globalStyles.btn} onPress={crearUser}>
        <Text style={globalStyles.btntext}>Crear cuenta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
