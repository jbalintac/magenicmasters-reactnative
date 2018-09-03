import React from 'react';
import { 
    ScrollView, 
    Image, 
    Text, 
    TouchableHighlight, 
    View, 
    FlatList, 
    Animated,
    Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class ListScreen extends React.Component {

    listData = [ 
        { key: '1', name: 'Some person 1' }, 
        { key: '2', name: 'Some person 2' }, 
        { key: '3', name: 'Some person 3' }, 
        { key: '4', name: 'Some person 4' }, 
        { key: '5', name: 'Some person 5' }, 
        { key: '6', name: 'Some person 6' }, 
        { key: '7', name: 'Some person 7' }, 
        { key: '8', name: 'Some person 8' } 
    ];

    renderItem({ item, index }) {
       return (
            /* 2. Have a new screen when a list item is tapped using touchable components (25 points) */
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('ScrollScreen')}>
                <View style={{backgroundColor: 'white'}}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableHighlight>
       )
    }

    render() {
        return (
            /* 1. Create a flat list or section list (25 points) */
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={this.listData}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        );
    }
}

class ScrollScreen extends React.Component {
    
    render() {
        return (
            /* 3. The new screen should contain a scrollview with more contents than can fit on a screen (25 points) */
            <ScrollView> 
                <Text style={{fontSize:96}}>Scroll me plz</Text>
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Text style={{fontSize:96}}>If you like</Text>
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Text style={{fontSize:96}}>Scrolling down</Text>
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Text style={{fontSize:96}}>What's the best</Text>
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Text style={{fontSize:96}}>Framework around?</Text>
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                <Text style={{fontSize:80}}>React Native</Text>
            </ScrollView>
        );
    }
}

const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
          const { position, layout, scene, index, scenes } = sceneProps
          const toIndex = index
          const thisSceneIndex = scene.index
          const height = layout.initHeight
          const width = layout.initWidth
    
          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [width, 0, 0]
          })
    
          // Since we want the card to take the same amount of time
          // to animate downwards no matter if it's 3rd on the stack
          // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
          const translateY = position.interpolate({
            inputRange: [0, thisSceneIndex],
            outputRange: [height, 0]
          })
    
          const slideFromRight = { transform: [{ translateX }] }
          const slideFromBottom = { transform: [{ translateY }] }
    
          const lastSceneIndex = scenes[scenes.length - 1].index
    
          // Test whether we're skipping back more than one screen
          if (lastSceneIndex - toIndex > 1) {
            // Do not transoform the screen being navigated to
            if (scene.index === toIndex) return
            // Hide all screens in between
            if (scene.index !== lastSceneIndex) return { opacity: 0 }
            // Slide top screen down
            return slideFromBottom
          }
    
          return slideFromRight
        },
    }}


const RootStack = createStackNavigator(
    {
        ListScreen: ListScreen,
        ScrollScreen: ScrollScreen,
    },
    {
      initialRouteName: 'ListScreen',
      transitionConfig, /* 4. Animate the showing or removing of the new screen (25 points) */
    });
  
export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}