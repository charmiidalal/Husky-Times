import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTheme } from '../actions/news';
import AuthService from "../services/auth.service";
import './TopNav.scss';

const logout = () => {
  AuthService.logout();
  window.location.replace("/");
}

// Loads nav link with all the components redirection
var today = new Date(),
  month = today.getMonth();
// array of months
var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
var setMonth = months[month]

// sets date
const date = (setMonth) + ' ' + today.getDate() + ', ' + today.getFullYear();


const TopNav = ({ news, changeTheme }) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg={news.theme} variant={news.theme}>
      <Container>
        {!localStorage.getItem('user') ?
          <Navbar.Brand href='/'>Welcome Guest!</Navbar.Brand> :
          <Navbar.Brand href='/'>Welcome {JSON.parse(localStorage.getItem("user")).username}!</Navbar.Brand>}
        <span className="dateTime">
          {date}
        </span>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link activeClassName='active' exact as={NavLink} to='/'>
              Top News
            </Nav.Link>

            <Nav.Link activeClassName='active' as={NavLink} to='/Stocks'>
              Stocks
              </Nav.Link>
            <Nav.Link activeClassName='active' as={NavLink} to='/weather'>
              Weather

            </Nav.Link>
            <Nav.Link activeClassName='active' as={NavLink} to='/bookmarks'>
              Bookmarks
            </Nav.Link>
            <Nav.Link activeClassName='active' as={NavLink} to='/videos'>
              Videos
            </Nav.Link>
            {localStorage.getItem('user') ?
              <Nav.Link activeClassName='active' as={NavLink} to='/preference'>
                Settings
            </Nav.Link> : ""}
            {!localStorage.getItem('user') ?
              <Nav.Link to="/signup" activeClassName='active' as={NavLink} className="button_sign"><li>
                Sign Up
                </li></Nav.Link> : null}
            {!localStorage.getItem('user') ?
              <Nav.Link to="/login" activeClassName='active' as={NavLink} className="button_sign"><li>
                Login
                </li></Nav.Link> :
              <Nav.Link to="/" onClick={logout} activeClassName='active' as={NavLink} className="button_sign"><li>
                Logout
                </li></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  { changeTheme }
)(TopNav);
