import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  createMovieList,
  getMovieList
} from "../../../../actions/movieListActions";

class UpdateMovieList extends Component {
  constructor() {
    super();

    this.state = {
      movieListName: "",
      description: "",
      movieGroupID: "",
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
      movieListName,
      description,
      movieGroupID
    } = nextProps.movieList;

    this.setState({
      id,
      movieListName,
      description,
      movieGroupID
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMovieList(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newMovieList = {
      id: this.state.id,
      movieListName: this.state.movieListName,
      description: this.state.description
    };
    this.props.createMovieList(
      this.state.movieGroupID,
      newMovieList,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="movieList">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h4 className="display-4 text-center">Create Movie List form</h4>
              <Link
                to={`/groupBoard/${this.state.movieGroupID}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.movieListName
                    })}
                    placeholder="MovieList Name"
                    name="movieListName"
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

UpdateMovieList.protoTypes = {
  createMovieList: PropTypes.func.isRequired,
  getMovieList: PropTypes.func.isRequired,
  movieList: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movieList: state.movieList.movieList,
  errors: state.errors
});

export default connect(mapStateToProps, { getMovieList, createMovieList })(
  UpdateMovieList
);
