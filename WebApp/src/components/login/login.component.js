import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./login.scss";
import AuthService from "../../services/auth.service";

// checks if required value is left blank
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    // state of login component
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  //sets username
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  // sets password
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  // handles login
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    // method to check validation functions
    this.form.validateAll();

    // verifies if form validation is successful or not
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          fetch("http://localhost:8001/api/user/getPreferences?id=" + JSON.parse(localStorage.getItem("user")).id).then((results) => { return results.json() }).then((results) => localStorage.setItem("userCat",results.categories))
          fetch("http://localhost:8001/api/user/getPreferences?id=" + JSON.parse(localStorage.getItem("user")).id).then((results) => { return results.json() }).then((results) => localStorage.setItem("userCntry",results.countries))
          fetch("http://localhost:8001/api/user/getPreferences?id=" + JSON.parse(localStorage.getItem("user")).id).then((results) => { return results.json() }).then((results) => localStorage.setItem("bookmarks",results.bookmarks))
          // localStorage.setItem("userCat",fetch("http://localhost:8001/api/user/getPreferences?id="+JSON.parse(localStorage.getItem("user")).id).then((results) => { return results.json() })).then((results) => {return results;})
          this.props.history.push("/");

          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }


    
  }

  render() {
    return (
      <div className="loginPage">
        <div className="card card-container loginCompo">
          <div className="innerFormLogin">
          <img
            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }} class="loginForm"
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group loginButtons">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          </div>
        </div>
      </div>
    );
  }
}