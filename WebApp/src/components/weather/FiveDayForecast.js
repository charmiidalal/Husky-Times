import React, { Component, Fragment } from 'react';
import { Consumer } from '../../context';
import FiveDayDisplay from './FiveDayDisplay';
import PropTypes from 'prop-types';

class FiveDayForecast extends Component {
  render() {
    const { isOpen } = this.props;

    return (
      <Consumer>
        {value => {
          const { list } = value;
          let dailyForecast = [];

          for (let i = 0; i < list.length; i += 8) {
            dailyForecast.push(list[i]);
          }

          return (
            <Fragment>
              {isOpen && (    // displays the last 5 day weather 
                <div className="card card-body">
                  <div className="row">
                    <div className="col-11 mx-auto">
                      <div className="card-body">
                        <h4 className="weatherBody m-0">5-Day Forecast</h4>
                        <FiveDayDisplay forecast={dailyForecast} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

FiveDayForecast.propTypes = {
  isOpen: PropTypes.bool
};

export default FiveDayForecast;
