import React from 'react';
import { 
    Text, 
    Button, 
    TextInput, 
    TouchableOpacity, 
    View,
    StyleSheet
} from 'react-native';
import { createBottomTabNavigator  } from 'react-navigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: Failed child context type', 'Module RCTImageLoader']);


import Swiper from 'react-native-swiper';


// class CameraScreen extends Component {
//     render() {
//       return (
//         <View style={styles.container}>
//           <RNCamera
//               ref={ref => {
//                 this.camera = ref;
//               }}
//               style = {styles.preview}
//               type={RNCamera.Constants.Type.back}
//               flashMode={RNCamera.Constants.FlashMode.on}
//               permissionDialogTitle={'Permission to use camera'}
//               permissionDialogMessage={'We need your permission to use your camera phone'}
//           />
//           <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
//           <TouchableOpacity
//               onPress={this.takePicture.bind(this)}
//               style = {styles.capture}
//           >
//               <Text style={{fontSize: 14}}> SNAP </Text>
//           </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }
  
//     takePicture = async function() {
//       if (this.camera) {
//         const options = { quality: 0.5, base64: true };
//         const data = await this.camera.takePictureAsync(options)
//         console.log(data.uri);
//       }
//     };
//   }

class SwiperScreen extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={true}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            </Swiper>
        );
    }
}



export default createBottomTabNavigator({
    

    // CameraScreen: {
    //     screen: CameraScreen,
    //     navigationOptions: {tabBarLabel: "Camera"},
    // },
    SwiperScreen: {
        screen: SwiperScreen,
        navigationOptions: {tabBarLabel: "Swiper"},
    }
});


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#BBDEFB"
    },
    topSpacer: {
        flex: 0.3
    },
    buttonSpacer: {
        flex: 0.2
    },
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
      }
});