import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import actionTypes from './phonebook-types';

const initialContacts = JSON.parse(window.localStorage.getItem('contacts')) ?? [];

const initialState = {
  contacts: {
    items: initialContacts,
    filter: '',
  },
};
  
const contactsItemsReducer = createReducer(initialState.contacts.items, {
  [actionTypes.ADD_CONTACT]: (state, { payload }) => [...state, payload],
  [actionTypes.DELETE_CONTACT]: (state, { payload }) => state.filter(({ id }) => id !== payload),
});

const contactsFilterReducer = createReducer(initialState.contacts.filter, {
  [actionTypes.CHANGE_FILTER]: (state, { payload }) => payload,
});

export default combineReducers({
  items: contactsItemsReducer,
  filter: contactsFilterReducer,
});