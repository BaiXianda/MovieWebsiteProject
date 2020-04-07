import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pullMovieList } from "../../../../actions/movieListActions";

class PullMovieList extends Component {
  constructor() {
    super();

    this.state = {
      movieListId: "",
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { groupID } = this.props.match.params;
    this.props.pullMovieList(
      this.state.movieListId,
      groupID,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    const { groupID } = this.props.match.params;

    return (
      <div className="Search Movie">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/groupBoard/${groupID}`} className="btn btn-light">
                Back to Group Board
              </Link>
              <h4 className="display-4 text-center">Pull a Movie List</h4>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group ">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.movieListId,
                    })}
                    placeholder="Type Here"
                    name="movieListId"
                    value={this.state.movieListId}
                    onChange={this.onChange}
                  />
                  {errors.movieListId && (
                    <div className="invalid-feedback">{errors.movieListId}</div>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PullMovieList.propTypes = {
  errors: PropTypes.object.isRequired,
  pullMovieList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { pullMovieList })(PullMovieList);
