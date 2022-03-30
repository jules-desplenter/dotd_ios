import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  Pressable,
} from "react-native";
import SvgQRCode from "react-native-qrcode-svg";
import FlipCard from "react-native-flip-card";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Dotd() {
  const handleClick = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  const [flip, setFlip] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setFlip(false);
    }, 750);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.split}>
        <View style={{ height: 250 }}>
          <FlipCard
            friction={6}
            perspective={1000}
            flipHorizontal={false}
            flipVertical={true}
            flip={flip}
            clickable={true}
            alignHeight={false}
          >
            {/* Face Side */}
            <View style={styles.face}>
            <Ionicons
                style={styles.qr}
                name="qr-code-outline"
                size={32}
                color="#485765"
              />
              <Image
                style={{ width: 500, height: 250, marginLeft: 17 }}
                source={{
                  uri: "https://dotdbelgium.blob.core.windows.net/logos/dotd_card.png",
                }}
              ></Image>
            </View>
            {/* Back Side */}
            <View style={[styles.cardshadow, styles.shadowProp]}>
              <SvgQRCode
                size={150}
                value="https://dotdsolutions.eu"
              />
            </View>
          </FlipCard>
        </View>
        <StatusBar style="auto" />
        <Pressable
          style={styles.button}
          onPress={() => {
            handleClick("https://dotdsolutions.eu");
          }}
        >
          <Text style={{ fontSize: 20, color: "#B3B3B3" }}>Website</Text>
        </Pressable>
      </View>
      <Text>Graphics by Marmota</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#052846",
    width: 150,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  split: {
    height: 400,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  face: {
    // height: 300,
  },
  cardshadow: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 350,
    height: 225,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  qr: {
    position: "relative",
    bottom: -225,
    right: -390,
    zIndex: 100,
  },
});
