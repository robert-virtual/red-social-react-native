import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabsPages } from "../routes/TabsMenu";
import {
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
  ImagePickerResult,
} from "expo-image-picker";
import { Pages } from "../routes";
import { Gallery } from "../components";
interface Props {
  navigation: NativeStackNavigationProp<TabsPages & Pages, "Posts">;
}

interface IPost {
  content: string;
  images: [];
}

export const Posts: FC<Props> = ({ navigation }) => {
  useEffect(() => {
    getCameraPermissionsAsync().then(({ granted }) => {
      if (!granted) {
        requestCameraPermissionsAsync();
      }
    });
  }, []);
  const [menuVisible, setMenuVisible] = useState(false);
  function toggleMenu() {
    setMenuVisible((v) => !v);
  }
  function goToCreatePost(res: ImagePickerResult) {
    if (!res.cancelled) {
      navigation.navigate("CreatePost", { images: [res] });
    }
  }
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

      <Gallery
        setVisible={setMenuVisible}
        getImage={goToCreatePost}
        visible={menuVisible}
      />
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
