import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar } from "../../components/TabBar";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export type TabParamList = {
    home: undefined;
    favorites: undefined;
};

export default function TabLayout() {
  return (
    <MaterialTopTabs
      tabBar={(props) => <TabBar {...props} />}
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        lazy: true,
      }}
    >
      <MaterialTopTabs.Screen name="home" />
      <MaterialTopTabs.Screen name="favorites" />
    </MaterialTopTabs>
  );
}