import React from 'react';
import { Provider } from './context';
import Header from './components/layout/Header';
import SearchForm from './components/search/SearchForm';
import WeatherDashboard from './components/weather/WeatherDashboard';
import Footer from './components/layout/Footer';

import './scss/main.scss';

const Weather = () => {
  return (
    <Provider>
        <div className="App">
          <div className="container">
            <div className="row no-gutters">
              <div className="col">
                <div className="d-flex flex-column mt-3">
                  <Header />
                  <SearchForm />
                  <WeatherDashboard />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Provider>
  );
};

export default Weather;
