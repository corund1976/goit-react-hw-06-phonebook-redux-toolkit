import { v4 as uuidv4 } from 'uuid';
import actionTypes from './phonebook-types';

//===== Добавление нового контакта =====
export const addContact = ({ name, number }) => {
  return {
    type: actionTypes.ADD_CONTACT,
    payload: {
      id: uuidv4(),
      name,
      number,
    },
  };
};

//===== Удаление контакта =====
export const deleteContact = id => {
  return {
    type: actionTypes.DELETE_CONTACT,
    payload: id,
  };
};

// ===== Изменение фильтра =====
export const changeFilter = filterValue => {
  return {
    type: actionTypes.CHANGE_FILTER,
    payload: filterValue,
  };
};