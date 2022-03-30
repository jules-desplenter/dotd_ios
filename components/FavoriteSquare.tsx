import React from "react";
import { Pressable, Text, StyleSheet, View, Switch } from "react-native";
import * as Svg from "react-native-svg";

interface props {
  onChangeText: any;
  setState: any;
  state: boolean;
  text: string;
  name: string;
  onChangeImportance: any;
  importance: string;
  otherModal?: any;
  isEnabled: boolean;
  toggleSwitch: any;
}

export default function FavoriteSquare(props: props) {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Pressable
        onPress={() => {
          if (props.otherModal) {
            props.otherModal(false);
          }
          props.setState(true);
          props.onChangeText(props.text);
          props.onChangeImportance(props.importance);
        }}
      >
          <View style={styles.direct}>
        <Text style={{marginRight: 5}}>Direct link:</Text>
        <Switch
            trackColor={{ false: "#767577", true: "#30D158" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={props.toggleSwitch}
            value={props.isEnabled}
          />
          </View>
        <View style={styles.square}>
          <Svg.SvgUri
            width="100"
            height="100"
            style={{ borderRadius: 20, overflow: "hidden" }}
            uri={
              "https://dotdbelgium.blob.core.windows.net/logos/iconmonstr-" +
              props.name +
              ".svg"
            }
          />
          <View style={styles.text}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.say}>
              Make sure to take a look here it's my favourite!
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 370,
    marginBottom: 10,
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    borderRadius: 20
  },
  text: {
    width: 200,
    marginRight: 30,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  say: {},
  card: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 350,
    marginVertical: 10,
    marginBottom: 40
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
  direct:{
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center'
  }
});
