import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CreateEventScreen from '../screens/CreateEventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import MainPageScreen from '../screens/MainPageScreen';
import Colors from '../constants/Colors';

const EventNavigator = createStackNavigator({
    MainPage: MainPageScreen,
    CreateEvent: CreateEventScreen,
    EventDetail: EventDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.header : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.header
    }
});

const AppContainer = createAppContainer(EventNavigator);

export default AppContainer;