import React, { Fragment, useEffect } from 'react';

// React Router Dom
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './components/signup/signup.component';
import Login from './components/login/login.component';
import Weather from './components/weather/weather.component';
import Preference from './components/preference/preference.component';
import Video from './components/video/video.component';
// Redux Store
import { Provider } from 'react-redux';
import store from './store';

// Pages
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';

import TopNav from './layout/TopNav';
import { getNewsSource, setTheme } from './actions/news';
import { getBookmarkItems } from './actions/bookmarks';
import Stocks from './pages/Stock';

document.title = "Times of Huskies";

const App = () => {
  useEffect(() => {
    store.dispatch(getNewsSource());
    store.dispatch(setTheme());
    store.dispatch(getBookmarkItems());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <TopNav />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/stocks' exact component={Stocks} />
            <Route path='/bookmarks' exact component={Bookmarks} />
            <Route exact path="/weather" component={Weather} />
            <Route exact path="/videos" component={Video} />
            <Route exact path="/preference" component={Preference} />
            <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />         
            <Route exact path="/" render={() => (<Redirect to="./pages/Home" />)} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
