import React, { Component } from "react";
import Form from "react-validation/build/form";
import "./preference.scss";
import AuthService from "../../services/auth.service";
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    // initial state of preferences
    this.state = { countries: [], categories: [], checked: false };
    this.handleSave = this.handleSave.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCntrCheck = this.handleCntrCheck.bind(this);
    this.handleCntrInputChange = this.handleCntrInputChange.bind(this);
    this.deleteMyAcc = this.deleteMyAcc.bind(this);
  }
  // gets user preferences from server
  componentDidMount() {
    fetch("http://localhost:8001/api/user/getPreferences?id=" + JSON.parse(localStorage.getItem("user")).id).then((results) => { return results.json() }).then((results) => this.setState({ categories: results.categories, countries: results.countries }))
  }

  // delete user account
  deleteMyAcc(event) { // confirmation of request
    if (window.confirm("Are you sure want to delete your account?")) {
      axios.delete("http://localhost:8001/api/user/delete?id=" + JSON.parse(localStorage.getItem("user")).id).then((data) => localStorage.removeItem("user"))
      AuthService.logout(); // logs user out and deletes account
      window.location.replace("/");
    }
  }

  // handles input change of categories checked
  handleInputChange(event) {
    const target = event.target;
    if (!target.checked) {
      const cats = this.state.categories;
      var index = cats.indexOf(target.name)
      if (index !== -1) {
        cats.splice(index, 1);
        this.setState({ categories: cats });
      }

    } else {
      const cats = this.state.categories;
      cats.push(target.name)
      this.setState({ categories: cats })
    }
  }

  // handles input check of countries checked 
  handleCntrInputChange(event) {
    const target = event.target;
    if (!target.checked) {
      const cats = this.state.countries;
      var index = cats.indexOf(target.name)
      if (index !== -1) {
        cats.splice(index, 1);
        this.setState({ countries: cats });
      }

    } else {
      const cats = this.state.countries;
      cats.push(target.name)
      this.setState({ countries: cats })
    }
  }

  // saves new user categories checked
  handleSave(e) {
    e.preventDefault();
    var catlist = [];
    var countryList = [];
    var catagory = document.getElementsByClassName("catagory");
    for (var i = 0; i < catagory.length; i++) {
      if (catagory.item(i).checked) {
        catlist.push(catagory.item(i).getAttribute("catName"));
      }
    }
    // saves new user countries checked
    localStorage.setItem('userCat', catlist);
    var country = document.getElementsByClassName("country");
    for (var j = 0; j < country.length; j++) {
      if (country.item(j).checked) {
        countryList.push(country.item(j).getAttribute("cntrName"));
      }
    }
    // updates user preferences
    axios.put("http://localhost:8001/api/user/update", { "id": JSON.parse(localStorage.getItem("user")).id, "categories": catlist, "countries": countryList })
    localStorage.setItem('userCntry', countryList);
    alert("Changes saved successfully!")
  }

  handleCheck(val) {
    return this.state.categories.indexOf(val) > -1;
  }
  handleCntrCheck(val) {
    return this.state.countries.indexOf(val) > -1;
  }

  render() {
    return (
      <div className="loginPage">
        <div className="card card-container">
          <Form
            onSubmit={this.handleSave}
            ref={c => {
              this.form = c;
            }} class="loginForm1"
          >
            <div className="form-group prefMainDiv">
              <div className="prefHead"><h3>Catagory Preference List</h3></div>

              <div class="checkSection">

                <div class="checkboxClass"><input type="checkbox" name="Business" catName="Business" class="catagory" onChange={this.handleInputChange} checked={this.handleCheck("Business")} /> <label>Business</label></div>
                <div class="checkboxClass"><input type="checkbox" name="Entertainment" catName="Entertainment" class="catagory" onChange={this.handleInputChange} checked={this.handleCheck("Entertainment")} /> <label>Entertainment</label></div>
                <div class="checkboxClass"><input type="checkbox" name="General" catName="General" class="catagory" onChange={this.handleInputChange} checked={this.handleCheck("General")} /> <label>General</label></div>
                <div class="checkboxClass"><input type="checkbox" name="Health" catName="Health" class="catagory" onChange={this.handleInputChange} checked={this.handleCheck("Health")} /> <label>Health</label></div>

                <div class="checkboxClass"><input type="checkbox" name="Science" catName="Science" class="catagory" onChange={this.handleInputChange} checked={this.handleCheck("Science")} /> <label>Science</label></div>
                <div class="checkboxClass"><input type="checkbox" name="Sports" catName="Sports" class="catagory" onChange={this.handleInputChange} checked={this.handleCheck("Sports")} /> <label>Sports</label></div>
                <div class="checkboxClass"><input type="checkbox" name="Technology" catName="Technology" class="catagory" onChange={this.handleInputChange} checked={this.handleCheck("Technology")} /> <label>Technology</label></div>
              </div>

            </div>
            <div className="form-group prefMainDiv">
              <div className="prefHead"><h3>Country Preference List</h3></div>
              <div>
                <div class="checkSection">
                  <div class="checkboxClass"><input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("United States of America")} name="United States of America" cntrName="United States of America" class="country" /> <label>United States of America</label></div>
                  <div class="checkboxClass"><input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("United Kingdom")} name="United Kingdom" cntrName="United Kingdom" class="country" /> <label>United Kingdom</label></div>
                  <div class="checkboxClass"><input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("Canada")} name="Canada" cntrName="Canada" class="country" /> <label>Canada</label></div>
                  <div class="checkboxClass"> <input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("China")} name="China" cntrName="China" class="country" /> <label>China</label></div>
                  <div class="checkboxClass"> <input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("Russia")} name="Russia" cntrName="Russia" class="country" /> <label>Russia</label></div>
                  <div class="checkboxClass"> <input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("France")} name="France" cntrName="France" class="country" /> <label>France</label></div>
                </div>
                <div class="checkSection">
                  <div class="checkboxClass"> <input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("Philippines")} name="Philippines" cntrName="Philippines" class="country" /> <label>Philippines</label></div>
                  <div class="checkboxClass"> <input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("United Arab Emirates")} name="United Arab Emirates" cntrName="United Arab Emirates" class="country" /> <label>United Arab Emirates</label></div>
                  <div class="checkboxClass"><input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("Australia")} name="Australia" cntrName="Australia" class="country" /> <label>Australia</label> </div>
                  <div class="checkboxClass"><input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("Argentina")} name="Argentina" cntrName="Argentina" class="country" /> <label>Argentina</label></div>
                  <div class="checkboxClass"> <input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("South Korea")} name="South Korea" cntrName="South Korea" class="country" /> <label>South Korea</label></div>
                  <div class="checkboxClass"><input type="checkbox" onChange={this.handleCntrInputChange} checked={this.handleCntrCheck("Indonesia")} name="Indonesia" cntrName="Indonesia" class="country" /> <label>Indonesia</label></div>
                </div>
              </div>
              <div className="form-group newsButtons">
                <button
                  className="btn btn-primary btn-block"
                >
                  <span>Save</span>
                </button>
              </div>
            </div>

          </Form>
          <div className="form-group newsButtons"><button onClick={this.deleteMyAcc}
            className="btn btn-primary btn-block"
          ><span>Delete My Account</span>
          </button></div>
        </div>
      </div>
    );
  }
}