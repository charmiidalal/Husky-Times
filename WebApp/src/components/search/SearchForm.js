import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import SearchGeo from './SearchGeo';
import SearchZip from './SearchZip';
import classnames from 'classnames';
// searches for the current location by zipcode with forcasts
class SearchForm extends Component {
  // initial state
  state = {
    zipcode: '',
    coordinates: null
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onResetClick = dispatch => {
    this.setState({ zipcode: '' }); // blank zipcode onload

    dispatch({
      type: 'RESET_FORM'
    });
  };

  getWeather = async (dispatch, e) => {
    e.preventDefault();
    const { zipcode, coordinates } = this.state; // sets state of zipcode and coordinates

    dispatch({ type: 'LOADING' });

    // Get request using coordinates if available
    try {
      if (this.state.coordinates) {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude
          }&lon=${coordinates.longitude}&appid=7ec4719c8fca5b9800a651e5991ca88d`
        );

        dispatch({ type: 'UPDATE_LOCATION', payload: res.data });

        this.setState({
          ...this.state,
          coordinates: null
        });
      } else {
        // Get request using user input
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=7ec4719c8fca5b9800a651e5991ca88d`
        );

        dispatch({ type: 'UPDATE_LOCATION', payload: res.data });
      }
    } catch (e) {
      dispatch({
        type: 'ERROR',
        payload: 'Please enter a valid US zip code.'
      });
    }
  };

  // finds location
  findGeolocation = (dispatch, e) => {
    e.persist();
    e.preventDefault();

    dispatch({ type: 'LOADING' });

    const success = position => {
      this.setState({
        zipcode: '',
        coordinates: position.coords
      });

      this.getWeather(dispatch, e);
    };

    const error = () => {
      dispatch({ type: 'ERROR', payload: 'Geolocation must be enabled' });
    };

    // Check if geolocation is enabled
    if (!navigator.geolocation) {
      dispatch({ type: 'ERROR', payload: 'Geolocation must be enabled' });
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, error, loading } = value;
          return (
            <div
              className={classnames('border border-primary p-2 weatherBox', {
                'border-danger': error
              })}
            >
              <div className="d-flex flex-row justify-content-center">
                {loading ? (
                  <Spinner />
                ) : (
                    <form
                      className="form-inline py-2"
                      onSubmit={this.getWeather.bind(this, dispatch)}
                    >
                      <div className="form-group">
                        <div className="input-group">
                          <SearchGeo
                            findGeolocation={this.findGeolocation.bind(
                              this,
                              dispatch
                            )}
                          />
                          <SearchZip
                            value={this.state.zipcode}
                            onChange={this.onChange}
                            onResetClick={this.onResetClick.bind(this, dispatch)}
                          />
                        </div>
                      </div>
                    </form>
                  )}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default SearchForm;
