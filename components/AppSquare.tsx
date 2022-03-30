import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import * as Svg from "react-native-svg";

interface props {
  onChangeText: any;
  setState: any;
  state: boolean;
  text: string;
  name:string;
  onChangeImportance: any;
  importance: string;
  otherModal?:any
}

export default function AppSquare(props: props) {
  return (
    <Pressable
      onPress={() => {
        if(props.otherModal){
          props.otherModal(false);
        }
        props.setState(true);
        props.onChangeText(props.text);
        props.onChangeImportance(props.importance)
      }}
      style={styles.square}
    >
      <Svg.SvgUri
        width="100"
        height="100"
        style={{ borderRadius: 20, overflow: "hidden" }}
        uri={'https://dotdbelgium.blob.core.windows.net/logos/iconmonstr-' + props.name + '.svg'}
      />
        <Text style={styles.text}>{props.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  square:{
    marginBottom: 10,
    justifyContent: 'center',
    width: 125
  },
  text:{
    textAlign: 'center',
    marginRight: 25,
    marginTop:10
  }
})