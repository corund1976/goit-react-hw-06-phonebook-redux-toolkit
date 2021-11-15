import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import s from './Filter.module.css';
import { changeFilter } from '../../redux/phonebook/phonebook-actions';

function Filter({ filterToFilter, onChange }) {
  return (
    <label className={s.label}>
      Find contacts by name / number
      <input
        type="text"
        value={filterToFilter}
        onChange={onChange}
        className={s.input}>
      </input>
    </label>
  );
};

const mapStateToProps = state => {
  return {
    filterToFilter: state.contacts.filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: e => dispatch(changeFilter(e.currentTarget.value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filterToFilter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};