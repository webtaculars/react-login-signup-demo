import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/user" component={User} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
