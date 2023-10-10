import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
//
import { getAuth, signInAnonymously } from "firebase/auth";

//imported assets
const image = require("../assets/background-image.png");

//background Color options
const colors = {
  option1: "#090C08",
  option2: "#474056",
  option3: "#8A95A5",
  option4: "#B9C6AE",
};

//render screen 1 , use the props navigation
const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  //set Background Color Options, per default option 1
  const [bgOptions, setBgOptions] = useState(colors.option1);

  //initialize Firebase authentication
  const auth = getAuth();
  
  //function to sign in user anonymously
  const signInUser = () => {
    signInAnonymously(auth)
    .then ((result) => {
      navigation.navigate("Chat", 
      {userID: result.user.uid, 
       name: name,
       bgOptions: bgOptions
      });
      Alert.alert("Signed in Successfully!");
    })
    .catch((error)=> {
      Alert.alert("Unable to sign in, try later again.");
    })
  };

  return (
    <View style={styles.container} accessible={true}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View>
            <Text style={styles.titleTex}>Chat</Text>
          </View>
          <View style={styles.boxStart}>
            <View>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#757083"
                style={styles.textInput}
                accessibilityLabel="input"
              />
            </View>
            <View>
              <Text style={styles.text}>Choose Background Color:</Text>
            </View>
            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  bgOptions === colors.option1 && styles.colorCircleSelected,
                  { backgroundColor: colors.option1 },
                ]}
                onPress={() => setBgOptions(colors.option1)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  bgOptions === colors.option2 && styles.colorCircleSelected,
                  { backgroundColor: colors.option2 },
                ]}
                onPress={() => setBgOptions(colors.option2)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  bgOptions === colors.option3 && styles.colorCircleSelected,
                  { backgroundColor: colors.option3 },
                ]}
                onPress={() => setBgOptions(colors.option3)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  bgOptions === colors.option4 && styles.colorCircleSelected,
                  { backgroundColor: colors.option4 },
                ]}
                onPress={() => setBgOptions(colors.option4)}
              ></TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Start Chatting"
                accessibilityHint="Go to the Chat Screen"
                accessibilityRole="button"
                style={styles.button}
                onPress={signInUser}
              >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignContent: "center",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleTex: {
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    height: "55%",
    alignContent: "center",
    padding: 50,
  },

  boxStart: {
    backgroundColor: "white",
    width: "88%",
    height: "44%",
    alignSelf: "center",
    fontSize: 16,
    borderRadius:25
  },

  text: {
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
    paddingTop: 15,
    paddingLeft: 25,
    paddingBottom: 15,
  },

  textInput: {
    fontSize: 16,
    fontWeight: "300",
    opacity: 0.5,
    borderWidth: 2,
    borderColor: "#757083",
    width: "88%",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  icon: {
    padding: 20,
    width: "3%",
    height: "3%",
    justifyContent: "flex-start",
  },

  colorOptions: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },

  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  colorCircleSelected: {
    borderWidth: 5,
    borderColor: "#ffae",
    padding: 5,
  },

  button: {
    fontSize: 16,
    fontWeight: "600", 
    width: "88%",
    padding: 20,
    margin: 20,
    backgroundColor: "#757083",
    alignSelf: "center",
    borderRadius:10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffff",

    alignSelf: "center",
  },
});

export default Start;