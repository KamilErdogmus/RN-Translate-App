// Router.tsx
import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DocsScreen from "../screens/DocsScreen";
import HomeScreen from "../screens/HomeScreen";

const Tab = createMaterialBottomTabNavigator();

const Router = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#6200ee"
      inactiveColor="#757575"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={DocsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookmark" size={26} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Router;
