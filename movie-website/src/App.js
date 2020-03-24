import React from "react";
import "./App.css";
import NavBar from "./components/header/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
