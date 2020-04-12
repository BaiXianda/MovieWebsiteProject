import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import AddGroup from "./components/Group/AddGroup";
import store from "./store";
import UpdateGroup from "./components/Group/UpdateGroup";
import GroupBoard from "./components/Group/GroupBoard/GroupBoard";
import AddMovieList from "./components/Group/GroupBoard/MovieList/AddMovieList";
import UpdateMovieList from "./components/Group/GroupBoard/MovieList/UpdateMovieList";
import MovieListBoard from "./components/Group/GroupBoard/MovieList/MovieListBoard/MovieListBoard";
import AddMovie from "./components/Group/GroupBoard/MovieList/MovieListBoard/AddMovie";
import UpdateMovie from "./components/Group/GroupBoard/MovieList/MovieListBoard/UpdateMovie";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";
import Login from "./components/UserManagement/Login";
import InvitePage from "./components/Group/GroupBoard/InvitePage";
import SearchPage from "./components/Group/GroupBoard/SearchPage";
import PullMovieList from "./components/Group/GroupBoard/MovieList/PullMovieList";
import AddEvent from "./components/Group/GroupBoard/Event/AddEvent";
import UpdateEvent from "./components/Group/GroupBoard/Event/UpdateEvent";
import EventPage from "./components/Group/GroupBoard/Event/EventPage";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addGroup" component={AddGroup} />
            <SecuredRoute
              exact
              path="/updateGroup/:id"
              component={UpdateGroup}
            />
            <SecuredRoute exact path="/groupBoard/:id" component={GroupBoard} />
            <SecuredRoute
              exact
              path="/groupBoard/addMovieList/:id"
              component={AddMovieList}
            />
            <SecuredRoute
              exact
              path="/groupBoard/updateMovieList/:id"
              component={UpdateMovieList}
            />
            <SecuredRoute
              exact
              path="/groupBoard/movieListBoard/:id/:moderator"
              component={MovieListBoard}
            />
            <SecuredRoute
              exact
              path="/groupBoard/movieListBoard/addMovie/:id"
              component={AddMovie}
            />
            <SecuredRoute
              exact
              path="/groupBoard/movieListBoard/updateMovie/:movieList_id/:id"
              component={UpdateMovie}
            />
            <SecuredRoute
              exact
              path="/groupBoard/inviteUser/:username/:groupID"
              component={InvitePage}
            />
            <SecuredRoute
              exact
              path="/groupBoard/searchPage/:groupID"
              component={SearchPage}
            />
            <SecuredRoute
              exact
              path="/groupBoard/pullMovieList/:groupID"
              component={PullMovieList}
            />
            <SecuredRoute
              exact
              path="/groupBoard/addEvent/:groupID"
              component={AddEvent}
            />
            <SecuredRoute
              exact
              path="/groupBoard/updateEvent/:eventID"
              component={UpdateEvent}
            />
            <SecuredRoute
              exact
              path="/groupBoard/eventPage/:eventID/:movieListId"
              component={EventPage}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
