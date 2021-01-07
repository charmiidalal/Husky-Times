import React, { Component, Fragment } from 'react';
import { Consumer } from '../../context';
import TodayDisplay from './TodayDisplay';
import PropTypes from 'prop-types';

class TodayForecast extends Component {
  render() {
    const { isOpen } = this.props;
    return (
      <Consumer>
        {value => {
          const { list } = value;
          const todayForecast = list.slice(0, 5);

          return (
            <Fragment>
              {isOpen && (
                <div className="card card-body">
                  <div className="row">
                    <div className="col-11 mx-auto">
                      <div className="">
                        <h4 className="weatherBody m-0">12-Hour Forecast</h4>
                        <TodayDisplay forecast={todayForecast} />
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

TodayForecast.propTypes = {
  isOpen: PropTypes.bool
};

export default TodayForecast;
