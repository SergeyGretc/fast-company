import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
// import EditUserPage from "./layouts/editUserPage";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        {/* <Route path="/users/:userId?/edit" component={EditUserPage} /> */}
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
