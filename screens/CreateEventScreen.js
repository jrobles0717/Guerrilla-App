import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as eventsActions from '../store/actions/events';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const CreateEventScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const [dateValue2, setDateValue2] = useState(new Date());
    const [modeValue, setModeValue] = useState('dateValue2');
    const [showValue, setShowValue] = useState(false);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const dispatch = useDispatch();

    const today = new Date();
    const dateString = new Date(today.getFullYear(), parseInt(today.getMonth()), today.getDate());
    //console.log(dateString);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateValue2;
        setShowValue(Platform.OS === 'ios');
        setDateValue2(currentDate);

    };

    const showMode = currentMode => {
        setShowValue(true);
        setModeValue(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
        setPickerVisible(true);
    };

    const hidePicker = () => {
        setPickerVisible(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDateValue2(date);
        hidePicker();
    };

    const showTimePicker = () => {
        showMode('time');
        setPickerVisible(true);
    };

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const descriptionChangeHandler = text => {
        setDescriptionValue(text);
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

    const saveEventHandler = () => {
        dispatch(eventsActions.addEvent(
            titleValue, 
            descriptionValue, 
            dateValue2.toDateString(), 
            dateValue2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
            nameValue, 
            selectedImage, 
            selectedLocation
        ));
        props.navigation.goBack();
    };

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
                <Text>{dateValue2.toDateString()}</Text>
                <View>
                    <Button onPress={showDatePicker} title="Pick Date" />
                </View>
                {showValue && (
                    <DateTimePickerModal
                    testID="dateTimePicker"
                    value={dateValue2}
                    mode={modeValue}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={dateString}
                    isVisible={isPickerVisible}
                    onConfirm={handleConfirm}
                    onCancel={hidePicker}
                    date={dateValue2}
                    />
                )}
                <Text style={styles.label}>Time</Text>
                <Text>{dateValue2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                <View>
                    <Button onPress={showTimePicker} title="Pick Time" />
                </View>
                <Text style={styles.label}>Name</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={nameChangeHandler}
                value={nameValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker 
                navigation={props.navigation}
                onLocationPicked={locationPickedHandler}
                />
                <Button 
                title="Save Event"
                color={Colors.add}
                onPress={saveEventHandler}
                />
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