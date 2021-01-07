import React, { Component } from 'react';

const Context = React.createContext();
// reducer dile manages states and handels erorrs
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      // const { name, country } = action.payload.city;
      const {
        list,
        city: { name, country }
      } = action.payload;
      return {
        ...state,
        city: name,
        country,
        list,
        loading: false,
        error: ''
      };
    case 'RESET_FORM':
      return {
        ...state,
        city: '',
        country: '',
        list: '',
        error: '',
        loading: false
      };
    case 'ERROR':
      return {
        ...state,
        city: '',
        country: '',
        list: '',
        error: action.payload,
        loading: false
      };
    case 'LOADING':
      return {
        ...state,
        city: '',
        country: '',
        list: '',
        error: '',
        loading: true
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    city: '',
    country: '',
    list: '',
    error: '',
    loading: false,
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
