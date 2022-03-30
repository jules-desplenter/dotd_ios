import React, { useContext } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import useEditUserModal from "../hooks/useEditUserModal";
import AppContext from "./AppContext";
import Ionicons from '@expo/vector-icons/Ionicons';


interface props {
  state: boolean;
  setState: any;
  onChangeText: any;
  ob: any;
  setOb: any;
  text: string;
  id: any;
  name: string;
  obPlace: any;
  onChangeImportance: any;
  importance: string;
  startUrl: string;
  tip: string;
}

export default function GenericModal(props: props) {
  const id = useContext(AppContext);
  const userId: any = id ? id : { Id: "" };
  const { PostData } = useEditUserModal(userId.id, props.ob);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.state}
      onRequestClose={() => {
        props.setState(!props.state);
      }}
    >
      <Pressable
        onPress={() => props.setState(!props.state)}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Pressable onPress={() => {}} style={styles.modalView}>
          <Pressable style={{position:'absolute', right: 15, top: 15}}  onPress={() => {
                props.setState(!props.state)
                let temp = props.ob;
                temp[props.obPlace] = "";
                temp[props.obPlace + "_importance"] = 0;
                props.setOb(temp);
                PostData();
              }}>
        <Ionicons name="ios-trash-outline" size={32} color="red"  /> 
        </Pressable>
          <Text
            style={{ fontWeight: "bold", marginBottom: 20, marginTop: -10 }}
          >
            Edit {props.name}
          </Text>
          <Text style={styles.modalText}>Hint: {props.tip}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={props.onChangeText}
            value={props.text}
          />
          <Text style={styles.modalText}>importance {props.name}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={props.onChangeImportance}
            value={props.importance ? props.importance.toString() : ""}
            keyboardType="numeric"
          />
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button]}
              onPress={() => props.setState(!props.state)}
            >
              <Text style={styles.buttonCancel}>Cancel</Text>
            </Pressable>
            {/* <Pressable
              style={[styles.button]}
              onPress={() => {
                props.setState(!props.state)
                let temp = props.ob;
                temp[props.obPlace] = "";
                temp[props.obPlace + "_importance"] = 0;
                props.setOb(temp);
                PostData();
              }}
            >
              <Text style={styles.buttonCancel}>Delete</Text>
            </Pressable> */}
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={() => {
                props.setState(!props.state);
                let temp = props.ob;
                temp[props.obPlace] = props.startUrl + props.text;
                temp[props.obPlace + "_importance"] = +props.importance;
                props.setOb(temp);
                PostData();
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: 260,
    marginTop: 15,
    marginBottom: -20
  },
  buttonCancel: {
    color: "#7b9cac",
    textDecorationLine: "underline",
  },
  buttonSave: {
    backgroundColor: "#052846",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: -5,
    textAlign: "left",
    width: 250,
    marginTop: 10,
    marginLeft: 30
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 30,
  },
});
