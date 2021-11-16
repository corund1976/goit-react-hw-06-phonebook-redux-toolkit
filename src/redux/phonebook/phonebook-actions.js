import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import actionTypes from './phonebook-types';

export const addContact = createAction(actionTypes.ADD_CONTACT, ({ name, number }) => {
  return {
    payload: {
      id: uuidv4(),
      name,
      number,
    },
  };
});

export const deleteContact = createAction(actionTypes.DELETE_CONTACT);

export const changeFilter = createAction(actionTypes.CHANGE_FILTER);