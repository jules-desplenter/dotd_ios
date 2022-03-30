import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Clipboard,
  Share,
  Image,
} from "react-native";
import FlipCard from "react-native-flip-card";
import SvgQRCode from "react-native-qrcode-svg";
import AppContext from "../components/AppContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ShareScreen() {
  const id = useContext(AppContext);
  const url =
    `https://jules-desplenter.github.io/?id=` +
    (id ? (id.Id ? id.Id : "") : "");
  const handleClick = (url: string) => {
    Clipboard.setString(url);
    alert("copied");
  };
  const name = id?.name;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Connect with me: " + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
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
              <View
                style={{
                  width: 340,
                  height: 215,
                  zIndex: 1,
                  backgroundColor: "#050705",
                  borderRadius: 12,
                  marginTop: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.cardName}>{name}</Text>
              </View>
            </View>
            {/* Back Side */}
            <View style={[styles.cardshadow, styles.shadowProp]}>
              <SvgQRCode size={150} value={url} />
            </View>
          </FlipCard>
        </View>

        <StatusBar style="auto" />
        <Pressable
          style={styles.button}
          onPress={() => {
            onShare();
          }}
        >
          <Text style={{ fontSize: 20, color: "#B3B3B3" }}>Share</Text>
        </Pressable>
      </View>
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
    bottom: -222,
    right: -300,
    zIndex: 100,

  },
  cardName: {
    color: "#485765",
    fontSize: 30,
    zIndex: 100,
    marginTop: 10
  },
});
