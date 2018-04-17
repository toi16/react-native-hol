import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AddScreen from '../Screens/AddScreen';
import AuthScreen from '../Screens/AuthScreen';
import EditScreen from '../Screens/EditScreen';
import HolidayScreen from '../Screens/HolidayScreen';
import SettingsScreen from '../Screens/SettingsScreen';


export const MainNavigator = TabNavigator({
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
