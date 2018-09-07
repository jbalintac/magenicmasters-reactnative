import React from 'react';
import { 
    Text, 
    Button, 
    TextInput, 
    TouchableOpacity, 
    View,
    FlatList, 
    ActivityIndicator, 
    AsyncStorage,
    StyleSheet,
    Platform,
    NetInfo
} from 'react-native';
import { createBottomTabNavigator  } from 'react-navigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: Failed child context type', 'Module RCTImageLoader']);

const SQLite = require('react-native-sqlite-storage')
const db = Platform.select({
    ios: () => SQLite.openDatabase({name: 'my.db', location: 'default'}, () =>  {},  () =>  {}),
    android: () => SQLite.openDatabase({name: 'my.db', location: 'Library'},  () =>  {},  () =>  {}),
})();




class NetworkScreen extends React.Component {


    constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }
    
      componentDidMount(){
        return fetch('https://launchlibrary.net/1.3/agency')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson.agencies,
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
      }
    
    
    
      render(){
    
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
    
        return(
          <View style={{flex: 1, paddingTop:20}}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => <Text>{item.name}, {item.countryCode}</Text>}
              keyExtractor={(item, index) => index}
            />
          </View>
        );
      }
}

    

class SQLiteScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
  

        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS TextTable (text)');
        });
    }

    _storeData = async () => {
        try {
            db.transaction(tx => {
                tx.executeSql('DELETE FROM TextTable');    
                tx.executeSql('INSERT INTO TextTable (text) values (?)', [this.state.text]);    
            });
        } catch (error) {
          // Error saving data
        }
      }

      _retrieveData = async () => {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT text FROM TextTable', [], (tx, results) => {
                    const value = results.rows.item(0).text;
                    this.setState({
                        text: value
                    });
                });
            });

         } catch (error) {
           // Error retrieving data
         }
      }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>

                <Text>Save a text, change it and revert it back by Get Saved:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text} 
                /> 

                <View style={styles.buttonSpacer} />
                <Button
                    title="Save"
                    onPress={() => {
                        this._storeData();
                    }}
                />
                <View style={styles.buttonSpacer} />
                <Button
                    title="Get Saved"
                    onPress={() => {
                        this._retrieveData();
                    }}
                />
            </View>
        );
    }
}

class AsyncScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }


    _storeData = async () => {
        try {
          await AsyncStorage.setItem('text', this.state.text);
        } catch (error) {
          // Error saving data
        }
      }

      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('text');
          if (value !== null) {
            // We have data!!
            console.log(value);

            this.setState({
                text: value
            });


          }
         } catch (error) {
           // Error retrieving data
         }
      }
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>

                <Text>Save a text, change it and revert it back by Get Saved:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text} 
                /> 

                <View style={styles.buttonSpacer} />
                <Button
                    title="Save"
                    onPress={() => {
                        this._storeData();
                    }}
                />
                <View style={styles.buttonSpacer} />
                <Button
                    title="Get Saved"
                    onPress={() => {
                        this._retrieveData();
                    }}
                />
            </View>
        );
    }
}

class OfflineScreen extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            NetworkStatus: ''
        }
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(hasInternetConnection => {
            this.setState({NetworkStatus: hasInternetConnection ? 'Online' : 'Offline'})
          });

        NetInfo.isConnected.addEventListener('connectionChange', hasInternetConnection => {
           this.setState({NetworkStatus: hasInternetConnection ? 'Online' : 'Offline'})
        });
    }
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Off wifi and mobile network to change status:</Text>
                <Text>{ this.state.NetworkStatus }</Text>
            </View>
        );
    }
}



export default createBottomTabNavigator({
    
    NetworkScreen: {
        screen: NetworkScreen,
        navigationOptions: {tabBarLabel: "Network"},
    },
    SQLiteScreen: {
        screen: SQLiteScreen,
        navigationOptions: {tabBarLabel: "SQLite"},
    },
    AsyncScreen: {
        screen: AsyncScreen,
        navigationOptions: {tabBarLabel: "Async"},
    },
    OfflineScreen: {
        screen: OfflineScreen,
        navigationOptions: {tabBarLabel: "Offline"},
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
    }
});