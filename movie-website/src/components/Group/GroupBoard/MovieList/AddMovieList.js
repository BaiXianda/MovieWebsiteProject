import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMovieList } from "../../../../actions/movieListActions";

class AddMovieList extends Component {
  constructor() {
    super();

    this.state = {
      nmovieListNameame: "",
      description: "",
      errors: {}
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { id } = this.props.match.params;

    e.preventDefault();
    const newMovieList = {
      movieListName: this.state.name,
      description: this.state.description
    };
    this.props.createMovieList(id, newMovieList, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="movieList">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Movie List form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.movieListName
                    })}
                    placeholder="MovieList Name"
                    name="name"
                    value={this.state.movieListName}
                    onChange={this.onChange}
                  />
                  {errors.movieListName && (
                    <div className="invalid-feedback">
                      {errors.movieListName}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.description
                    })}
                    placeholder="MovieList Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
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

AddMovieList.propTypes = {
  createMovieList: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createMovieList })(AddMovieList);
