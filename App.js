import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import EventNavigator from './navigation/EventNavigator';

export default function App() {
  return (
    <EventNavigator />
  );
}
