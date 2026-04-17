import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar } from "./TabBar";
import { Home } from "./home";
import { Favorites } from "./favorites";

const MaterialTopTab = createMaterialTopTabNavigator();

export type TabParamList = {
    Home: undefined;
    Favorites: undefined;
  };

export const TabsNavigator = () => (
  <MaterialTopTab.Navigator tabBar={TabBar} tabBarPosition="bottom" screenOptions={{
    swipeEnabled: true,
    lazy: true,
  }}>
    <MaterialTopTab.Screen name="Home" component={Home} />
    <MaterialTopTab.Screen name="Favorites" component={Favorites} />
  </MaterialTopTab.Navigator>
);