import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Edit from "./screens/Edit";
import Login from "./screens/Login";
import Share from "./screens/Share";
import Dotd from "./screens/Dotd";
import React, { useState } from "react";
import AppContext from "./components/AppContext";
import ShareScreen from "./screens/Share";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setCustomText } from 'react-native-global-props';
import {
  useFonts,
  LeagueScript_400Regular,
} from "@expo-google-fonts/dev";
import * as Font from 'expo-font';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 10,
          backgroundColor: "rgba(5,40,70,0.95)",
          borderRadius: 50,
          height: 70,
          justifyContent: "center",
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Share"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="share-social"
                size={24}
                color={tabInfo.focused ? "#fff" : "#8e8e93"}
              />
            );
          },
        }}
        component={ShareScreen}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-person-circle-outline"
                size={24}
                color={tabInfo.focused ? "#fff" : "#8e8e93"}
              />
            );
          },
        }}
        component={Edit}
      ></Tab.Screen>
      <Tab.Screen
        name="Dotd"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="home-sharp"
                size={24}
                color={tabInfo.focused ? "#fff" : "#8e8e93"}
              />
            );
          },
        }}
        component={Dotd}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  Font.useFonts(LeagueScript_400Regular);
  console.log(Font.FontDisplay);
  let [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(
    "750764f5-6250-499a-89d4-c0fb974015e1"
  );
  const [name, setName] = useState<string>(
    ""
  );

  const Id = {
    Id: userId,
    setId: setUserId,
    name: name,
    setName: setName
  };
  console.disableYellowBox = true;


  return (
    <AppContext.Provider value={Id}>
      <NavigationContainer>
        <Stack.Navigator>
          {!loggedIn ? (
            <Stack.Screen
              name="login"
              component={() => Login(setLoggedIn)}
              options={{headerShown: false}}
            ></Stack.Screen>
          ) : (
            <Stack.Screen
              name="tabs"
              options={{
                headerTransparent:true,
                headerTitle: () => <View style={{opacity:0}}></View>,
                headerLeft: () => (
                  <Pressable onPress={() => setLoggedIn(false)}>
                    <Ionicons
                      name="md-exit"
                      style={{
                        transform: [{rotateY: '180deg'}]
                      }}
                      size={24}
                      color={"#052846"}
                    />
                  </Pressable>
                ),
                headerStyle:{
                  
                }
              }}
              component={TabNavigation}
            ></Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
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
