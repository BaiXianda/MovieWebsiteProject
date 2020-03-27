import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieListItem extends Component {
  render() {
    const { movieList } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">ID: {movieList.id}</div>
        <div className="card-body bg-light">
          <h5 className="card-title">Name : {movieList.movieListName}</h5>
          <p className="card-text text-truncate ">{movieList.description}</p>
          <Link to="" className="btn btn-primary">
            View
          </Link>

          <Link to="" className="btn btn-info ml-4">
            Update
          </Link>

          <button className="btn btn-danger ml-4">Delete</button>
        </div>
      </div>
    );
  }
}

export default MovieListItem;
