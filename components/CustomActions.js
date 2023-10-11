import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";
//react-native-action-sheet comes with the gifted-chat packages
import {useActionSheet} from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

//props provides from GiftedChat
const CustomActions = ({wrapperStyle, iconTextStyle}) => {
    // return a reference to Gifted Chat’s ActionSheet
    const actionSheet = useActionSheet();
    //display a menu  with define actions for the user
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take a Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length -1;
        actionSheet.showActionSheetWithOptions(
            {
                options, 
                cancelButtonIndex,
            },
            async(buttonIndex)=> {
              switch(buttonIndex){
                case 0:
                    pickImage();
                    return;
                case 1:
                    takePhoto();
                    return;
                case 2:
                    getLocation();
                default:
            }},
        );
    };

//choose a picture from 
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
          let result = await ImagePicker.launchImageLibraryAsync();
          if (!result.canceled){
            console.log('uploading and uploading the image occurs here');
          } else Alert.alert ("Permissions haven't been granted");
        }
      }

      const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
          
          let result = await ImagePicker.launchCameraAsync();
    
          
          if (!result.canceled){
            console.log('uploading and uploading the image occurs here');
            }  else Alert.alert("Permissions haven't been granted");
        }
      }
    
      const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
    
        if (permissions?.granted) {
          const location = await Location.getCurrentPositionAsync({});
          if(location){
            console.log('sending the location occurs here');
          }else Alert.alert('Error occurred while fetching location');
        } else Alert.alert("Permissions to read location aren't granted");
        
      }


return(
    <TouchableOpacity
    style={styles.container}
    onPress={onActionPress}>
        <View style={[styles.wrapper, wrapperStyle]}>
            <Text style={[styles.iconText, iconTextStyle]}></Text>
        </View>
    </TouchableOpacity>
)
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
      },
      wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
      },
      iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
      },
  });

export default CustomActions;
