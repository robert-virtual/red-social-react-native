import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { FC, useContext, useState } from "react";
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
import { Pages } from "../routes";

interface Props {
  navigation: NativeStackNavigationProp<Pages, "Login">;
}

export const Login: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);

  async function entrar() {
    console.log(email, password);
    const { data } = await axios.post("/login", { email, password });
    console.log(data);
    if (data.msg) {
      if (Platform.OS == "web") {
        alert(data.msg);
      }
      Alert.alert("Red Social", data.msg);
    }
    if (data.rToken) {
      setAuth({ isAuth: true, ...data });
    }
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, position: "absolute", top: 100 }}>
        Login
      </Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        placeholder="email"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        placeholder="clave"
      />
      <TouchableOpacity style={styles.btn} onPress={entrar}>
        <Text style={styles.btntext}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={{ color: "blueviolet" }}>Ya tengo una cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

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
