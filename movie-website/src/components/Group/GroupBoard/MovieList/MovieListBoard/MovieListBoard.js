import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMovieList } from "../../../../../actions/movieListActions";
import { getMovies } from "../../../../../actions/movieActions";
import MovieItem from "./MovieItem";

class MovieListBoard extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMovieList(id, this.props.history);
    this.props.getMovies(id);
  }

  render() {
    const movies = this.props.movies;

    const currentUser = this.props.currentUser;
    const moderator = this.props.moderator;

    let create;

    if (currentUser === moderator) {
      create = (
        <Link
          to={`/groupBoard/movieListBoard/addMovie/${this.props.movieList.id}`}
          className="btn btn-lg btn-info"
        >
          Add a Movie
        </Link>
      );
    } else {
      create = "";
    }

    return (
      <div className="movieListBoard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link
                to={`/groupBoard/${this.props.movieList.movieGroupID}`}
                className="btn btn-light"
              >
                Back to Group Board
              </Link>
              <h1 className="display-4 text-center">
                {this.props.movieList.movieListName}
              </h1>
              <h3 className="text-center">
                {this.props.movieList.description}
              </h3>
              {create}
              <br />
              <hr />
              {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieListBoard.protoTypes = {
  getMovieList: PropTypes.func.isRequired,
  movieList: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  moderator: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movieList: state.movieList.movieList,
  movies: state.movie.movies,
  moderator: state.group.group.moderator,
  currentUser: state.security.user.username,
});

export default connect(mapStateToProps, { getMovieList, getMovies })(
  MovieListBoard
);
