import React from 'react';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';

const MainPageScreen = props => {
    return (
        <ScrollView>
            <View style={styles.textContainer}>
                <Text>Events Screen!</Text>
            </View>
        </ScrollView>
    );
};

MainPageScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Events',
        headerRight: () => 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title="Add Event"
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => {
                    navData.navigation.navigate('CreateEvent');
                }}
                color={Colors.add}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 30
    }
});

export default MainPageScreen;