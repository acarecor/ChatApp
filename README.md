# ChatApp

ChatApp is a mobile app created with React Native. 
The app will provide users with a chat interface and options to share images and their location.

## Technologies and Libraries used

* React Native
* Expo
* React Native Gifted Chat library
* Firebase Cloud Storage , 
* Firestore Database, 
* Android Studio emulator
* Expo ImagePicker and Location

## Features 

### User Stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

### Key Features
* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
and location data.
* Data gets stored online and offline.

## Geting Started

Before installing Expo, make sure you have installed an appropriate version of Node
```shell
nvm install 16.19.0
nvm use 16.19.0
nvm alias default 16.19.0
```
install the Expo CLI 
```shell
npm install -g expo-cli
```
## Necessary libraries to install
```shell
npm install --save @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npm install react-native-gifted-chat --save
npx expo install @react-native-async-storage/async-storage 
npx expo install @react-native-community/netinfo
npx expo install expo-image-picker
npx expo install expo-location
npx expo install react-native-maps
```
## Database Setup: Firebase/Firestore

### Firebase Configuration
1. Use existing Google credentials to sign in and create a new Firebase account
2. Create a project or Add project and name it (disable Google Analytics)
3. On the Firebase dashboard click on Build: Firestore Database and create a database 
4. To allow read and write queries to be performed from a mobile or web application, click on the Rules tab of the Firestore control panel and change false to true.

### Firestore configuration 
1. In the terminal inside the project, install Firestore (via Firebase): 
 
```shell
npm install firebase@10.3.1 --save
```

2. Open the "Project configuration" in the Firestore project in your browser.
3. In the General tab: Your applications.  Click on the Firestore for Web button (icon </>). 
4. Register the web application, which will connect to the created Firestore database.
5. Enter a name, click on Register application to generate the configuration code.
6. Copy and paste the code const firebaseConfig = {...}; into the App.js file.

### Configure Firebase Storage
1. On the Firebase dashboard, select Build and then Storage in the left menu. 
2. Click the Get started button and configure the cloud storage. Keep everything as default and click Next, then Done. 
3. To allow uploading and downloading files to and from storage,  select the Rules tab, change "allow read, write: if false;" to "allow read, write: if true", and click Publish. 

