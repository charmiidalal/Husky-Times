import React from 'react';
import PropTypes from 'prop-types';
// Add spinner in the webapp for loading
const Spinner = ({ color }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className={`spinner-border text-${color} m-auto`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

Spinner.defaultProps = {
  color: 'primary'
};

Spinner.propTypes = {
  color: PropTypes.string.isRequired
};

export default Spinner;
