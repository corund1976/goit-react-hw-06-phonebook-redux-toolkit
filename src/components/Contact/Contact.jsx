import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import s from './Contact.module.css';
import { deleteContact } from '../../redux/phonebook/phonebook-actions';

function Contact({ name, number, id, onDeleteContact }) { 
  return (
    <>
      <p className={s.contact}>• {name}: {number}</p>
      <button className={s.btn} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteContact: id => dispatch(deleteContact(id)),
  };
};

export default connect(null, mapDispatchToProps)(Contact);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};