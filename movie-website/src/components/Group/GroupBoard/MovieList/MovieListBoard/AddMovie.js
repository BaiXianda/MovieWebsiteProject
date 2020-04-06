import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMovie } from "../../../../../actions/movieActions";
import { Link } from "react-router-dom";

class AddMovie extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      reviewLink: "",
      trailerLink: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { id } = this.props.match.params;

    e.preventDefault();
    const newMovie = {
      name: this.state.name,
      description: this.state.description,
      reviewLink: this.state.reviewLink,
      trailerLink: this.state.trailerLink,
    };
    this.props.createMovie(id, newMovie, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { id } = this.props.match.params;

    return (
      <div className="movieList">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/groupBoard/movieListBoard/${id}`}
                className="btn btn-light"
              >
                Back to Movie List
              </Link>
              <h4 className="display-4 text-center">Create Movie form</h4>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.name,
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
                      "is-invalid": errors.description,
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
                  <input
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.reviewLink,
                    })}
                    type="url"
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
                  <input
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.trailerLink,
                    })}
                    type="url"
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

AddMovie.propTypes = {
  createMovie: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createMovie })(AddMovie);
