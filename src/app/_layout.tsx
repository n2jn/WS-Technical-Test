import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigatorScreenParams } from "@react-navigation/native";
import { TabParamList, TabsNavigator } from "./(tabs)/_layout";
import { Detail } from "./detail";

const RootStack = createSharedElementStackNavigator();


export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  Detail: { id: string | number };
};

export default () => (
  <NavigationContainer>
    <RootStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <RootStack.Screen name="MainTabs" component={TabsNavigator} />
      <RootStack.Screen
        name="Detail"
        component={Detail}
        options={{
          presentation: 'modal',
        }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);