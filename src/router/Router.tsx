import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DocsScreen from "../screens/DocsScreen";
import HomeScreen from "../screens/HomeScreen";
import { useTheme } from "../hooks/UseTheme";
import { useTheme as usePaperTheme } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();

const Router = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const paperTheme = usePaperTheme();
  return (
    <Tab.Navigator
      shifting
      initialRouteName="Home"
      activeColor={paperTheme.colors.primary}
      inactiveColor={paperTheme.colors.outline}
      barStyle={{
        backgroundColor: isDarkMode
          ? paperTheme.colors.surface
          : paperTheme.colors.background,
      }}
      theme={paperTheme}
      screenOptions={{
        unmountOnBlur: true,
        lazy: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Ana Sayfa",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Docs"
        component={DocsScreen}
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="library" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Router;
