import { StyleSheet, LogBox, Alert } from "react-native";
//import react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import the screens we want to navigate
import Start from "./components/Start";
import Chat from "./components/Chat";
//import to initialize a connection for Firestore
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
//netinfo for dectecting a network connection
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { getStorage } from "firebase/storage";
import {API_KEY, AUTH_DOMAIN, PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,APP_ID} from '@env';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

//create the navigator
const Stack = createNativeStackNavigator();

//the App's main Chat component that renders the chat UI
const App = () => {
  // here ist the  web app's Firebase configuration
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  //initialize storage in Firebase
  const storage = getStorage(app);

  // useNetInfo to define a new state that represents network connectivity status
  const connectionStatus = useNetInfo();

  //will display an alert popup if connection is lost:
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerTitleAlign: "center" }}
        ></Stack.Screen>
        <Stack.Screen name="Chat" options={{ headerTitleAlign: "center" }}>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
