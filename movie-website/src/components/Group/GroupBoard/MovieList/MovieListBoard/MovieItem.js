import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteGroup } from "../../../../../actions/movieActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class MovieItem extends Component {
  onDeleteClick = id => {
    this.props.deleteGroup(id);
  };

  render() {
    const movie = this.props.movie;

    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          Name: {movie.name}
          <Link
            to={`/groupBoard/movieListBoard/updateMovie/${movie.movieList_id}/${movie.id}`}
            className="btn btn-info ml-5"
          >
            Update
          </Link>
          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(this, movie.id)}
          >
            Delete
          </button>
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">Description: {movie.description}</h5>

          <li>
            <a href={movie.reviewLink}>Watch the trailer</a>
          </li>
          <li>
            <a href={movie.reviewLink}>Watch the review</a>
          </li>
        </div>
      </div>
    );
  }
}

MovieItem.protoTypes = {
  deleteMovie: PropTypes.func.isRequired
};

export default connect(null, { deleteGroup })(MovieItem);
