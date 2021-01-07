import React from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';
// header of the web app
const Header = () => {
  return (
    <Consumer>
      {value => {
        const { city, country, error, loading } = value;

        return (
          <div className="">
            <div
              className={classnames(
                'card-body text-white text-center',
                { 'bg-danger': error }
              )}
            >
              {loading ? (
                <Spinner color="text-white" />
              ) : (
                  <h1 className="display-4 text-white" >
                    <strong>
                      {city ? `${city}, ${country}` : 'Weather Conditions'}
                    </strong>
                  </h1>
                )}
            </div>
          </div>
        );
      }}
    </Consumer>
  );
};

export default Header;
