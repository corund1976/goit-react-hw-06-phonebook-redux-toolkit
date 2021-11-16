import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const addContact = createAction('phonebook/AddContact', ({ name, number }) => {
  return {
    payload: {
      id: uuidv4(),
      name,
      number,
    },
  };
});

export const deleteContact = createAction('phonebook/DeleteContact');

export const changeFilter = createAction('phonebook/ChangeFilter');