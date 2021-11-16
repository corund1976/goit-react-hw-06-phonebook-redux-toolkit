import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import s from './ContactForm.module.css';
import { addContact } from '../../redux/phonebook/phonebook-actions';

function ContactForm({ contactsToContactForm, onSubmitForm }) {
  const [name,setName] = useState('');
  const [number,setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name': setName(value);
        break;
      case 'number': setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Проверка на повторный ввод существующего контакта
    const normalizedName = name.toLowerCase();
    contactsToContactForm.some(contact => contact.name.toLowerCase() === normalizedName)
      ?
        alert(`${name} is already in contacts.`)
      : 
        onSubmitForm({ name, number });
    resetLocalState();
  };

  const resetLocalState = () => {
    setName('');
    setNumber('');
  };

  return (
    <form
      onSubmit={handleSubmit} 
      className={s.form} 
      autoComplete="off">
      
      <label className={s.label}>
        Name
        <input
          name="name"
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
              value={name}
              onChange={handleChange}
              className={s.input}
        />
      </label>

      <label className={s.label}>
        Number
        <input
          name="number"
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
              value={number}
              onChange={handleChange}
              className={s.input}
        />
      </label>        

      <button type="submit" className={s.btn}>Add contact</button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    contactsToContactForm: state.contacts.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: ({ name, number }) => dispatch(addContact({ name, number })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

ContactForm.propTypes = {
  contactsToContactForm: PropTypes.arrayOf(
    PropTypes.shape()).isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};