import React from "react";
import { Link } from "react-router-dom";

const CreateMovieButton = () => {
  return (
    <React.Fragment>
      <Link to="/addMovie" className="btn btn-lg btn-info">
        Create a Movie
      </Link>
    </React.Fragment>
  );
};

export default CreateMovieButton;
