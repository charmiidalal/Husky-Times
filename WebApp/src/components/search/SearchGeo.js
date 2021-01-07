import React from 'react';
import PropTypes from 'prop-types';
// searches for the current location
const SearchGeo = ({ findGeolocation }) => {
  return (
    <div className="input-group-prepend">
      <button
        className="btn btn-outline-primary "
        type="button"
        onClick={findGeolocation}
      >
        <i className="fas fa-search-location" />
        <span className="d-none d-md-inline"> Use Current Location</span>
      </button>
    </div>
  );
};

SearchGeo.propTypes = {
  findGeolocation: PropTypes.func.isRequired
};

export default SearchGeo;
