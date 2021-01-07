import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// searches for the current location by zipcode
const SearchZip = ({ value, onChange, onResetClick }) => {
  return (
    <Fragment>
      <input
        type="text"
        className="form-control"
        name="zipcode"
        placeholder="Lookup Zip Code..."
        value={value}
        onChange={onChange}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-primary" type="submit">
          <i className="fas fa-search" />
          <span className="d-none d-sm-inline"> Search</span>
        </button>
      </div>
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={onResetClick}
        >
          <i className="fas fa-undo" />
          <span className="d-none d-md-inline"> Reset</span>
        </button>
      </div>
    </Fragment>
  );
};

SearchZip.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired
};

export default SearchZip;
