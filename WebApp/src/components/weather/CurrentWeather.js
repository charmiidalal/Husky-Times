import React, { Component, Fragment } from 'react';
import { Consumer } from '../../context';
import convertUppercase from '../../utils/convertUppercase';
import convertTemp from '../../utils/convertTemp';
import convertTime from '../../utils/convertTime';
import convertWindDirection from '../../utils/convertWindDirection';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

class CurrentWeather extends Component {
  render() {
    const { isOpen } = this.props;
    return (
      <Consumer>
        {value => {
          const current = value.list[0];
          const condition = current.weather[0].description,
            temperature = convertTemp(current.main.temp),
            lowTemp = convertTemp(current.main.temp_min),
            highTemp = convertTemp(current.main.temp_max),
            humidity = current.main.humidity,
            wind = (current.wind.speed * 2.23694).toFixed(2),
            icon = current.weather[0].icon,
            time = convertTime(),
            direction = convertWindDirection(current.wind.deg);

          return (
            <Fragment>
              {isOpen && (
                <div className="card card-body">
                  <div className="row">
                    <div className="col-sm-7 mx-auto">
                      <div className="card-body">
                        <h4 className="weatherBody m-0 p-0">
                          <Moment format="MMMM Do YYYY" />
                        </h4>

                        <div className="row">
                          <div className="col-md-6 align-self-center">
                            <div className="card-body weatherBody align-self-center p-0 m-0">
                              <h2 className="">
                                <strong>{temperature}° F</strong>
                              </h2>
                              <p className="my-0">
                                Low: {lowTemp}° | High: {highTemp}°
                              </p>
                              <small>As of: {time}</small>
                            </div>
                          </div>

                          <div className="col-md-6 align-self-center">
                            <div className="card-body align-self-center pt-0 mt-2">
                              <img
                                className="my-0"
                                src={`https://openweathermap.org/img/w/${icon}.png`}
                                alt=""
                              />
                              <p className="m-0">
                                {convertUppercase(condition)}
                              </p>
                              <p className="m-0">Humidity: {humidity}%</p>
                              <p className="m-0">
                                Wind Speed: {wind} MPH {direction}
                              </p>
                            </div>
                          </div>
                        </div>
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

CurrentWeather.propTypes = {
  isOpen: PropTypes.bool
};

export default CurrentWeather;
