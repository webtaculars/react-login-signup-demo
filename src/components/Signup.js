import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  signup = async () => {
    if (this.validityCheck()) {
      const headers = {
        "Content-Type": "application/json"
      };
      const signupData = {
        display_name: this.state.displayName,
        email: this.state.email,
        password: this.state.password
      };
      try {
        const { data } = await axios.post(
          "https://evening-plateau-93775.herokuapp.com/api/v2/people/create",
          signupData,
          { headers }
        );
        localStorage.setItem("token", data.authentication_token);
        localStorage.setItem("name", data.person.display_name);
        this.props.history.push("/user");
      } catch (e) {
        console.log(e.message);
        alert("User could not be created");
      }
    } else {
      alert("Enter valid email address and password");
    }
  };

  validityCheck = () => {
    return (
      this.state.displayName &&
      this.state.email &&
      this.state.email.includes("@") &&
      this.state.email.includes(".") &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password === this.state.confirmPassword &&
      this.checkPassword(this.state.password)
    );
  };

  checkPassword = str => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="app" id="signupPage">
        <div className="signupHome">
          <h1>Please tell us a little about you!</h1>
        </div>
        <div className="signupSection">
          <input
            placeholder="Display Name"
            name="displayName"
            type="text"
            value={displayName}
            onChange={this.handleChange}
          />
          <input
            placeholder="Email"
            name="email"
            type="text"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            placeholder="Password Again"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={this.handleChange}
          />

          <div className="signupButtonAlt" onClick={this.signup}>
            Sign Up
          </div>
          <div className="loginButtonAlt">
            <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
