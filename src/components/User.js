import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Slide from "react-reveal/Slide";
import { withRouter } from "react-router-dom";
import "./User.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      email: "",
      display_name: "",
      created_days: "",
      updated_days: "",
      initials: ""
    };
  }

  componentDidMount = async () => {
    let token = await localStorage.getItem("token");
    const headers = {
      Authorization: token,
      "Content-Type": "application/json"
    };
    try {
      const { data } = await axios.get(
        "https://evening-plateau-93775.herokuapp.com/api/v2/people/me",
        { headers }
      );
      this.setState({
        email: data.email,
        display_name: data.display_name,
        created_days: moment().diff(moment(data.created_at), "days") + 1,
        updated_days: moment().diff(moment(data.created_at), "days"),
        initials: data.display_name
          .split(" ")
          .map(n => n[0])
          .join("")
      });
    } catch (e) {
      console.log(e.message);
      await localStorage.removeItem("token");
      await localStorage.removeItem("name");
      this.props.history.push("/");
    }
  };

  showHideBox = () => {
    this.setState({
      show: !this.state.show
    });
  };

  resetPassword = async () => {
    let token = await localStorage.getItem("token");
    const headers = {
      Authorization: token,
      "Content-Type": "application/json"
    };
    try {
      const resetData = {
        email: this.state.email
      };
      const { data } = await axios.post(
        "https://evening-plateau-93775.herokuapp.com/api/v2/people/reset_password",
        resetData,
        { headers }
      );
      alert(data.message);
    } catch (e) {
      console.log(e.message);
      await localStorage.removeItem("token");
      await localStorage.removeItem("name");
      this.props.history.push("/");
    }
  };

  logout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("name");
    alert("User logged out");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="app" id="userPage">
        <div className="row">
          <div className="home">
            <h1>User Home Page</h1>
          </div>
          {this.state.show ? (
            <Slide right duration={500}>
              <div className="detailsBox" onClick={this.showHideBox}>
                <div
                  style={{
                    position: "relative",
                    padding: "5%",
                    height: "95%"
                  }}
                >
                  <div className="displayName">{this.state.display_name}</div>
                  <div className="email">{this.state.email}</div>
                  <div className="accountAge">
                    <div className="label">Account Age:</div>
                    <div className="value">{this.state.created_days} Day</div>
                  </div>
                  <div style={{ fontSize: "25px" }}>Security</div>
                  <div className="security">
                    <div className="label">Account Age:</div>
                    <div className="value">
                      {this.state.updated_days === 0
                        ? "Today"
                        : this.state.updated_days + " Day ago"}
                    </div>
                  </div>
                  <div className="actions">
                    <div className="resetPassword" onClick={this.resetPassword}>
                      Reset Password
                    </div>
                    <div className="logout" onClick={this.logout}>
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </Slide>
          ) : (
            <div>
              <button onClick={this.showHideBox}>{this.state.initials}</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(User);
