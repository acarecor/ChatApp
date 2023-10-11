import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';

// render the screen2, use props route, navigation,  data base (db), isConnected
const Chat = ({ db, route, navigation, isConnected }) => {
  const { name, bgOptions, userID } = route.params;
  //messages state initialization
  const [messages, setMessages] = useState([]);

  //fetch messages from the Firestore database and cache messages
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(messagesToCache)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // load cached messages from the local storage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    // only fetch messages from Firestore db if there's a network connection otherwise, call loadCachedMessages():
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      //function to fetch messages to database in real time
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  // displays all previous messages
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };
 //functions to customize rendering behavior on GiftedChat
  //function to change the color of the default speech bubble of GiftedChat
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "#4d7996" },
          left: { backgroundColor: "#fff" },
        }}
      />
    );
  };
  //to prevent Gifted Chat from rendering the imput tool bar, so user can't compose new messages
  const renderInputToolbar = (prop) => {
    if (isConnected) return <InputToolbar {...prop} />;
    else return null;
  };
//passing these props to the CustomAction component 
  const renderCustomActions =(props) => {
return <CustomActions {...props}/>;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgOptions }]}>
      
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderCustomActions}
          onSend={(messages) =>
            onSend(messages)
          } /* function onSend is called when a user send a message */
          user={{
            _id: userID,
            name: name,
          }}
        />
    
      {Platform.OS === "android" ? 
        <KeyboardAvoidingView behavior="height" />
       : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignContent: "center",
    textAlign: "center",
  },
});

export default Chat;
