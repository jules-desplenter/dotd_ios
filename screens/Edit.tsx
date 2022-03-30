import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
  Switch,
  ActivityIndicator,
  Platform,
} from "react-native";
import AppContext from "../components/AppContext";
import useGetUser from "../hooks/useGetUser";
import * as Svg from "react-native-svg";
import useEditUser from "../hooks/useEditUser";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import GenericModal from "../components/GenericModal";
import AppSquare from "../components/AppSquare";
import { link } from "fs";
import FavoriteSquare from "../components/FavoriteSquare";

export default function Edit() {
  const socials = ["Facebook", "Instagram", "Whatsapp", "Mail", "Linkedin"];
  const id = useContext(AppContext);
  const userId: any = id ? id : { Id: "" };
  const response = useGetUser(userId.Id);

  const [isEnabled, setIsEnabled] = useState(false);

  let [ob, setOb] = useState<any>();
  let [reload, setReload] = useState<any>("");
  let [modalNameVisible, setModalNameVisible] = useState(false);
  let [modalFunctionVisible, setModalFunctionVisible] = useState(false);
  let [modalLocationVisible, setModalLocationVisible] = useState(false);
  let [modalBioVisible, setModalBioVisible] = useState(false);
  let [modalPhoneVisible, setModalPhoneVisible] = useState(false);
  let [modalWebsiteVisible, setModalWebsiteVisible] = useState(false);
  let [notUsed, setNotUsed] = useState(false);

  // generic modals
  let [modalFacebook, setModalFacebook] = useState(false);
  let [modalInstagram, setModalInstagram] = useState(false);
  let [modalLinkedin, setModalLinkedin] = useState(false);
  let [modalMail, setModalMail] = useState(false);
  let [modalWhatsapp, setModalWhatsapp] = useState(false);

  const [text, onChangeText] = React.useState("");
  const [importance, onChangeImportance] = React.useState("");
  if (response) {
    if (response.response) {
      ob = response.response;
      id?.setName(ob.name);
    }
  }

  const { PostData } = useEditUser(userId.Id, ob);
  let links: any = [];
  links.push({
    link: ob?.facebook,
    importance: ob?.facebook_importance,
    social: "Facebook",
    startUrl: "https://www.facebook.com/",
    tip: "your name with a point in the middle",
    state: modalFacebook,
    setState: setModalFacebook,
    obPlace: "facebook",
  });
  links.push({
    link: ob?.instagram,
    importance: ob?.instagram_importance,
    social: "Instagram",
    startUrl: "https://www.instagram.com/",
    tip: "your username in one word",
    state: modalInstagram,
    setState: setModalInstagram,
    obPlace: "instagram",
  });
  links.push({
    link: ob?.linkedin,
    importance: ob?.linkedin_importance,
    social: "Linkedin",
    startUrl: "https://www.linkedin.com/",
    tip: "your username in one word",
    state: modalLinkedin,
    setState: setModalLinkedin,
    obPlace: "linkedin",
  });
  links.push({
    link: ob?.mail,
    importance: ob?.mail_importance,
    social: "Mail",
    startUrl: "mailto:",
    tip: "just your email address",
    state: modalMail,
    setState: setModalMail,
    obPlace: "mail",
  });
  links.push({
    link: ob?.whatsapp,
    importance: ob?.whatsapp_importance,
    social: "Whatsapp",
    startUrl: "https://api.whatsapp.com/send?phone=",
    tip: "your phone number",
    state: modalWhatsapp,
    setState: setModalWhatsapp,
    obPlace: "whatsapp",
  });
  links.sort(function (a: any, b: any) {
    if (a.importance == null) {
      return 1;
    } else {
      return a.importance - b.importance;
    }
  });

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      let temp = ob;
      //@ts-ignore
      temp.directlink = null;
      setOb(temp);
      PostData();
    } else {
      let temp = ob;
      //@ts-ignore
      temp.directlink = links[0].link;
      setOb(temp);
      PostData();
    }
  };
  // image picker
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (ob?.directlink != null) {
      setIsEnabled(true);
    }
  }, [ob]);

  useEffect(() => {
    if (isEnabled && links) {
      let temp = ob;
      if (links[0]) {
        //@ts-ignore
        temp.directlink = links[0]?.link;
      }
      setOb(temp);
      PostData();
    }
  }, [links]);

  //@ts-ignore
  useEffect(async () => {
    var formdata = new FormData();
    formdata.append(
      "profile",
      { name: ob.rowKey + ".jpg", uri: image, type: "image/*" },
      "[PROXY]"
    );
    formdata.append("name", ob.rowKey + ".jpg");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      "https://dotdbelgium.azurewebsites.net/api/uploadprofile?code=CEs4SUZh6AIcquNwv0yYhNas6NLgBIP9nFfzGwt5x1uDSvFWF1vWdw==",
      //@ts-ignore
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setReload("iets");
        setReload("anders");
      })
      .catch((error) => console.log("error", error));
    ob.picture =
      "https://dotdbelgium.blob.core.windows.net/profile/" + ob.rowKey + ".jpg";
    setOb(ob);
    PostData();
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.25,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // image picker
  const [companyImage, setCompanyImage] = useState<any>();

  //@ts-ignore
  useEffect(async () => {
    var formdata = new FormData();
    formdata.append(
      "profile",
      { name: ob.rowKey + ".jpg", uri: companyImage, type: "image/*" },
      "[PROXY]"
    );
    formdata.append("name", ob.rowKey + ".jpg");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      "https://dotdbelgium.azurewebsites.net/api/uploadCompany?code=EEacxI5TRkGLAskCRZ7hCmaD5nrt3yHCO3N8/GnxdRCVKhHuPkGWtw==",
      //@ts-ignore
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setReload("iets");
        setReload("anders");
      })
      .catch((error) => console.log("error", error));
    ob.companypicture =
      "https://dotdbelgium.blob.core.windows.net/company/" + ob.rowKey + ".jpg";
    setOb(ob);
    PostData();
  }, [companyImage]);

  const pickImageCompany = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.25,
    });

    if (!result.cancelled) {
      setCompanyImage(result.uri);
    }
  };

  // image picker
  const [coverImage, setCoverImage] = useState<any>();

  //@ts-ignore
  useEffect(async () => {
    var formdata = new FormData();
    formdata.append(
      "profile",
      { name: ob.rowKey + ".jpg", uri: coverImage, type: "image/*" },
      "[PROXY]"
    );
    formdata.append("name", ob.rowKey + ".jpg");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      "https://dotdbelgium.azurewebsites.net/api/uploadCover?code=sgLsJ0QmquGYFaGNMIKZrxjGhNvVD0td1gCmfRU5PIjeAhPF8C4Lug==",
      //@ts-ignore
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setReload("iets");
        setReload("anders");
      })
      .catch((error) => console.log("error", error));
    let temp = ob;
    temp.coverpicture =
      "https://dotdbelgium.blob.core.windows.net/cover/" + ob.rowKey + ".jpg";
    setOb(temp);
    PostData();
  }, [coverImage]);

  const pickImageCover = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 4],
      quality: 0.25,
    });

    if (!result.cancelled) {
      setCoverImage(result.uri);
    }
  };

  return (
    <ScrollView>
      {console.log(ob)}
      {ob == undefined && (
        <View
          style={{
            minHeight: 900,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            color={"#052846"}
            size={100}
            style={{ marginBottom: 250 }}
          />
        </View>
      )}
      <View style={styles.container}>
        {/* name, function locatie bio */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalNameVisible}
          onRequestClose={() => {
            setModalNameVisible(!modalNameVisible);
          }}
        >
          <Pressable
            onPress={() => setModalNameVisible(!modalNameVisible)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Pressable onPress={() => {}} style={styles.modalView}>
              <Text style={styles.modalText}>Edit name</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalNameVisible(!modalNameVisible)}
                >
                  <Text style={[styles.textStyle, , styles.buttonCancel]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {
                    setModalNameVisible(!modalNameVisible);
                    ob.name = text;
                    setOb(ob);
                    PostData();
                  }}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalFunctionVisible}
          onRequestClose={() => {
            setModalFunctionVisible(!modalFunctionVisible);
          }}
        >
          <Pressable
            onPress={() => setModalFunctionVisible(!modalFunctionVisible)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Pressable onPress={() => {}} style={styles.modalView}>
              <Text style={styles.modalText}>Edit function</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalFunctionVisible(!modalFunctionVisible)}
                >
                  <Text style={[styles.textStyle, styles.buttonCancel]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {
                    setModalFunctionVisible(!modalFunctionVisible);
                    ob.function = text;
                    setOb(ob);
                    PostData();
                  }}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalLocationVisible}
          onRequestClose={() => {
            setModalLocationVisible(!modalLocationVisible);
          }}
        >
          <Pressable
            onPress={() => setModalLocationVisible(!modalLocationVisible)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Pressable onPress={() => {}} style={styles.modalView}>
              <Text style={styles.modalText}>Edit location</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalLocationVisible(!modalLocationVisible)}
                >
                  <Text style={[styles.textStyle, , styles.buttonCancel]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {
                    setModalLocationVisible(!modalLocationVisible);
                    ob.location = text;
                    setOb(ob);
                    PostData();
                  }}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalBioVisible}
          onRequestClose={() => {
            setModalBioVisible(!modalBioVisible);
          }}
        >
          <Pressable
            onPress={() => setModalBioVisible(!modalBioVisible)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Pressable onPress={() => {}} style={styles.modalView}>
              <Text style={styles.modalText}>Edit bio</Text>
              <TextInput
                style={[styles.textInput, { height: 100 }]}
                numberOfLines={4}
                multiline={true}
                onChangeText={onChangeText}
                value={text}
                textAlign={"left"}
                textAlignVertical={"top"}
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalBioVisible(!modalBioVisible)}
                >
                  <Text style={[styles.textStyle, styles.buttonCancel]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {
                    setModalBioVisible(!modalBioVisible);
                    ob.bio = text;
                    setOb(ob);
                    PostData();
                  }}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        {/* website en telefoonnummer */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPhoneVisible}
          onRequestClose={() => {
            setModalPhoneVisible(!modalPhoneVisible);
          }}
        >
          <Pressable
            onPress={() => setModalPhoneVisible(!modalPhoneVisible)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Pressable onPress={() => {}} style={styles.modalView}>
              <Text style={styles.modalText}>Edit phonenumber</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
                keyboardType="numeric"
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalPhoneVisible(!modalPhoneVisible)}
                >
                  <Text style={[styles.textStyle, styles.buttonCancel]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {
                    setModalPhoneVisible(!modalPhoneVisible);
                    ob.phone = text;
                    setOb(ob);
                    PostData();
                  }}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalWebsiteVisible}
          onRequestClose={() => {
            setModalWebsiteVisible(!modalWebsiteVisible);
          }}
        >
          <Pressable
            onPress={() => setModalWebsiteVisible(!modalWebsiteVisible)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Pressable onPress={() => {}} style={styles.modalView}>
              <Text style={styles.modalText}>Edit webiste</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalWebsiteVisible(!modalWebsiteVisible)}
                >
                  <Text style={[styles.textStyle, styles.buttonCancel]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {
                    setModalWebsiteVisible(!modalWebsiteVisible);
                    ob.link = text;
                    setOb(ob);
                    PostData();
                  }}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        {/* not used app Modal modals */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={notUsed}
          onRequestClose={() => {
            setNotUsed(!notUsed);
          }}
        >
          <Pressable
            onPress={() => setNotUsed(!notUsed)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Pressable onPress={() => {}} style={styles.modalView}>
              <View style={styles.links}>
                {links.map((e: any) => {
                  if (e.link == "") {
                    return (
                      <AppSquare
                        importance={ob ? ob[e.obPlace + "_importance"] : ""}
                        name={e.social}
                        onChangeImportance={onChangeImportance}
                        onChangeText={onChangeText}
                        setState={e.setState}
                        state={e.state}
                        text={ob ? ob[e.obPlace].replace(e.startUrl, "") : ""}
                        otherModal={setNotUsed}
                      ></AppSquare>
                    );
                  }
                })}
              </View>
              <Button
                title="close"
                onPress={() => setNotUsed(!notUsed)}
              ></Button>
            </Pressable>
          </Pressable>
        </Modal>
        {/* generic modal for applications */}
        {links.map((e: any) => {
          return (
            <GenericModal
              tip={e.tip}
              obPlace={e.obPlace}
              startUrl={e.startUrl}
              id={userId.id}
              importance={importance}
              name={e.social}
              ob={ob}
              onChangeImportance={onChangeImportance}
              onChangeText={onChangeText}
              setOb={setOb}
              setState={e.setState}
              state={e.state}
              text={text}
            ></GenericModal>
          );
        })}
        <Pressable
          hitSlop={{ bottom: -100 }}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
          onPress={() => pickImageCover()}
        >
          <Image
            key={reload}
            style={styles.cover}
            source={{
              uri:
                ob?.coverpicture == ""
                  ? "https://dotdbelgium.blob.core.windows.net/cover/desktop.jpg"
                  : ob?.coverpicture + "?" + new Date(),
            }}
          />
        </Pressable>
        <Pressable
          hitSlop={50}
          style={{ zIndex: 1 }}
          onPress={() => pickImage()}
        >
          <Image
            key={reload}
            style={styles.profile}
            source={{
              uri:
                ob?.picture == ""
                  ? "https://dotdbelgium.blob.core.windows.net/profile/blank.png"
                  : ob?.picture + "?" + new Date(),
            }}
          />
        </Pressable>
        <Pressable
          hitSlop={{ left: -150 }}
          style={{ zIndex: 2 }}
          onPress={() => pickImageCompany()}
        >
          <Image
            key={reload}
            style={styles.companyPicture}
            source={{
              uri:
                ob?.companypicture == ""
                  ? "https://dotdbelgium.blob.core.windows.net/profile/blank.png"
                  : ob?.companypicture + "?" + new Date(),
            }}
          />
        </Pressable>

        <Pressable
          onPress={() => {
            setModalNameVisible(!modalNameVisible);
            onChangeText(ob.name);
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            {ob?.name == "" ? "name" : ob?.name}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setModalFunctionVisible(!modalFunctionVisible);
            onChangeText(ob.function);
          }}
        >
          <Text style={{ fontSize: 17 }}>
            {ob?.function == "" ? "function" : ob?.function}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setModalLocationVisible(!modalLocationVisible);
            onChangeText(ob.location);
          }}
        >
          <Text style={{ fontSize: 12, marginBottom: 10 }}>
            {ob?.location == "" ? "location" : ob?.location}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setModalBioVisible(!modalBioVisible);
            onChangeText(ob.bio);
          }}
        >
          <Text style={{ fontSize: 16, width: 300, textAlign: "center" }}>
            {ob?.bio == "" ? "bio" : ob?.bio}
          </Text>
        </Pressable>
        <View style={styles.contactWebiste}>
          <Pressable
            onPress={() => {
              setModalPhoneVisible(!modalPhoneVisible);
              onChangeText(ob.phone);
            }}
            style={styles.contactButton}
          >
            <Text style={{ color: "#B3B3B3", fontSize: 20 }}>
              Add to contacts
            </Text>
          </Pressable>
          <Pressable
            style={styles.site}
            onPress={() => {
              setModalWebsiteVisible(!modalWebsiteVisible);
              onChangeText(ob.link);
            }}
          >
            <Svg.SvgUri
              width="100%"
              height="100%"
              uri="https://dotdbelgium.blob.core.windows.net/logos/website_globe.svg"
            />
          </Pressable>
        </View>
        {/* apps */}
        <FavoriteSquare
          importance={ob ? ob[links[0].obPlace + "_importance"] : ""}
          name={links[0].social}
          onChangeImportance={onChangeImportance}
          onChangeText={onChangeText}
          setState={links[0].setState}
          state={links[0].state}
          text={ob ? ob[links[0].obPlace].replace(links[0].startUrl, "") : ""}
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
        ></FavoriteSquare>
        <View style={styles.links}>
          {links.slice(1).map((e: any) => {
            if (e.link != "") {
              return (
                <AppSquare
                  importance={ob ? ob[e.obPlace + "_importance"] : ""}
                  name={e.social}
                  onChangeImportance={onChangeImportance}
                  onChangeText={onChangeText}
                  setState={e.setState}
                  state={e.state}
                  text={ob ? ob[e.obPlace].replace(e.startUrl, "") : ""}
                ></AppSquare>
              );
            }
          })}
          <Pressable onPress={() => setNotUsed(true)}>
            <Svg.SvgUri
              width="100"
              height="100"
              // style={{ borderRadius: 20, overflow: "hidden" }}
              uri="https://dotdbelgium.blob.core.windows.net/logos/add.svg"
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>Add</Text>
          </Pressable>
        </View>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 60, height: 200}}>
          <Text>Powered by:</Text>
          <Svg.SvgUri
            style={{width: 50, height:20}}
            width="35%"
            height="35%"
            uri="https://dotdbelgium.blob.core.windows.net/logos/dotd.svg"
          />
          <Text>The science of networking.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingBottom: 100,
    paddingTop: 50,
  },
  cover: {
    marginTop: 10,
    width: "95%",
    height: 200,
    borderRadius: 10,
  },
  profile: {
    height: 150,
    width: 150,
    borderRadius: 75,
    margin: -80,
    borderWidth: 5,
    borderColor: "white",
  },
  companyPicture: {
    height: 75,
    width: 75,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50,
    marginLeft: 125,
    marginTop: 20,
  },
  globe: {
    height: 20,
    width: 20,
  },
  site: {
    height: 70,
    width: 70,
    marginTop: 0,
  },
  favorite: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  contactWebiste: {
    flexDirection: "row",
    width: 350,
    justifyContent: "space-between",
    marginBottom: 40,
    marginTop: 10,
    alignItems: "center",
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 380,
    marginLeft: 26,
    // justifyContent: "flex-start",
    // alignContent: "flex-start",
  },
  contactButton: {
    height: 40,
    width: 260,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#052846",
    marginTop: 10,
  },
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
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: 260,
    marginTop: 15,
    marginBottom: -20,
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
    marginLeft: 30,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 20,
  },
});
