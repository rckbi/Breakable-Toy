import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import PracticeList from "./PracticeList";
import PracticeShowPage from "./PracticeShowPage";
import NewPracticeForm from "./NewPracticeForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/" component={PracticeList} />
        <Route exact path="/practices/new" component={NewPracticeForm} />
        <Route
          exact
          path="/practices/:id"
          render={(props) => <PracticeShowPage {...props} currentUser={currentUser} />}
        />
      </Switch>
    </Router>
  );
};

export default hot(App);
