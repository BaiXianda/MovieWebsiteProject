import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchMovies, clearState } from "../../../actions/movieActions";
import MovieItem from "./MovieList/MovieListBoard/MovieItem";

class SearchPage extends Component {
  constructor() {
    super();

    this.state = {
      moviename: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillMount() {
    this.props.clearState();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { groupID } = this.props.match.params;

    this.props.searchMovies(this.state.moviename, groupID);
  }

  render() {
    const { errors } = this.state;
    const { groupID } = this.props.match.params;
    const movies = this.props.movie.movies;

    return (
      <div className="Search Movie">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/groupBoard/${groupID}`} className="btn btn-light">
                Back to Group Board
              </Link>
              <h4 className="display-4 text-center">Search Movie</h4>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group ">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.moviename,
                    })}
                    placeholder="Type Here"
                    name="moviename"
                    value={this.state.moviename}
                    onChange={this.onChange}
                  />
                  {errors.moviename && (
                    <div className="invalid-feedback">{errors.moviename}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  Search
                </button>
              </form>
            </div>
          </div>
          <hr />
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  searchMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  errors: state.errors,
});

export default connect(mapStateToProps, { searchMovies, clearState })(
  SearchPage
);
