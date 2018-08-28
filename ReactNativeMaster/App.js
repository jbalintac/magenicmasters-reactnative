import React from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTheThing: true,
            text: 'Edit me'
        }
      }

    clearText = () => {
        this.setState({text: ''})  /* (1) Use setState to change the component’s value */
    }

    hideText = () => {
        this.setState({showTheThing: !this.state.showTheThing}) /* (2) Use setState to show/hide a component */
    }

    render() {
        return (
            <View style={{flex: 1}}>
                 
            {
                this.state.showTheThing && 

                <TextInput
                    ref={component => this._textInput = component}
                    style={{height: 50, flex: 1, marginHorizontal: 20, borderWidth: 1, borderColor: '#ccc'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text} 
                /> /* (3) Tie to state (25 points) */ /* (4) Added editing components to screen  */
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
