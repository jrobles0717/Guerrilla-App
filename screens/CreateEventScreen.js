import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ImagePicker from '../components/ImagePicker';

const CreateEventScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const descriptionChangeHandler = text => {
        setDescriptionValue(text);
    };

    const dateChangeHandler = text => {
        setDateValue(text);
    };

    const timeChangeHandler = text => {
        setTimeValue(text);
    };

    const nameChangeHandler = text => {
        setNameValue(text);
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback( location => {
        setSelectedLocation(location);
    }, []);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={titleChangeHandler}
                value={titleValue}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={descriptionChangeHandler}
                value={descriptionValue}
                />
                <Text style={styles.label}>Date</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={dateChangeHandler}
                value={dateValue}
                />
                <Text style={styles.label}>Time</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={timeChangeHandler}
                value={timeValue}
                />
                <Text style={styles.label}>Name</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={nameChangeHandler}
                value={nameValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler}/>
            </View>
        </ScrollView>
    );
};

CreateEventScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Create Event',
        headerRight: () => 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title="Save"
                iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
                onPress={() => {
                    navData.navigation.navigate('MainPage');
                }}
                color={Colors.add}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default CreateEventScreen;