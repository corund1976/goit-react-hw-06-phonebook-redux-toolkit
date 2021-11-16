import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import s from './ContactList.module.css';
import Contact from '../Contact';

function ContactList({ contactsToContactList }) {
  return (
    <ul className={s.contactList}>
      {contactsToContactList.map(({ id, name, number }) => {
        return (
          <li key={id} className={s.contactItem}>
            <Contact
              name={name}
              number={number}
              id={id}>
            </Contact>
          </li>
        );
      })}
    </ul>
  );
};

const getVisibleContacts = (items, filter) => {
    const normalizedFilter = filter.trim().toLowerCase();

    return items.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter) ||
      item.number.includes(filter.trim())
    );
  };

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contactsToContactList: getVisibleContacts(items, filter),
});
// const mapStateToProps = state => {
//   const { items, filter } = state.contacts;
//   const visibleContacts = getVisibleContacts(items, filter);

//   return {
//     contactsToContactList: visibleContacts,
//   };
// };

export default connect(mapStateToProps)(ContactList);

ContactList.propTypes = {
  contactsToContactList: PropTypes.arrayOf(
    PropTypes.shape()).isRequired,
};