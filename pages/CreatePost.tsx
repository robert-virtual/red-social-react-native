import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { ImageInfo } from "expo-image-picker";
import { FC, useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Pages } from "../routes";
import { Gallery } from "../components";
import { AuthContext } from "../context";
declare global {
  interface Blob {
    name: string;
    uri: string;
  }
}

interface Props {
  navigation: NativeStackNavigationProp<Pages, "CreatePost">;
  route: RouteProp<Pages, "CreatePost">;
}

export const CreatePost: FC<Props> = ({ navigation, route }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  function toggleMenu() {
    setMenuVisible((v) => !v);
  }
  const { aToken } = useContext(AuthContext);
  const [images, setImages] = useState<ImageInfo[]>(route.params.images);
  const [content, setContent] = useState("");
  const { width } = useWindowDimensions();
  useEffect(() => {
    console.log("images.length:", images.length);
  }, [images]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={crearPost} style={{ marginRight: 5 }}>
          <Text style={{ color: "#0099ff" }}>Publicar</Text>
        </TouchableOpacity>
      ),
    });
  }, [crearPost]);
  function crearPost() {
    const form = new FormData();
    form.append("content", content);
    images.forEach(({ uri, type }) => {
      let ext;
      if (Platform.OS == "web") {
        ext = uri.split(";")[0];
        ext = ext.split("/")[1];
      } else {
        ext = uri.split("ImagePicker/");
        ext = ext[ext.length - 1];
      }
      form.append("images", {
        name: `name.${ext}`,
        type: `${type}/${ext}`,
        uri,
      });
    });

    axios.post("/posts", form, {}).then(({ data }) => console.log(data));
  }

  return (
    <>
      <ScrollView>
        <FlatList
          horizontal
          pagingEnabled
          data={images}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.uri, width, height: width }} />
            </View>
          )}
        />
        <View
          style={{
            justifyContent: "space-between",
            width,
            flexDirection: "row",
            padding: 15,
          }}
        >
          <TextInput
            style={{ minHeight: width, flexGrow: 1 }}
            multiline
            placeholder="Descripcion..."
            value={content}
            onChangeText={setContent}
          />
          <TouchableOpacity onPress={toggleMenu}>
            <AntDesign
              name="plussquareo"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Gallery
        setVisible={setMenuVisible}
        visible={menuVisible}
        getImage={(res) => {
          console.log(res);
          let i = res as ImageInfo;
          let ext = i.uri.split(";")[0];
          ext = ext.split("/")[1];
          console.log("ext:", ext);
          setImages([...images, res as ImageInfo]);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
