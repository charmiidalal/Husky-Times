import React from 'react';
import convertTemp from '../../utils/convertTemp';
import convertUppercase from '../../utils/convertUppercase';
import convertTime from '../../utils/convertTime';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const TodayForecastDisplay = ({ forecast }) => {
  return (
    <div className="row">
      {forecast.map(hour => {
        const date = new Date(`${hour.dt_txt.replace(/-/g, '/')} UTC`);
        const time = convertTime(hour.dt_txt);

        return (
          <div className="col-xs-auto mx-auto" key={time}>
            <div
              className="weatherBody item-hl mt-2"
              style={{ width: '150px', height: '225px' }}
            >
              <div className="card-body">
                <h4>
                  <Moment format="MM-DD">{date}</Moment>
                </h4>
                <small>{time}</small>
                <br />
                <img
                  src={`https://openweathermap.org/img/w/${
                    hour.weather[0].icon
                  }.png`}
                  alt=""
                />
                <p>{convertTemp(hour.main.temp)}° F</p>
                <p>{convertUppercase(hour.weather[0].description)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

TodayForecastDisplay.propTypes = {
  forecast: PropTypes.array.isRequired
};

export default TodayForecastDisplay;
