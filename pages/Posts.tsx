import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FC, useLayoutEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabsPages } from "../routes/TabsMenu";
import axios from "axios";

interface Props {
  navigation: NativeStackNavigationProp<TabsPages, "Posts">;
}

interface IPost {
  content: string;
  images: [];
}

export const Posts: FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [bottom, setBottom] = useState<"-100%" | "0">("-100%");
  function crearPost() {
    const form = new FormData();
    form.append("content", content);
    images.forEach(({ uri, type }) => {
      form.append("images", { name: "", type, uri });
    });
    axios.post("/posts", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  function toggleMenu() {
    setBottom((bottom) => (bottom == "-100%" ? "0" : "-100%"));
  }
  function openGallery() {}
  function openCamera() {}

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleMenu}>
          <AntDesign
            name="plussquareo"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>Posts</Text>
      <View
        style={{ position: "absolute", height: "100%", width: "100%", bottom }}
      >
        <View
          onTouchEnd={toggleMenu}
          style={{ width: "100%", height: "100%" }}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "#f3f3f3",
            padding: 15,
            width: "100%",
            bottom: "0",
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
            shadowRadius: 5,
            shadowOpacity: 0.25,
          }}
        >
          <TouchableOpacity style={styles.option} onPress={openGallery}>
            <AntDesign
              name="picture"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text>Abrir Galleria</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={openCamera}>
            <AntDesign
              name="camera"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text>Abrir Camara</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  option: {
    flexDirection: "row",
    margin: 15,
  },
});
