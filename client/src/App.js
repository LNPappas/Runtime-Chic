import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Nav from "./components/Nav";
import "./App.css";
import Login from "./components/Login";
import { toast } from "react-toastify";

import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import FileUpload from "./components/FileUpload";
import UpdateForm from "./components/UpdateForm";
import MessageBoard from "./components/MessageBoard";
import PostMessageBoard from "./components/PostMessageBoard";

toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3003/api/users/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();
      console.log(`this is in App: ${parseRes}`);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route exact path="/userprofile" component={FileUpload} />
          <Route exact path="/userprofile/update" component={UpdateForm} />
          <Route exact path="/messageboard" component={MessageBoard} />
          <Route exact path="/messageboard/post" component={PostMessageBoard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
