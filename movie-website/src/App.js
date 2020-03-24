import React from "react";
import "./App.css";
import NavBar from "./components/header/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddMovie from "./components/MovieList/AddMovie";
import MovieListView from "./components/MovieList/MovieListView";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/movielist" component={MovieListView} />
          <Route exact path="/addMovie" component={AddMovie} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
