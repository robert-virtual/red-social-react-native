import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Login, Registro } from "../pages";
import { TabsMenu } from "./TabsMenu";

export type Pages = {
  Login: undefined;
  Registro: undefined;
  TabsMenu: undefined;
};

const Stack = createNativeStackNavigator<Pages>();

export const StackMenu = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false }}
            name="TabsMenu"
            component={TabsMenu}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
