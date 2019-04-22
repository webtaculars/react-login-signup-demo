import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: "password"
    };
  }

  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    token !== "undefined" && token !== null
      ? this.props.history.push("/user")
      : null;
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    if (this.emailValidity() && this.state.password) {
      const headers = {
        "Content-Type": "application/json"
      };
      const loginData = {
        email: this.state.email,
        password: this.state.password
      };
      try {
        const { data } = await axios.post(
          "https://evening-plateau-93775.herokuapp.com/api/v2/people/authenticate",
          loginData,
          { headers }
        );
        console.log(data);
        localStorage.setItem("token", data.authentication_token);
        localStorage.setItem("name", data.person.display_name);
        this.props.history.push("/user");
      } catch (e) {
        console.log(e.message);
        alert("Email and password did not match");
      }
    } else {
      alert("Enter valid email address and password");
    }
  };

  emailValidity = () => {
    return (
      this.state.email &&
      this.state.email.includes("@") &&
      this.state.email.includes(".")
    );
  };

  forgotPassword = async () => {
    if (this.emailValidity()) {
      const headers = {
        "Content-Type": "application/json"
      };
      const loginData = {
        email: this.state.email
      };
      try {
        const { data } = await axios.post(
          "https://evening-plateau-93775.herokuapp.com/api/v2/people/reset_password",
          loginData,
          { headers }
        );
        alert(data.message);
      } catch (e) {
        console.log(e);
        alert("Email do not exist");
      }
    } else {
      alert("Enter valid email address");
    }
  };

  showPassword = () => {
    this.setState({
      type: this.state.type === "password" ? "text" : "password"
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="app" id="loginPage">
        <div className="info">
          <h1>Welcome!</h1>
          <h1>Please login to continue.</h1>
        </div>
        <div className="loginSection">
          <input
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
            type="text"
            className="form-control"
          />
          <div className="password">
            <input
              placeholder="Password"
              name="password"
              type={this.state.type}
              value={password}
              onChange={this.handleChange}
            />
            <img
              style={{ position: "absolute", right: 40, cursor: "pointer" }}
              onClick={this.showPassword}
              src="https://img.icons8.com/ios/40/000000/show-password.png"
            />
          </div>

          <div className="forgotPassword" onClick={this.forgotPassword}>
            Forgot Password?
          </div>
          <div className="loginButton" onClick={this.login}>
            Login
          </div>
          <div className="signupButton">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
