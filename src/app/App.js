import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/users";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
import UserPage from "./components/userPage";
// import UsersList from "./components/usersList";
function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route
          path="/users/:userId"
          render={(props) => <UserPage {...props} />}
        />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  );
}

export default App;
