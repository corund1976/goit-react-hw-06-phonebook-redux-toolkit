import { combineReducers } from 'redux';
import actionTypes from './phonebook-types';

const initialContacts = JSON.parse(window.localStorage.getItem('contacts')) ?? [];

const initialState = {
  contacts: {
    items: initialContacts,
    filter: '',
  },
};
  
const contactsItemsReducer = (state = initialState.contacts.items, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_CONTACT:
      return [...state, payload];
    
    case actionTypes.DELETE_CONTACT:
      return state.filter(({ id }) => id !== payload);

    default:
      return state;
  };
};

const contactsFilterReducer = (state = initialState.contacts.filter, { type, payload }) => {
  switch (type) {
    case actionTypes.CHANGE_FILTER:
      return payload;
    
    default:
      return state;
  };
};

export default combineReducers({
  items: contactsItemsReducer,
  filter: contactsFilterReducer,
});