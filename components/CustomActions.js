import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
//react-native-action-sheet comes with the gifted-chat packages
import {useActionSheet} from '@expo/react-native-action-sheet';

//props provides from GiftedChat
const CustomActions = (wrapperStyle, iconTextStyle) => {
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
                    console.log('user wants to pick an image');
                    return;
                case 1:
                    console.log('user wants to take a photo');
                    return;
                case 2:
                    console.log('user wants to get their location');
                default:
            }},
        );
    };


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
