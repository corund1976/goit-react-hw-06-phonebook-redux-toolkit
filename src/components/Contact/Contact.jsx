import PropTypes from 'prop-types';
import s from './Contact.module.css';

function Contact({ name, number, onDelete }) { 
  return (
    <>
      <p className={s.contact}>• {name}: {number}</p>
      <button className={s.btn} onClick={onDelete}>
        Delete
      </button>
    </>
  );
};

export default Contact;

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};