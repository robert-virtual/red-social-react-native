import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
  ImagePickerResult,
} from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  getImage: (res: ImagePickerResult) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Gallery: FC<Props> = ({ getImage, visible, setVisible }) => {
  const [bottom, setBottom] = useState<"-100%" | "0">("-100%");
  useEffect(toggleMenu, [visible]);

  function toggleMenu() {
    setBottom(() => (visible ? "0" : "-100%"));
  }
  function openGallery() {
    setVisible(false);
    launchImageLibraryAsync({ mediaTypes: MediaTypeOptions.Images }).then(
      getImage
    );
  }
  function openCamera() {
    setVisible(false);
    launchCameraAsync({ mediaTypes: MediaTypeOptions.Images }).then(getImage);
  }
  return (
    <View
      style={{ position: "absolute", height: "100%", width: "100%", bottom }}
    >
      <View
        onTouchEnd={() => setVisible(false)}
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
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    margin: 15,
  },
});
