import React from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTheThing: true
        }
    
      
      }

    clearText = () => {
    this._textInput.setNativeProps({text: ''});
    }

    hideText = () => {
    this.setState({showTheThing: !this.state.showTheThing})
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <Text>Text Input:</Text>
            {
                this.state.showTheThing && 

                <TextInput
                    ref={component => this._textInput = component}
                    style={{height: 50, flex: 1, marginHorizontal: 20, borderWidth: 1, borderColor: '#ccc'}}
                />
            }
            
            <TouchableOpacity onPress={this.clearText}>
                <Text>Clear text</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.hideText}>
                <Text>Show/Hide text</Text>
            </TouchableOpacity>
            </View>
        );
    }
}
