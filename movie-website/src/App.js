import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import AddGroup from "./components/Group/AddGroup";
import store from "./store";
import UpdateGroup from "./components/Group/UpdateGroup";
import GroupBoard from "./components/Group/GroupBoard/GroupBoard";
import AddMovieList from "./components/Group/GroupBoard/MovieList/AddMovieList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addGroup" component={AddGroup} />
          <Route exact path="/updateGroup/:id" component={UpdateGroup} />
          <Route exact path="/groupBoard/:id" component={GroupBoard} />
          <Route
            exact
            path="/groupBoard/addMovieList/:id"
            component={AddMovieList}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
