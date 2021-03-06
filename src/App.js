import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { store } from './Config/store';

import AddScreen from './Screens/AddScreen';
import AuthScreen from './Screens/AuthScreen';
import EditScreen from './Screens/EditScreen';
import HolidayScreen from './Screens/HolidayScreen';
import SettingsScreen from './Screens/SettingsScreen';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDxKpOMDZPumQWnNSUA6_WRaKcQHHnhF4g',
            authDomain: 'manager-7ff67.firebaseapp.com',
            databaseURL: 'https://manager-7ff67.firebaseio.com',
            projectId: 'manager-7ff67',
            storageBucket: 'manager-7ff67.appspot.com',
            messagingSenderId: '779606209015'
        };

        firebase.initializeApp(config);
    };


    render() {
        const MainNavigator = TabNavigator({
            auth: { screen: AuthScreen },
            main: {
                screen: TabNavigator({
                    holidays: {
                        screen: HolidayScreen,
                        navigationOptions: {
                            tabBarLabel: 'HOLIDAY',
                            tabBarIcon: () => <Icon
                                name='user-o'
                                size={35}
                                style={{ color: 'gray' }}
                            />
                        }
                    },
                    add: { screen: AddScreen },
                    edit: { screen: EditScreen },
                    settings: { screen: SettingsScreen }
                }, {
                        tabBarPosition: 'bottom',
                        swipeEnabled: false,
                        tabBarOptions: {
                            labelStyle: { fontSize: 12 }
                        }
                    })
            }

        }, {
                tabBarPosition: 'bottom',
                swipeEnabled: false,
                navigationOptions: {
                    tabBarVisible: false
                }

            });

        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

export default App;
