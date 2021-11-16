import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { addContact, deleteContact, changeFilter } from './phonebook-actions';

const initialContacts = JSON.parse(window.localStorage.getItem('contacts')) ?? [];

const initialState = {
  contacts: {
    items: initialContacts,
    filter: '',
  },
};
  
const contactsItemsReducer = createReducer(initialState.contacts.items, {
  [addContact]: (state, { payload }) => [...state, payload],
  [deleteContact]: (state, { payload }) => state.filter(({ id }) => id !== payload),
});

const contactsFilterReducer = createReducer(initialState.contacts.filter, {
  [changeFilter]: (state, { payload }) => payload,
});

export default combineReducers({
  items: contactsItemsReducer,
  filter: contactsFilterReducer,
});