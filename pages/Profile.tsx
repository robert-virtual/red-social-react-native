import axios from "axios";
import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IPost } from "./Posts";

export function Profile() {
  const { width } = useWindowDimensions();
  const [posts, setPosts] = useState<IPost[]>([]);
  function getPosts() {
    axios.get("/posts", { params: { type: "profile" } }).then(({ data }) => {
      console.log(data);
      setPosts(data || []);
    });
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id!}
      ListEmptyComponent={() => <Text>No Tienes Posts</Text>}
      renderItem={({ item }) => (
        <>
          <FlatList
            horizontal
            pagingEnabled
            data={item.images}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item: image }) => (
              <View>
                <Image source={{ uri: image.url, width, height: width }} />
              </View>
            )}
          />
          <View style={{ flexDirection: "row" }}>
            <Text>{item.user?.name}</Text>
            <Text>{item.content}</Text>
          </View>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
