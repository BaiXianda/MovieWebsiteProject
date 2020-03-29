import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMovie, createMovie } from "../../../../../actions/movieActions";

class UpdateMovie extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      description: "",
      reviewLink: "",
      trailerLink: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      name,
      description,
      movieList_id,
      reviewLink,
      trailerLink
    } = nextProps.movie;

    this.setState({
      id,
      name,
      description,
      movieList_id,
      reviewLink,
      trailerLink
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMovie(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { movieList_id } = this.props.match.params;

    e.preventDefault();
    const newMovie = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      reviewLink: this.state.reviewLink,
      trailerLink: this.state.trailerLink
    };
    this.props.createMovie(movieList_id, newMovie, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { movieList_id } = this.props.match.params;

    return (
      <div className="movieList">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/groupBoard/movieListBoard/${movieList_id}`}
                className="btn btn-light"
              >
                Back to Movie List
              </Link>
              <h4 className="display-4 text-center">Update Movie form</h4>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Movie Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Movie Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.reviewLink
                    })}
                    placeholder="Movie ReviewLink"
                    name="reviewLink"
                    value={this.state.reviewLink}
                    onChange={this.onChange}
                  />
                  {errors.reviewLink && (
                    <div className="invalid-feedback">{errors.reviewLink}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.trailerLink
                    })}
                    placeholder="MovieList TrailerLink"
                    name="trailerLink"
                    value={this.state.trailerLink}
                    onChange={this.onChange}
                  />
                  {errors.trailerLink && (
                    <div className="invalid-feedback">{errors.trailerLink}</div>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateMovie.propTypes = {
  createMovie: PropTypes.func.isRequired,
  getMovie: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie.movie,
  errors: state.errors
});

export default connect(mapStateToProps, { createMovie, getMovie })(UpdateMovie);
