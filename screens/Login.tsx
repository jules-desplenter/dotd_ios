import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ImageBackground,
  Pressable,
} from "react-native";
import * as Svg from "react-native-svg";

interface props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://dotdbelgium.blob.core.windows.net/logos/mobile.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{width: 300, height: 300, justifyContent:'space-between', marginTop: 200}}>
          <View>
          <Text style={{color: "white", fontSize: 40, fontWeight: 'bold', marginBottom: 20}}>Hi!</Text>
          <Text style={{color: "white"}}>Welcome to the dotd app, click the button below to set up yout card.</Text>
          </View>
          <Pressable style={{backgroundColor:"#052846", borderColor:"white", width: 300, height: 40, borderRadius: 10, borderWidth:1, justifyContent:'center', alignItems:'center'}} onPress={() => setLoggedIn(true)}><Text style={{color:"white", fontSize:20}}>Let's go</Text></Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
});
