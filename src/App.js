import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import Container from './components/Container';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

function App({ contactsToApp }) {
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contactsToApp));
  }, [contactsToApp]);

  return (
    <Container>
      <Section>
        <h1>Phonebook</h1>
        <ContactForm />
      </Section>
      
      <Section>
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </Section>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    contactsToApp: state.contacts.items,
  };
};

export default connect(mapStateToProps)(App);

App.propTypes = {
  contactsToApp: PropTypes.arrayOf(
    PropTypes.shape()).isRequired,
};